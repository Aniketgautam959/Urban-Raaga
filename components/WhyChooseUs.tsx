"use client";

import { whyChooseUs } from "@/lib/data";
import { motion } from "framer-motion";

export default function WhyChooseUs() {
  const icons = [
    <svg key="shield" className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    <svg key="lock" className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    <svg key="map" className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    <svg key="calendar" className="w-6 h-6 text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
  ];

  return (
    <section className="py-24 bg-white" id="why-choose-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block text-brand-red text-sm font-bold uppercase tracking-widest mb-3">
            Why Urban Raaga
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Why Choose Us?
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            We make live music booking simple, safe, and spectacular — so you can focus on celebrating.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyChooseUs.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              key={idx}
              className="group relative bg-white border border-gray-100 rounded-2xl p-7 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-red-light rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500" />

              {/* Icon */}
              <div className="relative w-14 h-14 bg-brand-red-light rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:bg-brand-red transition-colors duration-300">
                <span className="relative z-10">{icons[idx]}</span>
              </div>

              {/* Content */}
              <h3 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>

              {/* Bottom accent bar */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-red to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
