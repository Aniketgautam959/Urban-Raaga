"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPolicyPage() {
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
            Urban Raaga
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight text-balance">
            Privacy <span className="text-[#FF2E2E]">Policy</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed text-balance">
            Urban Raaga is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our services.
          </p>
        </motion.div>
      </section>

      {/* 📄 POLICY CONTENT */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl"
          >
            <div className="prose prose-invert prose-lg max-w-none">
              
              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <span className="text-2xl">📋</span> Information We Collect
              </h3>
              <p className="text-gray-300 font-medium mb-3">We may collect the following information:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>Name</li>
                <li>Phone number</li>
                <li>Email address</li>
                <li>Event details (date, location, type of event)</li>
                <li>Any additional information you provide through enquiry forms or communication</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <span className="text-2xl">🎯</span> How We Use Your Information
              </h3>
              <p className="text-gray-300 font-medium mb-3">We use your information to:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>Respond to your enquiries and booking requests</li>
                <li>Connect you with suitable singers or bands</li>
                <li>Provide customer support</li>
                <li>Improve our services and user experience</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <span className="text-2xl">📞</span> Communication
              </h3>
              <p className="text-gray-400 leading-relaxed mb-10">
                By submitting your details, you agree that our team may contact you via Phone calls, WhatsApp, or Email for booking-related communication and service updates.
              </p>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <span className="text-2xl">🔐</span> Data Protection
              </h3>
              <p className="text-gray-400 leading-relaxed mb-10">
                We take reasonable steps to protect your personal information and prevent unauthorized access, misuse, or disclosure. However, no online system is completely secure, and we cannot guarantee absolute security.
              </p>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <span className="text-2xl">🤝</span> Information Sharing
              </h3>
              <p className="text-gray-300 font-medium mb-3">We do not sell or rent your personal information. We may share your details only with:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>Artists or service providers (for booking purposes)</li>
                <li>Payment partners (for processing transactions)</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <span className="text-2xl">💳</span> Payments
              </h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>All payments are processed via secure methods such as UPI or bank transfer.</li>
                <li>For company invoice payments, applicable taxes (including GST) may apply.</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <span className="text-2xl">🍪</span> Cookies
              </h3>
              <p className="text-gray-400 leading-relaxed mb-10">
                Our website may use cookies to enhance user experience and analyze website traffic.
              </p>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <span className="text-2xl">🔄</span> Changes to This Policy
              </h3>
              <p className="text-gray-400 leading-relaxed mb-10">
                Urban Raaga reserves the right to update this Privacy Policy at any time. Changes will be posted on this page.
              </p>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-4">
                <span className="text-2xl">📞</span> Contact Us
              </h3>
              <p className="text-gray-400 mb-2">If you have any questions regarding this Privacy Policy, please contact us:</p>
              <ul className="space-y-2 text-gray-300">
                <li><span className="font-semibold text-white">📞 Phone:</span> 01169261547</li>
                <li><span className="font-semibold text-white">💬 WhatsApp:</span> 9424700519</li>
                <li><span className="font-semibold text-white">📍 Address:</span> 24, Indiranagar 2nd Stage, Bengaluru, Karnataka – 560038</li>
              </ul>

            </div>
          </motion.div>
        </div>
      </section>

      {/* 🚀 QUICK CTA */}
      <section className="py-16 text-center border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Need assistance with your booking?</h2>
        <Link
          href="tel:01169261547"
          className="inline-flex items-center justify-center gap-2 bg-[#FF2E2E] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full text-base shadow-[0_0_20px_rgba(255,46,46,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
          Call Us Now
        </Link>
      </section>

      <Footer />
    </main>
  );
}
