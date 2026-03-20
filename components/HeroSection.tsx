"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
        <motion.div
           initial={{ scale: 1.0 }}
           animate={{ scale: 1.08 }}
           transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
           className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/slider-1.jpg"
            alt="Live music concert"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-brand-red rounded-full opacity-60 animate-pulse"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20"
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold px-5 py-2 rounded-full mb-8 shadow-xl shadow-black/10">
          <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse shadow-sm shadow-brand-red" />
          Bangalore&apos;s Trusted Live Music Booking Platform
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight text-balance">
          Hire{" "}
          <span className="text-brand-red relative inline-block">
            Live Singers & Bands
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" preserveAspectRatio="none">
              <path d="M0 8 Q150 0 300 8" stroke="#E5002A" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>
          <br />
          <span className="text-white">for Your Events in Bangalore</span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed text-balance">
          Book verified live singers and bands in Bangalore for weddings, house parties, and corporate events.
        </p>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-3 sm:p-4 max-w-3xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Location */}
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus-within:border-brand-red transition-colors">
              <svg className="w-5 h-5 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input
                type="text"
                placeholder="Enter locality (e.g. Indiranagar)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none font-semibold"
              />
            </div>

            {/* Date */}
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 focus-within:border-brand-red transition-colors">
              <svg className="w-5 h-5 text-brand-red flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none font-medium"
              />
            </div>

            {/* Search Button */}
            <button className="bg-brand-red hover:bg-brand-red-dark text-white font-bold text-sm px-8 py-3 rounded-xl transition-all duration-200 shadow-lg hover:shadow-brand-red/30 active:scale-95 flex-shrink-0">
              Search
            </button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#"
            className="group flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-xl shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-200 hover:scale-105 active:scale-95"
          >
            🎤 Search Live Singer
          </Link>
          <Link
            href="tel:+919999999999"
            className="group flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur border border-white/30 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-200 hover:scale-105"
          >
            📞 Call to Enquire
          </Link>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-90">
          {[
            { label: "Verified Artists", icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
            { label: "Secure Payments", icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg> },
            { label: "Bangalore Based", icon: <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
          ].map((stat) => (
            <div key={stat.label} className="text-center bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 min-w-[140px] hover:bg-white/10 transition-colors flex flex-col items-center">
              <div className="mb-2 p-2 bg-brand-red/80 rounded-full shadow-lg">{stat.icon}</div>
              <p className="text-sm text-white font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
