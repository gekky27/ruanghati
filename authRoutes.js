const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendMail } = require("../utils/mailer");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // email OPTIONAL
    if (!name || !password) {
      return res.status(400).json({ message: "Name and password are required" });
    }

    // cek user by name (wajib unik)
    const existingByName = await User.findOne({ name });
    if (existingByName) {
      return res.status(400).json({ message: "User already exists" });
    }

    // kalau email diisi, cek unik by email juga
    if (email) {
      const existingByEmail = await User.findOne({ email });
      if (existingByEmail) {
        return res.status(400).json({ message: "Email already used" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email: email || undefined, // biar gak nyimpen string kosong
      password: hashedPassword,
    });

    await user.save();

    // Kirim email hanya jika email ada & valid
    const hasEmail =
      typeof email === "string" &&
      email.trim().length > 0 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

    if (hasEmail) {
      sendMail({
        to: email.trim(),
        subject: "✅ Ruang Hati — Email Verified!",
        text: `Congrats ${name}! Your email is verified for Ruang Hati. You can now login and enjoy the app.`,
        html: `
          <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:24px;">
            <div style="max-width:560px; margin:0 auto; background:#ffffff; border-radius:14px; overflow:hidden; box-shadow:0 6px 24px rgba(0,0,0,.08);">
              <div style="padding:22px 20px; color:#111827;">
                <h1 style="margin:0 0 10px; font-size:18px; line-height:1.4;">
                  Congrats, <span style="color:#6d28d9;">${escapeHtml(name)}</span>!
                </h1>

                <p style="margin:0 0 14px; font-size:14px; color:#374151; line-height:1.6;">
                  Your email <b>${escapeHtml(email.trim())}</b> is now verified for <b>Ruang Hati</b>.
                  You can login and start using the app.
                </p>

                <div style="background:#f3f4f6; border:1px solid #e5e7eb; border-radius:12px; padding:14px;">
                  <p style="margin:0; font-size:13px; color:#111827;">
                    ✅ Verified email<br/>
                    🔐 Account ready to use
                  </p>
                </div>

                <p style="margin:14px 0 0; font-size:13px; color:#6b7280; line-height:1.6;">
                  If you didn’t create this account, you can ignore this email.
                </p>
              </div>
            </div>
          </div>
        `,
      }).catch((err) => console.error("WELCOME EMAIL ERROR:", err));
    }

    return res.status(201).json({
      message: "Signup successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// helper biar aman dari HTML injection di email
function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * FORGOT PASSWORD
 * user input email -> kirim link reset ke email itu
 * body: { email }
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });

    // biar aman: jangan bocorin email ada / tidak
    if (!user) return res.json({ message: "If email exists, reset link has been sent." });

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    user.resetPasswordTokenHash = tokenHash;
    user.resetPasswordExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 menit
    await user.save();

    const appUrl = process.env.APP_URL || "http://localhost:3000";
    const path = process.env.RESET_PASSWORD_PATH || "/reset-password";

    // link ke page reset password FE kamu (yang sudah kamu buat)
    const resetLink = `${appUrl}${path}?token=${token}&email=${encodeURIComponent(email)}`;

    await sendMail({
      to: email,
      subject: "Reset Password",
      text: `Klik link ini untuk reset password: ${resetLink}`,
      html: `
        <p>Kamu request reset password.</p>
        <p><a href="${resetLink}">Klik untuk reset password</a></p>
        <p>Link ini berlaku 15 menit.</p>
      `,
    });

    return res.json({ message: "If email exists, reset link has been sent." });
  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * RESET PASSWORD
 * user input new password & confirm (cek di FE), kirim ke BE
 * body: { email, token, newPassword }
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { email, token, newPassword } = req.body;

    if (!email || !token || !newPassword) {
      return res.status(400).json({ message: "Email, token, and newPassword are required" });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      email,
      resetPasswordTokenHash: tokenHash,
      resetPasswordExpiresAt: { $gt: new Date() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetPasswordTokenHash = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
