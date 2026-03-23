"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white selection:bg-[#FF2E2E] selection:text-white pb-0">
      <Navbar />

      {/* 🎯 HERO SECTION */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#FF2E2E]/10 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 text-center"
        >
          <span className="inline-block text-[#FF2E2E] text-sm font-bold uppercase tracking-widest mb-4">
            Contact Urban Raaga
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight text-balance uppercase">
            Book Live Singers in <span className="text-[#FF2E2E]">Bangalore</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed text-balance">
            Looking to hire live singers in Bangalore, book a live band, or plan music for your wedding, corporate event, or party?
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-4 max-w-2xl mx-auto font-medium leading-relaxed text-balance">
            Get in touch with Urban Raaga and our team will help you find the perfect artist for your event.
          </p>
        </motion.div>
      </section>

      {/* 📞 CONTACT DETAILS SECTION */}
      <section className="py-16 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            
            {/* Call / WhatsApp Card */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl hover:border-[#FF2E2E]/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF2E2E]/10 rounded-full blur-2xl -translate-y-10 translate-x-10 group-hover:bg-[#FF2E2E]/20 transition-colors duration-500 pointer-events-none" />
              
              <div className="w-16 h-16 bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-[#FF2E2E]/20 transition-colors">
                <svg className="w-8 h-8 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Call / WhatsApp</h3>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">Call Us (India)</p>
                    <Link href="tel:01169261547" className="text-xl font-bold text-white hover:text-[#FF2E2E] transition-colors">
                      01169261547
                    </Link>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-1">WhatsApp</p>
                    <Link href="https://wa.me/919424700519" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-white hover:text-[#FF2E2E] transition-colors">
                      +91 9424700519
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="flex items-center gap-2 text-sm font-medium text-green-400">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                  Available 7 days a week
                </p>
              </div>
            </motion.div>

            {/* Email & Address Card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl hover:border-[#FF2E2E]/30 transition-colors group relative overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FF2E2E]/10 rounded-full blur-2xl translate-y-10 -translate-x-10 group-hover:bg-[#FF2E2E]/20 transition-colors duration-500 pointer-events-none" />
              
              <div className="w-16 h-16 bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:bg-[#FF2E2E]/20 transition-colors">
                <svg className="w-8 h-8 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Email &amp; Address</h3>
              
              <div className="space-y-8">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Email Support</h4>
                  <Link href="mailto:support@bangaloresinger.in" className="text-lg sm:text-xl font-bold text-white hover:text-[#FF2E2E] transition-colors break-words">
                    support@bangaloresinger.in
                  </Link>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-3">Headquarters</h4>
                  <p className="text-lg text-gray-300 font-medium leading-relaxed">
                    Urban Raaga<br />
                    24, Indiranagar 2nd Stage<br />
                    Bengaluru, Karnataka – 560038
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm font-medium text-gray-400 leading-relaxed">
                  <strong className="text-white">Serving all major areas including:</strong> Indiranagar, Whitefield, Koramangala, HSR Layout, Electronic City, Jayanagar, and more.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 🚀 QUICK CTA */}
      <section className="py-20 text-center border-t border-white/10 bg-black">
        <h2 className="text-3xl sm:text-4xl font-black text-white mb-6">Ready to Book Live Music?</h2>
        <p className="text-lg text-gray-400 mb-8 max-w-xl mx-auto">
          Reach out to us to confirm artist availability, discuss pricing, or plan the music for your next big event.
        </p>
        <Link
          href="https://wa.me/919424700519"
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 bg-[#FF2E2E] hover:bg-red-700 text-white font-bold px-10 py-4 rounded-full text-base shadow-[0_0_20px_rgba(255,46,46,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Chat on WhatsApp
        </Link>
      </section>

      <Footer />
    </main>
  );
}
