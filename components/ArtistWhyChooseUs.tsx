"use client";

import { motion } from "framer-motion";

export default function ArtistWhyChooseUs() {
  const cards = [
    {
      icon: (
        <svg className="w-7 h-7 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: "Curated Artists",
      subtitle: "Verified performers. Tailored experiences.",
      desc: "We work only with carefully selected singers and bands, ensuring quality performances customized to your event."
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
      title: "Secure & Flexible Booking",
      subtitle: "Simple process. Transparent pricing.",
      desc: "Book with confidence through secure payments, with flexible options designed to make your experience smooth and stress-free."
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Hassle-Free Execution",
      subtitle: "We handle everything for you.",
      desc: "From artist coordination to event execution, our team ensures everything runs seamlessly."
    },
    {
      icon: (
        <svg className="w-7 h-7 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Show Guarantee",
      subtitle: "Backup artists. Zero stress.",
      desc: "In case of unexpected situations, we provide backup performers so your event continues without disruption."
    }
  ];

  return (
    <section className="py-24 bg-[#0F0F0F] relative border-t border-white/10" id="artist-why-choose-us">
      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#FF2E2E]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#FF2E2E]/10 border border-[#FF2E2E]/20 text-[#FF2E2E] text-sm font-bold uppercase tracking-widest mb-6">
            Why Urban Raaga
          </span>
          <h2 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 drop-shadow-xl">
            Why Choose Urban Raaga?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Trusted live music booking platform in Bangalore for weddings, corporate events, and private parties.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={idx}
              className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#FF2E2E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-[0_0_20px_rgba(255,46,46,0.1)]">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{card.title}</h3>
                  <h4 className="text-[#FF2E2E] font-medium mb-4">{card.subtitle}</h4>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
