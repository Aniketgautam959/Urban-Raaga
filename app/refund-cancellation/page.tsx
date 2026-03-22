"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RefundCancellationPage() {
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
            Refund &amp; <span className="text-[#FF2E2E]">Cancellation Policy</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-medium leading-relaxed text-balance">
            Understand our booking, cancellation, and refund policies for Urban Raaga services.
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
              
              <p className="text-xl text-gray-300 font-medium leading-relaxed mb-10">
                At Urban Raaga, we commit artist availability exclusively for your event once a booking is confirmed. This policy ensures fairness to both clients and performers.
              </p>

              <div className="w-16 h-1 bg-[#FF2E2E] rounded-full mb-10" />

              <h3 className="text-2xl font-bold text-white mb-4">Booking Confirmation</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>A booking is confirmed only after receiving an advance payment (minimum 40% of total amount)</li>
                <li>Once confirmed, the artist is blocked for your date and is not available for other bookings</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white mb-6">Cancellation by Client</h3>
              
              <div className="space-y-6 mb-10">
                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-2">More than 10 days before the event:</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 marker:text-gray-500">
                    <li>Maximum 30% of advance amount may be refunded (processing charges applicable)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-2">5–10 days before the event:</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 marker:text-gray-500">
                    <li>No refund of advance amount</li>
                    <li>Rescheduling may be considered</li>
                  </ul>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-200 mb-2">Less than 5 days before the event:</h4>
                  <ul className="list-disc list-inside text-gray-400 space-y-1 marker:text-gray-500">
                    <li>No refund under any circumstances</li>
                  </ul>
                </div>
              </div>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white mb-4">Rescheduling Policy</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>Allowed only once and subject to artist availability</li>
                <li>Must be requested at least 5 days before the event</li>
                <li>New date must be within 30 days</li>
                <li>If artist unavailable, booking will be treated as cancelled with no refund</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white mb-4">Payment &amp; Booking Process</h3>
              <p className="text-gray-300 font-medium mb-3">Once booking enquiry is submitted:</p>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>Our team will confirm event details, artist availability, and pricing</li>
                <li>Advance payment is required via UPI or bank transfer</li>
                <li>18% GST applicable for invoice-based payments</li>
                <li>Booking is confirmed only after receiving the advance</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white mb-4">Cancellation / Changes by Client</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>Last-minute changes in timing, venue, or requirements may lead to additional charges</li>
                <li>Delays caused by the client may result in reduced performance time without refund</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white mb-4">Cancellation by Urban Raaga / Artist</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>A replacement artist of similar standard will be arranged</li>
                <li>If not possible, only the advance amount will be refunded</li>
                <li>No additional compensation will be provided</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white mb-4">Refund Processing</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>Eligible refunds will be processed within 7–10 working days</li>
                <li>Refunds will be made via original payment method or bank transfer</li>
                <li>Transaction charges are non-refundable</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white mb-4">Performance Concerns</h3>
              <ul className="list-disc list-inside text-gray-400 space-y-2 mb-10 marker:text-[#FF2E2E]">
                <li>Must be reported within 12 hours of the event</li>
                <li>Claims without valid proof will not be considered</li>
                <li>No refunds will be issued based on subjective preferences</li>
              </ul>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white mb-4">Contact</h3>
              <p className="text-gray-400 mb-10">
                <span className="font-semibold text-gray-300">Phone / WhatsApp:</span> 01169261547
              </p>

              <div className="w-full h-px bg-white/10 my-10" />

              <h3 className="text-2xl font-bold text-white mb-4">Final Note</h3>
              <p className="text-gray-300 bg-[#FF2E2E]/10 border border-[#FF2E2E]/20 p-5 rounded-xl font-medium">
                By confirming a booking with Urban Raaga, you agree to all terms mentioned above.
              </p>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ❓ FAQ SECTION */}
      <section className="py-20 bg-black border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-16 h-1 bg-[#FF2E2E] mx-auto rounded-full mb-4" />
            <p className="text-gray-400">Booking, Payment, Refund &amp; Cancellation</p>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: "Why do I need to pay an advance booking amount?",
                a: "An advance payment (typically 30–40%) is required to confirm your booking and block the artist for your event date.\n\nSince our artists are reserved exclusively for your event, advance payment ensures commitment from both sides and avoids last-minute cancellations."
              },
              {
                q: "Can I reschedule my event after paying the advance?",
                a: "Rescheduling is allowed only once and is subject to artist availability.\n\nThe request must be made at least 5 days before the event, and the new date should fall within 30 days of the original booking.\n\nIf the artist is unavailable on the new date, the booking will be treated as cancelled."
              },
              {
                q: "Is a venue inspection required before booking?",
                a: "In most cases, a physical inspection is not required.\n\nHowever, for larger events or specific technical setups, our team may request basic details such as venue size, stage setup, or sound requirements to ensure a smooth performance."
              },
              {
                q: "What happens if I cancel or change my event date?",
                a: "Cancellation and changes are subject to our refund policy:\n\n• More than 10 days before event → Partial refund may apply\n• 5–10 days before event → No refund, rescheduling may be allowed\n• Less than 5 days → No refund\n\nAny major changes in event details may also impact availability or pricing."
              },
              {
                q: "How do I make the payment for booking?",
                a: "Once your enquiry is confirmed, our team will contact you with booking details.\n\nYou can make the advance payment via:\n\n• UPI (Google Pay / PhonePe)\n• Bank transfer\n\nFor company invoice and bank transfer payments, 18% GST will be applicable."
              },
              {
                q: "How long does it take to receive a refund?",
                a: "Eligible refunds (if applicable) are processed within 7–10 working days from the date of approval.\n\nRefunds are made via the original payment method or bank transfer.\nPlease note that transaction or payment gateway charges are non-refundable."
              }
            ].map((faq, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 hover:border-[#FF2E2E]/30 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-4 flex items-start gap-4">
                  <span className="text-[#FF2E2E] shrink-0">Q.</span>
                  {faq.q}
                </h3>
                <div className="flex items-start gap-4">
                  <span className="text-gray-500 font-bold shrink-0">A.</span>
                  <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                    {faq.a}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🚀 QUICK CTA */}
      <section className="py-16 text-center border-t border-white/10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Want to speak with our support team?</h2>
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
