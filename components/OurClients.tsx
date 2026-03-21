"use client";

import { motion } from "framer-motion";

const ROW_1 = [
  { name: "Adobe", style: "font-sans font-bold text-xl tracking-tight" },
  { name: "Crayons", style: "font-serif italic text-2xl lowercase" },
  { name: "Godrej", style: "font-sans font-medium text-2xl tracking-tighter" },
  { name: "HABIBI", style: "font-sans font-black tracking-widest text-xl" },
  { name: "SEQUOIA", style: "font-serif tracking-[0.2em] text-sm uppercase" },
  { name: "Spotify", style: "font-sans font-bold text-xl" },
];

const ROW_2 = [
  { name: "Goldman Sachs", style: "font-serif font-bold text-lg leading-none" },
  { name: "Google", style: "font-serif text-2xl tracking-tight" },
  { name: "HDFC BANK", style: "font-sans font-bold text-sm tracking-wider flex items-center gap-2" },
  { name: "INDIA TODAY", style: "font-sans font-black text-lg leading-none uppercase" },
  { name: "IBM", style: "font-sans font-black text-4xl tracking-tighter" },
  { name: "IIMB", style: "font-sans font-bold text-xl tracking-widest" },
];

const ROW_3 = [
  { name: "Kotak", style: "font-sans font-bold text-xl" },
  { name: "Meesho", style: "font-sans font-medium text-2xl lowercase tracking-tighter" },
  { name: "Microsoft", style: "font-sans font-semibold text-xl flex items-center gap-2" },
  { name: "NYKAA", style: "font-serif uppercase tracking-widest text-lg md:text-xl" },
  { name: "P&G", style: "font-serif font-bold text-3xl" },
  { name: "Pidilite", style: "font-sans font-bold text-xl capitalize" },
];

const LogoBlock = ({ brand }: { brand: any }) => {
  return (
    <div className="flex items-center justify-center px-10 md:px-16 opacity-[0.35] hover:opacity-100 transition-opacity duration-300 min-w-[200px]">
      <span className={`text-white cursor-default select-none ${brand.style}`}>
        {brand.name === "Microsoft" ? (
          <>
            <div className="grid grid-cols-2 gap-[2px]">
              <div className="w-2.5 h-2.5 bg-white" />
              <div className="w-2.5 h-2.5 bg-white" />
              <div className="w-2.5 h-2.5 bg-white" />
              <div className="w-2.5 h-2.5 bg-white" />
            </div>
            {brand.name}
          </>
        ) : brand.name === "HDFC BANK" ? (
          <>
            <div className="w-4 h-4 border-[3px] border-white flex" />
            {brand.name}
          </>
        ) : brand.name === "Goldman Sachs" ? (
          <span className="flex flex-col text-left"><span className="leading-tight">Goldman</span><span className="leading-tight">Sachs</span></span>
        ) : brand.name === "Meesho" ? (
          <span className="flex items-center gap-1">
            <span className="text-3xl font-bold bg-white text-black px-1 rounded-sm leading-none pt-1">m</span>
            {brand.name}
          </span>
        ) : (
          brand.name
        )}
      </span>
    </div>
  );
};

export default function OurClients() {
  return (
    <section className="py-24 bg-[#0B090F] relative overflow-hidden flex flex-col items-center">
      {/* Import Caveat font for the hand-written look */}
      <style dangerouslySetInnerHTML={{ __html: `@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600&display=swap');` }} />

      <div className="text-center mb-16 relative z-10 w-full max-w-4xl px-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold text-brand-red mb-2 pb-2 tracking-tight"
        >
          Our Clients
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, rotate: -3 }}
          whileInView={{ opacity: 1, rotate: -5 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="relative inline-block mt-4"
        >
          <span className="text-white/90 text-3xl md:text-4xl tracking-wide block relative z-10" style={{ fontFamily: "'Caveat', cursive" }}>
            Happy clients, Happy us
          </span>
          {/* Hand drawn arrow approximation */}
          <svg className="absolute -right-16 top-4 w-16 h-16 text-white/50" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M10,20 Q60,-10 80,40" />
            <path d="M70,35 L80,40 L85,30" />
          </svg>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div 
        className="w-full flex flex-col gap-12 md:gap-16 overflow-hidden relative pt-6"
        style={{ WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
      >
        {/* ROW 1 */}
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div className="flex animate-marquee group-hover:[animation-play-state:paused] items-center">
            {[...ROW_1, ...ROW_1, ...ROW_1].map((b, i) => <LogoBlock key={i} brand={b} />)}
          </div>
        </div>

        {/* ROW 2 - Reverse */}
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div 
            className="flex animate-marquee group-hover:[animation-play-state:paused] items-center" 
            style={{ animationDirection: "reverse", animationDuration: "40s" }}
          >
            {[...ROW_2, ...ROW_2, ...ROW_2].map((b, i) => <LogoBlock key={i} brand={b} />)}
          </div>
        </div>

        {/* ROW 3 */}
        <div className="flex whitespace-nowrap overflow-hidden group">
          <div 
            className="flex animate-marquee group-hover:[animation-play-state:paused] items-center" 
            style={{ animationDuration: "30s" }}
          >
            {[...ROW_3, ...ROW_3, ...ROW_3].map((b, i) => <LogoBlock key={i} brand={b} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
