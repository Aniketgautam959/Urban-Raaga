"use client";

import { useState } from "react";
import { faqs } from "@/lib/data";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-gray-50" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-brand-red text-sm font-bold uppercase tracking-widest mb-3">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Everything you need to know about booking a live singer through Urban Raaga.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl overflow-hidden shadow-sm border transition-all duration-300 ${
                  isOpen ? "border-brand-red shadow-card" : "border-gray-100"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
                >
                  <span className={`font-semibold text-sm sm:text-base transition-colors ${isOpen ? "text-brand-red" : "text-gray-900 group-hover:text-brand-red"}`}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 flex-shrink-0 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-brand-red border-brand-red rotate-45" : "border-gray-200 group-hover:border-brand-red"}`}>
                    <svg
                      className={`w-4 h-4 transition-colors ${isOpen ? "text-white" : "text-gray-400 group-hover:text-brand-red"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v12M6 12h12" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-64" : "max-h-0"}`}
                >
                  <div className="px-6 pb-5">
                    <div className="h-px bg-gray-100 mb-4" />
                    <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-white rounded-2xl p-8 shadow-card border border-gray-100">
          <p className="font-bold text-gray-900 text-lg mb-2">Still have questions?</p>
          <p className="text-gray-500 text-sm mb-6">
            Our team is available 7 days a week to help you plan the perfect event.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+919999999999"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold px-8 py-3 rounded-full text-sm transition-all shadow-lg hover:scale-105"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call Us Now
            </a>
            <a
              href="mailto:hello@urbanraaga.com"
              className="inline-flex items-center justify-center gap-2 border-2 border-brand-red text-brand-red hover:bg-brand-red-light font-bold px-8 py-3 rounded-full text-sm transition-all"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
