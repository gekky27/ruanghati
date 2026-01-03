import React from 'react';

// Contact Item Component
const ContactItem = ({ name, details }) => {
  return (
    <div className="mb-10">
      <h4 className="font-bold text-gray-900 text-2xl mb-2">{name}</h4>
      <p className="text-gray-700 text-xl leading-relaxed whitespace-pre-line">
        {details}
      </p>
    </div>
  );
};

// Card Component
const Card = ({ title, children }) => {
  return (
    <div className="bg-white/70 backdrop-blur-md rounded-[50px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 md:p-16 mb-12 border border-white/50">
      <h3 className="text-3xl md:text-5xl font-bold text-center underline decoration-[#d1d5db] underline-offset-[14px] mb-20 text-gray-800 tracking-tight">
        {title}
      </h3>
      {children}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-[#FFF8F6] font-sans overflow-x-hidden relative">
      
      {/* --- BACKGROUND AURAS --- */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        
        {/* 1. Top Left Aura (Blue-ish) */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-100 opacity-40 blur-[120px] animate-pulse-slow"></div>
        
        {/* 2. Top Right Aura (Peach/Orange) */}
        <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-orange-100 opacity-50 blur-[140px] animate-pulse-slower"></div>

        {/* 3. NEW: Middle Aura (Soft Pink/Rose) - Spans across the center */}
        <div className="absolute top-[35%] left-[15%] w-[70%] h-[40%] rounded-full bg-rose-100 opacity-40 blur-[150px] animate-pulse-slow"></div>

      </div>

      {/* CONTENT WRAPPER */}
      <div className="relative z-10">

        {/* HEADER & NAVBAR */}
        <header className="relative flex items-center justify-center w-full mb-48 mt-24 h-40">
          <div className="absolute left-8 md:left-24 top-1/2 -translate-y-1/2 hidden xl:block">
             <img 
                src="/Logo.png" 
                alt="Ruang Hati Logo"
                className="w-80 h-auto object-contain" 
             />
          </div>
          <nav className="bg-white/80 backdrop-blur-sm px-24 py-10 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] flex gap-24 text-3xl font-medium text-gray-600 tracking-wide border border-white/50 transition-all hover:shadow-md">
            <a href="#" className="hover:text-black transition-colors">Home</a>
            <a href="#" className="hover:text-black transition-colors">Daily Check-in</a>
            <a href="#" className="hover:text-black transition-colors">Jeda Dulu</a>
            <a href="#" className="hover:text-black transition-colors">AI Chatbot</a>
            <a href="#" className="text-black font-bold border-b-2 border-black pb-0.5">Get Help</a>
          </nav>
        </header>

        {/* HERO TEXT SECTION */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start mb-32 px-8 md:pl-24 md:pr-40">
          <h1 className="text-6xl md:text-[92px] text-[#222] font-light leading-[1.05] tracking-wide mb-16 md:mb-0 text-left">
            Professional and <br/>
            emergency support <br/>
            when you need it <br/>
            most.
          </h1>
          <div className="md:text-right mt-8 md:mt-24 text-right self-end md:self-auto">
            <h2 className="text-5xl md:text-[64px] font-bold text-gray-900 leading-tight">
              You are <br /> 
              <span className="font-[900] text-black text-6xl md:text-[85px]">NOT alone</span>
            </h2>
          </div>
        </div>

        {/* MAIN CARDS SECTION */}
        <div className="max-w-[1400px] mx-auto px-6">
          <Card title="Indonesia Mental Health Hotline">
            <div className="grid md:grid-cols-2 gap-x-32 gap-y-12">
              <ContactItem name="Halo Kemenkes" details={`1500 567 (Telephone),\n+62 812 6050 0567 (WhatsApp)`} />
              <ContactItem name="SAPA (Sahabat Perempuan dan Anak)" details="08111 129 129 (WhatsApp)" />
              <ContactItem name="BISA Helpline" details="+62-811-3855-472 (WhatsApp Only)" />
              <ContactItem name="Yayasan Pulih" details="+62 811 8436 633 (WhatsApp)" />
              <ContactItem name="Healing119.id" details="119 (choose 8) or healing119.id" />
              <ContactItem name="UNHCR Health Hotline" details="0811 8161 511" />
            </div>
          </Card>

          <Card title="Psychologists and Psychiatrists Contact Information">
            <div className="flex flex-col items-center text-center space-y-8">
              <ContactItem name="Adrian Mizani - Psychologists" details={`+62 81 73336735 (Whatsapp)\nagenius.fingerprint@gmail.com (email)`} />
              <ContactItem name="Asti - Psychologists" details="+62 856 3849 221 (Whatsapp)" />
              <ContactItem name="The Sunlight Center Psychologists & Psychiatrists Community" details="+62 812 3345 6715 (Whatsapp)" />
              <ContactItem name="Gung Ratih - Psychologists" details="+62 895 3332 54242 (Whatsapp)" />
            </div>
          </Card>

          <p className="text-center text-base md:text-lg text-gray-500 max-w-4xl mx-auto mt-28 pb-20 leading-relaxed tracking-wide">
            The list of mental health professionals provided on this page is continuously updated. <br/>
            Additional contacts will be added over time to ensure users have access to reliable and relevant support services.
          </p>
        </div>

      </div>
    </div>
  );
}