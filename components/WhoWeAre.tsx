"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WhoWeAre() {
  return (
    <section className="py-24 bg-white" id="who-we-are">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-brand-red text-sm font-bold uppercase tracking-widest mb-3">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6 leading-tight">
              Who We Are &amp; <br />
              <span className="text-brand-red">What We Do</span>
            </h2>
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                <strong className="text-gray-900">Urban Raaga</strong> is Bangalore&apos;s trusted live music booking
                platform dedicated to connecting event hosts with talented, professional singers and live bands.
                Founded with a passion for celebrating life through music, we help you make your events truly memorable.
              </p>
              <p>
                From wedding receptions to intimate house parties and corporate galas, our
                platform offers a seamless experience to discover, shortlist, and book verified artists across
                Bangalore. Every artist on our platform is personally vetted to ensure performance quality.
              </p>
              <p>
                We believe that live music has the power to transform any occasion.
                Our mission is to make that experience accessible, transparent, and hassle-free for everyone.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { icon: <svg className="w-6 h-6 text-brand-red mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>, label: "Our Mission", text: "Music for every occasion" },
                { icon: <svg className="w-6 h-6 text-brand-red mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>, label: "Our Promise", text: "Verified quality talent" },
                { icon: <svg className="w-6 h-6 text-brand-red mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>, label: "Our Passion", text: "Celebrating life through live music" },
              ].map((v) => (
                <div key={v.label} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="mb-3">{v.icon}</div>
                  <p className="text-xs font-bold text-gray-900">{v.label}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{v.text}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual - Premium Unmask Reveal */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            className="relative mt-8 lg:mt-0"
          >
            <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl group">
              <motion.div 
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src="/slider-4.jpg"
                  alt="Live band and singers performing at a wedding event in Bangalore"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* Floating card - Continuous Levitation */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center text-white font-black text-lg flex-shrink-0">
                    U
                  </div>
                  <div>
                    <p className="font-black text-gray-900 text-base">Urban Raaga</p>
                    <p className="text-gray-500 text-xs">Bangalore&apos;s Live Music Booking Platform</p>
                  </div>
                </div>
                <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100">
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <p className="text-gray-700 text-xs font-semibold">Verified Artists</p>
                  </div>
                  <div className="w-px bg-gray-100" />
                  <div className="flex-1 flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <p className="text-gray-700 text-xs font-semibold">Local to Bangalore</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-brand-red-light rounded-3xl -z-10" />
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gray-100 rounded-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
