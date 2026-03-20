"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { sliderImages } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

// Extend slider data with category labels for the StarClinch-style text carousel
const slides = [
  { ...sliderImages[0], category: "a College Fest" },
  { ...sliderImages[1], category: "a Wedding Band" },
  { ...sliderImages[2], category: "a Corporate Night" },
  { ...sliderImages[3], category: "a Birthday Party" },
  { ...sliderImages[4], category: "an Acoustic Session" },
  { ...sliderImages[5], category: "an Outdoor Festival" },
  { ...sliderImages[6], category: "an Intimate Concert" },
];

const SLIDE_DURATION = 4000; // ms each slide is held
const TRANSITION_DURATION = 1.3; // seconds for crossfade

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const goTo = useCallback((index: number) => {
    setPrev(current);
    setCurrent(index);
  }, [current]);

  const next = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, goTo]);

  const prevSlide = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, goTo]);

  // Auto-advance
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, SLIDE_DURATION);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handleManual = (fn: () => void) => {
    fn();
    resetTimer();
  };

  return (
    <section className="py-16 bg-gray-950" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <span className="inline-block text-brand-red text-xs font-bold uppercase tracking-[0.3em] mb-3">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Live Performances That Wow
          </h2>
        </motion.div>

        {/* ── SLIDER STAGE ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-[2rem] overflow-hidden bg-gray-900 shadow-2xl border border-white/5 mx-2 sm:mx-0"
          style={{ height: "75vh", minHeight: "550px", maxHeight: "850px" }}
        >

          {/* ── BACKGROUND IMAGES (premium circle reveal) ── */}
          <AnimatePresence initial={false}>
            <motion.div
              key={current}
              initial={{ clipPath: "circle(0% at 50% 50%)", zIndex: 10, scale: 1.1 }}
              animate={{ clipPath: "circle(150% at 50% 50%)", zIndex: 10, scale: 1 }}
              exit={{ zIndex: 0 }}
              transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0" style={{ animation: `kenBurns ${SLIDE_DURATION}ms ease-in-out forwards` }}>
                <Image
                  src={slides[current].url}
                  alt={slides[current].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={current === 0}
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* ── OVERLAYS ── */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" style={{ zIndex: 11 }} />
          <div className="absolute inset-0 bg-black/10 pointer-events-none mix-blend-overlay" style={{ zIndex: 11 }} />

          {/* ── MASSIVE TYPOGRAPHY & CONTROLS ── */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-12 md:p-16" style={{ zIndex: 20 }}>
            {/* Top Bar: Counter */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-white font-black text-xl sm:text-2xl">{String(current + 1).padStart(2, "0")}</span>
                <div className="w-12 h-px bg-white/30" />
                <span className="text-white/50 font-bold text-sm">{String(slides.length).padStart(2, "0")}</span>
              </div>
            </div>

            {/* Bottom Content: Type & Arrows */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
              {/* Text */}
              <div className="flex-1 max-w-4xl">
                <motion.p
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="text-brand-red font-bold tracking-[0.3em] sm:tracking-[0.5em] uppercase text-xs sm:text-sm mb-4 sm:mb-6 flex items-center gap-3"
                >
                  <span className="w-8 h-px bg-brand-red hidden sm:block"></span> Book Live Music For
                </motion.p>
                
                <div className="overflow-hidden pb-2 sm:pb-4">
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={current}
                      initial={{ y: "100%", opacity: 0, rotateZ: 3 }}
                      animate={{ y: "0%", opacity: 1, rotateZ: 0 }}
                      exit={{ y: "-100%", opacity: 0, rotateZ: -3 }}
                      transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}
                      className="text-4xl sm:text-6xl lg:text-[5.5rem] font-black text-white leading-[1.05] tracking-tighter"
                    >
                      {slides[current].category}
                    </motion.h3>
                  </AnimatePresence>
                </div>
              </div>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 flex-shrink-0">
                {/* Dots */}
                <div className="flex sm:gap-2">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => { goTo(i); resetTimer(); }}
                      className="group relative h-10 flex items-center justify-center sm:px-2 pr-4 sm:pr-2"
                      aria-label={`Go to slide ${i + 1}`}
                    >
                      <span
                        className="block h-1 rounded-full transition-all duration-500 ease-out"
                        style={{
                          width: i === current ? "2rem" : "0.5rem",
                          background: i === current ? "#e11d48" : "rgba(255,255,255,0.3)",
                        }}
                      />
                    </button>
                  ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleManual(prevSlide)}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-md"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>
                  <button
                    onClick={() => handleManual(next)}
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-brand-red flex items-center justify-center text-white hover:bg-brand-red-dark hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(225,29,72,0.4)]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress Indication Line at absolute bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10" style={{ zIndex: 20 }}>
             <motion.div
               key={current}
               className="h-full bg-brand-red"
               initial={{ width: "0%" }}
               animate={{ width: "100%" }}
               transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
             />
          </div>
        </motion.div>

        {/* ── SEO CONTENT BLOCK ── */}

        {/* H1 + Intro */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-20 max-w-4xl mx-auto mb-14 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight text-balance"
          >
            Live Singers in Bangalore for Weddings, Parties &amp; Events
          </motion.h1>
          <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
            Urban Raaga is a leading music agency offering the best <strong className="text-white">live singers in Bangalore</strong>, including{" "}
            <strong className="text-white">Kannada singers in Bangalore</strong>,{" "}
            <strong className="text-white">English singers in Bangalore</strong>, and high-energy{" "}
            <strong className="text-white">live bands in Bangalore</strong> for weddings, corporate events, and private parties. We deliver unforgettable live music experiences tailored to your audience, event style, and vibe.
          </p>
        </motion.div>

          {/* 4 Keyword Sections */}
        <div className="max-w-5xl mx-auto space-y-6 mb-14">
          {[
            {
              icon: <svg className="w-6 h-6 text-white group-hover:text-brand-red transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>,
              title: "Professional Live Singers in Bangalore",
              body: "Looking to hire experienced live singers in Bangalore? Urban Raaga provides versatile singers for weddings, sangeet, receptions, birthdays, and corporate events. Our artists perform across Bollywood, Kannada, Hindi, Tamil, Telugu, and English music — ensuring every guest enjoys the celebration.",
              bullets: [],
            },
            {
              icon: <svg className="w-6 h-6 text-white group-hover:text-brand-red transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>,
              title: "Top Kannada Singers in Bangalore",
              body: "Add a local touch to your celebration with talented Kannada singers in Bangalore. From evergreen classics to trending hits, our singers create the perfect atmosphere for:",
              bullets: ["Weddings & receptions", "Cultural events", "Private parties"],
            },
            {
              icon: <svg className="w-6 h-6 text-white group-hover:text-brand-red transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
              title: "English Singers in Bangalore for Premium Events",
              body: "Looking for international vibes? Our professional English singers in Bangalore bring a global music experience — from pop and rock to jazz and acoustic — and are perfect for:",
              bullets: ["Corporate events", "Luxury weddings", "Cocktail parties & private elite gatherings"],
            },
            {
              icon: <svg className="w-6 h-6 text-white group-hover:text-brand-red transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
              title: "Live Bands in Bangalore for High-Energy Performances",
              body: "Our live bands in Bangalore bring energy, excitement, and stage presence to your events. Choose from acoustic bands, Bollywood bands, and fusion & party bands — perfect for large-scale weddings, corporate shows, and nightlife events.",
              bullets: [],
            },
          ].map(({ icon, title, body, bullets }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07 }}
              className="rounded-2xl p-8 border border-white/10 hover:border-brand-red/40 transition-all duration-300 group"
              style={{ background: "rgba(255,255,255,0.04)", backdropFilter: "blur(4px)" }}
            >
              <h2 className="text-lg sm:text-xl font-bold text-white mb-3 flex items-center gap-3">
                <span className="flex-shrink-0">{icon}</span>
                <span className="group-hover:text-brand-red transition-colors duration-200">{title}</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-3">{body}</p>
              {bullets.length > 0 && (
                <ul className="space-y-1.5 pl-2">
                  {bullets.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

        {/* Local SEO Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto mb-10 rounded-2xl p-6 sm:p-8 border border-white/10 text-center"
          style={{ background: "rgba(255,255,255,0.04)" }}
        >
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            <span className="text-white font-semibold">Serving All Areas in Bangalore —</span>{" "}
            We provide live singers, Kannada singers, English singers, and live bands across{" "}
            <span className="text-white">Indiranagar, Whitefield, Koramangala, HSR Layout, Electronic City</span>, and nearby areas.
          </p>
        </motion.div>

        {/* CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-2xl p-8 text-center"
          style={{ background: "linear-gradient(135deg, #be123c 0%, #e11d48 60%, #f43f5e 100%)" }}
        >
          <h2 className="text-xl sm:text-2xl font-black text-white mb-2">
            Book the Best Singers &amp; Bands in Bangalore
          </h2>
          <p className="text-white/80 text-sm sm:text-base mb-5 max-w-xl mx-auto">
            Whether you need live singers, a Kannada singer, an English singer, or a full live band — Urban Raaga is your trusted music partner.
          </p>
          <a
            href="#contact"
            className="inline-block bg-white text-brand-red font-bold text-sm px-8 py-3 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
          >
            Contact Us — Check Availability &amp; Pricing
          </a>
        </motion.div>
      </div>

      {/* ── Ken Burns keyframe ── (injected as a style tag) ── */}
      <style>{`
        @keyframes kenBurns {
          0%   { transform: scale(1.0); }
          100% { transform: scale(1.08); }
        }
      `}</style>
    </section>
  );
}
