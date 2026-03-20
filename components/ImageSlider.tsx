"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { sliderImages } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";

export default function ImageSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % sliderImages.length);
  }, []);

  const prev = () => {
    setCurrent((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="py-24 bg-gray-50" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-brand-red text-sm font-bold uppercase tracking-widest mb-3">
            Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Live Performances That Wow
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            A glimpse of the magical moments created by our talented artists at real events.
          </p>
        </motion.div>

        {/* Slider */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[16/7] bg-gray-900"
        >
          <AnimatePresence mode="popLayout">
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={sliderImages[current].url}
                alt={sliderImages[current].alt}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1280px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
            aria-label="Previous slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur hover:bg-white/40 rounded-full flex items-center justify-center transition-colors"
            aria-label="Next slide"
          >
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {sliderImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`rounded-full transition-all duration-300 ${i === current ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Caption */}
          <div className="absolute bottom-12 left-6 text-white">
            <p className="font-semibold text-sm bg-black/30 backdrop-blur rounded-full px-4 py-1.5">
              {sliderImages[current].alt}
            </p>
          </div>
        </motion.div>

        {/* SEO Content & Categories */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 max-w-4xl mx-auto mb-16 text-center"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight text-balance">
            Live Singer in Bangalore for Weddings, Parties & Corporate Events
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed text-balance max-w-3xl mx-auto">
            Bring your events to life with the best live singers and bands in Bangalore. 
            Whether you&apos;re hosting an intimate house party, a grand wedding reception, or an 
            upscale corporate gala, our verified artists deliver world-class performances.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">

          <div className="space-y-6">
            {/* Wedding Singers */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-brand-red rounded-full block group-hover:scale-y-110 transition-transform" />
                Wedding Singer Bangalore
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Make your wedding unforgettable with a live singer. Our curated wedding performers
                specialize in romantic Hindi melodies, sangeet numbers, and classic Bollywood hits
                that keep guests on the dance floor all night long.
              </p>
            </div>

            {/* College Fest */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-brand-red rounded-full block group-hover:scale-y-110 transition-transform" />
                College Fest Singer Bangalore
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Elevate your college fest with high-energy live music that sets the perfect vibe and gets the crowd jumping. From acoustic sets to full indie bands, our singers adapt perfectly to the youthful energy of campus events.
              </p>
            </div>
          </div>

          {/* Corporate & Birthday */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-brand-red rounded-full block group-hover:scale-y-110 transition-transform" />
                Corporate Event Singer Bangalore
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Impress clients and employees alike with premium live music at your corporate events, annual galas,
                and product launches. Our professional corporate entertainment
                artists understand the importance of ambiance and audience engagement.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 border border-gray-100 group">
              <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-1 h-5 bg-brand-red rounded-full block group-hover:scale-y-110 transition-transform" />
                Birthday Party Singer Bangalore
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Celebrate your special day with incredible live performances at your birthday bash! Our singers bring the perfect mix of favorite nostalgic songs and modern hits, making every moment of your birthday celebration truly unforgettable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
