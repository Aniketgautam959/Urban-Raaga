"use client";

import { useState } from "react";
import { testimonials } from "@/lib/data";
import { motion } from "framer-motion";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-red text-sm font-bold uppercase tracking-widest mb-3">
            Client Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Happy clients across Bangalore have celebrated with Urban Raaga.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -8, scale: 1.02 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 300, damping: 25 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-shadow duration-300 flex flex-col gap-4 cursor-pointer"
            >
              {/* Quote */}
              <div className="text-brand-red text-3xl font-serif leading-none">&ldquo;</div>

              {/* Rating */}
              <StarRating rating={t.rating} />

              {/* Review */}
              <p className="text-gray-600 text-sm leading-relaxed flex-1">{t.review}</p>

              {/* User */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{t.avatar}</span>
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.event} · {t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-card">
            <div className="text-brand-red text-3xl font-serif leading-none mb-3">&ldquo;</div>
            <StarRating rating={testimonials[activeIndex].rating} />
            <p className="text-gray-600 text-sm leading-relaxed mt-3 mb-5">
              {testimonials[activeIndex].review}
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
              <div className="w-10 h-10 bg-brand-red rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{testimonials[activeIndex].avatar}</span>
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">{testimonials[activeIndex].name}</p>
                <p className="text-gray-400 text-xs">{testimonials[activeIndex].event} · {testimonials[activeIndex].location}</p>
              </div>
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === activeIndex ? "bg-brand-red w-6" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile Slider / Desktop Grid ends here */}
      </div>
    </section>
  );
}
