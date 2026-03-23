"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Artist } from "@/lib/artists";

export default function ArtistProfileClient({ artist }: { artist: Artist }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  // Form states for booking
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [guests, setGuests] = useState("");
  const [requirements, setRequirements] = useState("");

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white selection:bg-[#FF2E2E] selection:text-white pb-0">
      <Navbar />

      {/* =======================
          HERO SECTION 
         ======================= */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-12 pt-32">
        <Image
          src={artist.images[0]}
          alt={artist.name}
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlays for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {artist.badges.map(badge => (
                <span key={badge} className="px-3 py-1 bg-[#FF2E2E] text-white text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg">
                  ★ {badge}
                </span>
              ))}
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md text-white border border-white/20 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-1">
                <span className="text-yellow-400">★</span> {artist.rating} Rating
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-2 tracking-tight">
              {artist.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-medium mb-6">
              {artist.title}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-400">
              <span className="flex items-center gap-1">
                📍 {artist.location}
              </span>
              <span className="flex items-center gap-1">
                🎤 {artist.totalBookings} Bookings
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 shrink-0">
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="px-8 py-4 bg-[#FF2E2E] hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(255,46,46,0.4)] hover:scale-105"
            >
              Book Performance
            </button>
            <Link 
              href="https://wa.me/919424700519" 
              target="_blank"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-bold rounded-full transition-all text-center"
            >
              Contact Now
            </Link>
          </div>
        </div>
      </section>

      {/* =======================
          CONTENT LAYOUT
         ======================= */}
      <section className="py-12 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
          
          {/* Main Info */}
          <div className="flex-1 space-y-12">
            
            {/* About Artist */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FF2E2E]/20 flex items-center justify-center text-[#FF2E2E]">👤</span>
                About {artist.name.split(" ")[0]}
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                {artist.fullDescription}
              </div>
            </div>

            {/* Performance Details */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FF2E2E]/20 flex items-center justify-center text-[#FF2E2E]">🎪</span>
                Best For Events
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {artist.bestFor.map((item) => (
                  <div key={item.category}>
                    <h3 className="text-lg font-bold text-gray-200 mb-3">{item.category}</h3>
                    <ul className="space-y-2">
                      {item.events.map(event => (
                        <li key={event} className="flex items-center gap-2 text-gray-400">
                          <span className="text-[#FF2E2E]">•</span> {event}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Gallery Grid */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FF2E2E]/20 flex items-center justify-center text-[#FF2E2E]">📸</span>
                Performance Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {artist.images.map((src, index) => (
                  <div key={index} className="relative w-full aspect-square rounded-2xl overflow-hidden group">
                    <Image src={src} alt={`Gallery ${index + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Sidebar (Pricing & Specs) */}
          <aside className="w-full lg:w-96 flex-shrink-0 space-y-8">
            
            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sticky top-28 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-center text-gray-400 text-sm">Packages &amp; Pricing</h2>
              
              <div className="space-y-4 mb-8">
                {artist.pricing.map(pkg => (
                  <div key={pkg.type} className="flex items-center justify-between p-4 bg-black/40 rounded-xl border border-white/5">
                    <span className="font-bold text-white">{pkg.type}</span>
                    <span className="font-black text-[#FF2E2E]">₹{pkg.price.toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8 text-sm text-gray-400">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Prices are indicative and starting
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  Final price varies based on duration & limits
                </p>
                <p className="flex items-center gap-2 text-[#FF2E2E]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  Sound / PA system not included
                </p>
              </div>

              <button 
                onClick={() => setIsBookingModalOpen(true)}
                className="w-full py-4 bg-[#FF2E2E] hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(255,46,46,0.3)] hover:scale-105"
              >
                Send Enquiry
              </button>
            </div>

            {/* Service Areas */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Available In</h3>
              <div className="flex flex-wrap gap-2">
                {artist.availableIn.map(area => (
                  <span key={area} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-semibold text-gray-300">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Genres */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {artist.genres.map(genre => (
                  <span key={genre} className="px-3 py-1.5 bg-black/50 border border-white/5 rounded-lg text-xs font-semibold text-[#FF2E2E]">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
          </aside>

        </div>
      </section>

      <Footer />

      {/* =======================
          BOOKING MODAL 
         ======================= */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setIsBookingModalOpen(false)}
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#141414] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Header */}
              <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Book {artist.name}</h3>
                  <p className="text-sm text-gray-400">Fill details to check availability and get custom quotes.</p>
                </div>
                <button 
                  onClick={() => setIsBookingModalOpen(false)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Form Body */}
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Event Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Event Type</label>
                    <select 
                      value={eventType} 
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors"
                    >
                      <option value="" disabled className="bg-gray-900">Select Event Type</option>
                      <option className="bg-gray-900" value="Wedding">Wedding / Sangeet</option>
                      <option className="bg-gray-900" value="Corporate">Corporate Event</option>
                      <option className="bg-gray-900" value="PrivateParty">Private Party</option>
                      <option className="bg-gray-900" value="Other">Other</option>
                    </select>
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Event Date</label>
                    <input 
                      type={date ? "date" : "text"}
                      placeholder="dd/mm/yyyy"
                      onFocus={(e) => { e.target.type = "date"; e.target.showPicker && e.target.showPicker(); }}
                      onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                      min={new Date().toLocaleDateString('en-CA')}
                      value={date} 
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors"
                    />
                  </div>

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Venue Area</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Indiranagar, Bangalore"
                      value={eventLocation} 
                      onChange={(e) => setEventLocation(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors placeholder:text-gray-600"
                    />
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Approximate Guests</label>
                    <select 
                      value={guests} 
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors"
                    >
                      <option value="" disabled className="bg-gray-900">Select Capacity</option>
                      <option className="bg-gray-900" value="0-50">Under 50</option>
                      <option className="bg-gray-900" value="50-200">50 - 200</option>
                      <option className="bg-gray-900" value="200-500">200 - 500</option>
                      <option className="bg-gray-900" value="500+">500+</option>
                    </select>
                  </div>
                </div>

                {/* Additional Needs */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Special Requirements (Optional)</label>
                  <textarea 
                    rows={4}
                    placeholder="Tell us about specific songs, setup needs, or schedule..."
                    value={requirements} 
                    onChange={(e) => setRequirements(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors placeholder:text-gray-600 resize-none"
                  />
                </div>

              </div>

              {/* Footer CTA */}
              <div className="px-8 py-6 border-t border-white/10 bg-black/20 flex items-center justify-between">
                <p className="text-xs text-gray-500">* Advance is required to lock dates.</p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsBookingModalOpen(false)}
                    className="px-6 py-3 bg-transparent text-white font-bold rounded-full hover:bg-white/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={() => {
                      alert("Booking Enquiry Sent! The team will contact you shortly.");
                      setIsBookingModalOpen(false);
                    }}
                    className="px-8 py-3 bg-[#FF2E2E] text-white font-bold rounded-full hover:bg-red-700 transition-colors shadow-lg shadow-red-500/30"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
