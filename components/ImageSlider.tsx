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
          className="relative rounded-2xl overflow-hidden bg-gray-900"
          style={{ aspectRatio: "16 / 7" }}
        >

          {/* ── BACKGROUND IMAGES (crossfade stack) ── */}
          {slides.map((slide, i) => (
            <div
              key={slide.id}
              className="absolute inset-0 transition-opacity"
              style={{
                opacity: i === current ? 1 : 0,
                transition: `opacity ${TRANSITION_DURATION}s ease-in-out`,
                zIndex: i === current ? 2 : 1,
              }}
            >
              {/* Ken Burns zoom animation via CSS */}
              <div
                className="absolute inset-0"
                style={{
                  animation: i === current ? `kenBurns ${SLIDE_DURATION}ms ease-in-out forwards` : "none",
                }}
              >
                <Image
                  src={slide.url}
                  alt={slide.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}

          {/* ── GRADIENT OVERLAYS (cinematic vignette) ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.1) 70%, transparent 100%)",
              zIndex: 10,
            }}
          />
          {/* Side vignettes */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.4) 100%)",
              zIndex: 10,
            }}
          />

          {/* ── STARCLINCH-STYLE HEADLINE TEXT ── */}
          <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-14 px-4"
            style={{ zIndex: 20 }}
          >
            {/* Static prefix */}
            <p className="text-white/80 text-sm sm:text-base font-medium tracking-widest uppercase mb-2">
              Book Live Music for
            </p>

            {/* Animated category (slide-up + fade — StarClinch signature) */}
            <div className="overflow-hidden h-[3.5rem] sm:h-[4.5rem] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.h3
                  key={current}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="text-3xl sm:text-5xl font-black text-white text-center leading-tight whitespace-nowrap"
                >
                  {slides[current].category}
                </motion.h3>
              </AnimatePresence>
            </div>

            {/* Sub-label */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${current}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                className="mt-3 text-white/60 text-xs sm:text-sm font-medium tracking-wider"
              >
                {slides[current].alt}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* ── PROGRESS BAR ── */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10" style={{ zIndex: 20 }}>
            <motion.div
              key={current}
              className="h-full bg-brand-red"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: SLIDE_DURATION / 1000, ease: "linear" }}
            />
          </div>

          {/* ── NAV ARROWS ── */}
          <button
            onClick={() => handleManual(prevSlide)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
            style={{ zIndex: 20, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-white group-hover:text-brand-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={() => handleManual(next)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 group"
            style={{ zIndex: 20, background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-white group-hover:text-brand-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* ── DOT NAVIGATION ── */}
          <div className="absolute top-5 right-5 flex flex-col gap-1.5" style={{ zIndex: 20 }}>
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); resetTimer(); }}
                aria-label={`Go to slide ${i + 1}`}
                className="group flex items-center gap-2 justify-end"
              >
                <span
                  className="block rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "24px" : "6px",
                    height: "6px",
                    background: i === current ? "#e11d48" : "rgba(255,255,255,0.4)",
                    boxShadow: i === current ? "0 0 8px rgba(225,29,72,0.6)" : "none",
                  }}
                />
              </button>
            ))}
          </div>

          {/* ── SLIDE COUNTER ── */}
          <div
            className="absolute top-5 left-5 text-white/50 text-xs font-mono tracking-widest"
            style={{ zIndex: 20 }}
          >
            <span className="text-white font-bold">{String(current + 1).padStart(2, "0")}</span>
            <span> / {String(slides.length).padStart(2, "0")}</span>
          </div>
        </motion.div>

        {/* ── SEO CONTENT BLOCK ── */}

        {/* H1 + Intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto mb-14 text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-6 leading-tight text-balance">
            Live Singers in Bangalore for Weddings, Parties &amp; Events
          </h1>
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
              tag: "🎤",
              title: "Professional Live Singers in Bangalore",
              body: "Looking to hire experienced live singers in Bangalore? Urban Raaga provides versatile singers for weddings, sangeet, receptions, birthdays, and corporate events. Our artists perform across Bollywood, Kannada, Hindi, Tamil, Telugu, and English music — ensuring every guest enjoys the celebration.",
              bullets: [],
            },
            {
              tag: "🎧",
              title: "Top Kannada Singers in Bangalore",
              body: "Add a local touch to your celebration with talented Kannada singers in Bangalore. From evergreen classics to trending hits, our singers create the perfect atmosphere for:",
              bullets: ["Weddings & receptions", "Cultural events", "Private parties"],
            },
            {
              tag: "🎸",
              title: "English Singers in Bangalore for Premium Events",
              body: "Looking for international vibes? Our professional English singers in Bangalore bring a global music experience — from pop and rock to jazz and acoustic — and are perfect for:",
              bullets: ["Corporate events", "Luxury weddings", "Cocktail parties & private elite gatherings"],
            },
            {
              tag: "🎶",
              title: "Live Bands in Bangalore for High-Energy Performances",
              body: "Our live bands in Bangalore bring energy, excitement, and stage presence to your events. Choose from acoustic bands, Bollywood bands, and fusion & party bands — perfect for large-scale weddings, corporate shows, and nightlife events.",
              bullets: [],
            },
          ].map(({ tag, title, body, bullets }, idx) => (
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
                <span className="text-2xl">{tag}</span>
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
            <span className="text-white font-semibold">📍 Serving All Areas in Bangalore —</span>{" "}
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
