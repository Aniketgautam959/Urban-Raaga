"use client";

import { motion } from "framer-motion";

export default function ArtistWhyChooseUs() {
  const cards = [
    {
      icon: "🎤",
      title: "Curated Artists",
      subtitle: "Verified performers. Tailored experiences.",
      desc: "We work only with carefully selected singers and bands, ensuring quality performances customized to your event."
    },
    {
      icon: "💳",
      title: "Secure & Flexible Booking",
      subtitle: "Simple process. Transparent pricing.",
      desc: "Book with confidence through secure payments, with flexible options designed to make your experience smooth and stress-free."
    },
    {
      icon: "⚙️",
      title: "Hassle-Free Execution",
      subtitle: "We handle everything for you.",
      desc: "From artist coordination to event execution, our team ensures everything runs seamlessly."
    },
    {
      icon: "🎯",
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
                <div className="w-16 h-16 shrink-0 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-[0_0_20px_rgba(255,46,46,0.1)]">
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
