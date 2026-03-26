"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtistWhyChooseUs from "@/components/ArtistWhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import type { Artist } from "@/lib/artists";

const LOCATION_OPTIONS = [
  "Bangalore",
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "HSR Layout",
  "JP Nagar",
  "Jayanagar",
  "Hebbal",
  "Marathahalli"
];

export default function ArtistProfileClient({ artist }: { artist: Artist }) {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [lightboxMedia, setLightboxMedia] = useState<{ url: string; type: 'image' | 'video' | 'youtube' } | null>(null);

  // Form states for booking
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [guests, setGuests] = useState("");
  const [indoorOutdoor, setIndoorOutdoor] = useState("");
  const [soundRequirement, setSoundRequirement] = useState("");
  const [requirements, setRequirements] = useState("");

  // Dynamic pricing computation
  const computePrice = () => {
    const solo = artist.pricing?.find(p => p.type === "Solo")?.price || 0;
    const duo = artist.pricing?.find(p => p.type === "Duo")?.price || solo * 1.5;
    const trio = artist.pricing?.find(p => p.type === "Trio")?.price || solo * 2;

    let base = eventType === "Duo" ? duo : eventType === "Trio" ? trio : solo;

    // Guest multiplier
    if (guests === "50-200") base = Math.round(base * 1.15);
    else if (guests === "200-500") base = Math.round(base * 1.35);
    else if (guests === "500+") base = Math.round(base * 1.6);

    // Venue modifier
    if (indoorOutdoor === "Outdoor") base = Math.round(base * 1.2);

    // Sound modifier
    if (soundRequirement === "Need Urban Raaga to arrange") base = Math.round(base + 5000);

    return base;
  };

  const dynamicPrice = computePrice();

  const getBadgeStyle = (badge: string) => {
    switch(badge.toLowerCase()) {
      case "top performer":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.2)]";
      case "premium performer":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.2)]";
      case "soulful":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30 shadow-[0_0_15px_rgba(249,115,22,0.2)]";
      case "established artist":
      case "seasoned artist":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]";
      case "urban raaga's choice":
      case "emerging artist":
        return "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-200 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.2)]";
      case "23+ years experience":
        return "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]";
      case "budget friendly":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
      case "multi-language performer":
      case "multi lang":
      case "multilingual":
      case "multi-language live band":
        return "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)]";
      default:
        return "bg-[#FF2E2E]/20 text-[#FF2E2E] border border-[#FF2E2E]/30 shadow-[0_0_15px_rgba(255,46,46,0.2)]";
    }
  };

  return (
    <>
      <main className="min-h-screen bg-[#0F0F0F] text-white selection:bg-[#FF2E2E] selection:text-white pb-0">
      <Navbar />

      {/* =======================
          HERO SECTION 
         ======================= */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-end pb-12 pt-32">
        <Image
          src={artist.images.find(img => img) || (artist as any).coverImage || "/placeholder.jpg"}
          alt={artist.imageAlts?.[0] ?? `${artist.name} - Live Singer for Booking in Bangalore`}
          fill
          className="object-cover object-top"
          priority
        />
        {/* Dark Overlays for text readability and premium look */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/90 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/80 to-transparent w-full md:w-2/3" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col md:flex-row md:items-end justify-between gap-8 mb-4">
          <div className="flex-1">
            <div className="flex flex-wrap gap-3 mb-6">
              {artist.badges.map(badge => (
                <span key={badge} className={`px-4 py-1.5 text-xs font-bold uppercase tracking-widest rounded-full backdrop-blur-md flex items-center gap-1.5 transition-all hover:scale-105 cursor-default ${getBadgeStyle(badge)}`}>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                  {badge}
                </span>
              ))}
              <span className="px-4 py-1.5 bg-white/5 backdrop-blur-md text-gray-200 border border-white/10 text-xs font-bold uppercase tracking-widest rounded-full flex items-center gap-1.5">
                 <span className="text-yellow-500">★</span> {artist.rating} Rating
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-4 tracking-tight drop-shadow-2xl">
              {artist.name}
            </h1>
            
            {artist.shortDescription && (
              <p className="text-xl md:text-2xl text-gray-300 font-medium mb-8 max-w-2xl">
                {artist.shortDescription}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 text-sm font-semibold text-gray-400">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {artist.location}
              </span>
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                {artist.totalBookings} Bookings
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
                <span className="w-8 h-8 rounded-full bg-[#FF2E2E]/10 flex items-center justify-center text-[#FF2E2E]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </span>
                About {artist.name.split(" ")[0]}
              </h2>
              <div className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed whitespace-pre-wrap">
                {artist.bio}
              </div>
            </div>

            {/* Performance Details */}
            {artist.bestFor && artist.bestFor.length > 0 && (
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#FF2E2E]/10 flex items-center justify-center text-[#FF2E2E]">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                  </span>
                  Best For Events
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {artist.bestFor.map((item) => (
                    <div key={item.category}>
                      <h3 className="text-lg font-bold text-gray-200 mb-3">{item.category}</h3>
                      <ul className="space-y-2">
                        {item.events.map(event => (
                          <li key={event} className="flex items-center gap-2 text-gray-400 inline-flex">
                            <span className="text-[#FF2E2E]">■</span> {event}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Media Gallery Grid */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 sm:p-10">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#FF2E2E]/10 flex items-center justify-center text-[#FF2E2E]">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </span>
                Performance Gallery
              </h2>
              
              {/* Videos */}
              {artist.videos && artist.videos.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {artist.videos.map((src, index) => (
                    <div 
                      key={index} 
                      onClick={() => setLightboxMedia({ url: src, type: src.endsWith('.mp4') ? 'video' : 'youtube' })}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden group bg-black shadow-lg cursor-pointer"
                    >
                      {src.endsWith('.mp4') ? (
                        <>
                          <video 
                            src={src} 
                            className="w-full h-full object-cover absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                             <div className="w-12 h-12 rounded-full bg-[#FF2E2E]/90 backdrop-blur-md flex items-center justify-center text-white shadow-[0_0_25px_rgba(255,46,46,0.6)] group-hover:scale-110 transition-transform">
                                <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                             </div>
                          </div>
                        </>
                      ) : (
                        <div className="relative w-full h-full pointer-events-none group-hover:opacity-90 transition-opacity">
                          <iframe 
                            src={src} 
                            className="w-full h-full border-0 absolute inset-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen
                          />
                          <div className="absolute inset-0 bg-transparent z-10" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Photos */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {artist.images.map((src, index) => (
                  <div 
                    key={index} 
                    onClick={() => setLightboxMedia({ url: src, type: 'image' })}
                    className="relative w-full aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                  >
                    <Image src={src} alt={`${artist.name} Live Performance Gallery ${index + 1}`} fill className="object-cover object-top group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors pointer-events-none" />
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sticky Sidebar (Pricing & Specs) */}
          <aside className="w-full lg:w-96 flex-shrink-0">
            <div className="sticky top-32 space-y-8">
            
            {/* Pricing Card */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-center text-gray-400 text-sm">Packages &amp; Pricing</h2>
              
              <div className="space-y-4 mb-8">
                {artist.pricing.map(pkg => (
                  <div key={pkg.type} className="flex flex-col p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-[#FF2E2E]/30 transition-colors group">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-bold text-gray-200 group-hover:text-white transition-colors">{pkg.type}</span>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">MRP</span>
                          <span className="text-sm font-medium text-gray-500 line-through decoration-[#FF2E2E]/40">₹{(pkg.price + 5000).toLocaleString("en-IN")}</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[9px] text-[#FF2E2E] font-bold uppercase tracking-widest mb-0.5 whitespace-nowrap">Deal Price</span>
                          <span className="font-black text-white text-xl tracking-tight">₹{pkg.price.toLocaleString("en-IN")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/5">
                      <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Advance Payment</span>
                      <div className="flex items-center gap-1.5">
                        <strong className="text-white font-bold">₹{(pkg.price * 0.3).toLocaleString("en-IN")}</strong>
                        <span className="text-[9px] text-gray-600 font-medium">(30%)</span>
                      </div>
                    </div>
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
            
            </div>
          </aside>

        </div>
      </section>

      {/* Embedded Sections — override light backgrounds for dark page */}
      <ArtistWhyChooseUs />
      <div className="[&_section]:!bg-[#0F0F0F] [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-gray-400 [&_.text-gray-900]:!text-white [&_.text-gray-600]:!text-gray-400 [&_.text-gray-500]:!text-gray-400 [&_.bg-white]:!bg-white/5 [&_.bg-gray-50]:!bg-[#0F0F0F] [&_.border-gray-100]:!border-white/10 [&_.shadow-card]:!shadow-none [&_.text-gray-800]:!text-gray-300">
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </div>

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
              <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between bg-white/5 shrink-0">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Book {artist.name}</h3>
                  <p className="text-sm text-gray-400">Fill details to check availability and get custom quotes.</p>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  {dynamicPrice > 0 && (
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0.5">Est. Price</p>
                      <p className="text-xl font-black text-[#FF2E2E]">₹{dynamicPrice.toLocaleString("en-IN")}</p>
                    </div>
                  )}
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
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-6 border-b border-white/10">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Full Name *</label>
                    <input 
                      type="text" 
                      placeholder="Your Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2 text-[#FF2E2E]">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      placeholder="+91"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full bg-white/5 border border-[#FF2E2E]/30 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors"
                    />
                  </div>
                </div>

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
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Venue Area</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Indiranagar, Bangalore"
                      value={eventLocation} 
                      onChange={(e) => {
                        setEventLocation(e.target.value);
                        setShowLocationSuggestions(true);
                      }}
                      onFocus={() => setShowLocationSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors placeholder:text-gray-600"
                    />

                    {/* Autocomplete Dropdown */}
                    {showLocationSuggestions && (
                      <div className="absolute top-[80px] left-0 right-0 bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden z-[60] shadow-2xl max-h-60 overflow-y-auto">
                        {LOCATION_OPTIONS.filter(loc => loc.toLowerCase().includes(eventLocation.toLowerCase())).length > 0 ? (
                          LOCATION_OPTIONS.filter(loc => loc.toLowerCase().includes(eventLocation.toLowerCase())).map((loc) => (
                            <div
                              key={loc}
                              className="px-4 py-3 hover:bg-[#FF2E2E]/20 hover:text-white text-gray-300 font-medium cursor-pointer transition-colors text-sm flex items-center gap-2"
                              onClick={() => {
                                setEventLocation(loc);
                                setShowLocationSuggestions(false);
                              }}
                            >
                              <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/></svg>
                              {loc}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-500">No locations found</div>
                        )}
                      </div>
                    )}
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

                  {/* Venue Type */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Venue Setting</label>
                    <select 
                      value={indoorOutdoor} 
                      onChange={(e) => setIndoorOutdoor(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors"
                    >
                      <option value="" disabled className="bg-gray-900">Indoor or Outdoor?</option>
                      <option value="Indoor" className="bg-gray-900">Indoor</option>
                      <option value="Outdoor" className="bg-gray-900">Outdoor</option>
                    </select>
                  </div>

                  {/* Sound Setup */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Sound & Equipment</label>
                    <select 
                      value={soundRequirement} 
                      onChange={(e) => setSoundRequirement(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-4 py-3 outline-none focus:border-[#FF2E2E] transition-colors"
                    >
                      <option value="" disabled className="bg-gray-900">Select Requirement</option>
                      <option value="Available at Venue" className="bg-gray-900">Available at Venue</option>
                      <option value="Need Urban Raaga to arrange" className="bg-gray-900">Need Urban Raaga to arrange</option>
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
              <div className="px-8 py-6 border-t border-white/10 bg-black/20 flex items-center justify-between shrink-0">
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
                      if (!fullName || !phoneNumber) {
                        alert("Please provide your Full Name and WhatsApp Number so we can reach you!");
                        return;
                      }
                      const message = `Hi Urban Raaga! I want to book ${artist.name}.\n\n*Name:* ${fullName}\n*Phone:* ${phoneNumber}\n*Event Type:* ${eventType || 'Not specified'}\n*Date:* ${date || 'Not specified'}\n*Location:* ${eventLocation || 'Not specified'}\n*Guests:* ${guests || 'Not specified'}\n*Venue:* ${indoorOutdoor || 'Not specified'}\n*Sound:* ${soundRequirement || 'Not specified'}\n*Requirements:* ${requirements || 'None'}`;
                      window.open(`https://wa.me/919424700519?text=${encodeURIComponent(message)}`, '_blank');
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

    {/* =======================
        LIGHTBOX MODAL 
       ======================= */}
    <AnimatePresence>
      {lightboxMedia && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            onClick={() => setLightboxMedia(null)}
          />
          
          <button 
            onClick={() => setLightboxMedia(null)}
            className="absolute top-6 right-6 z-[130] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative z-[125] w-full max-w-5xl max-h-[90vh] flex items-center justify-center pointer-events-none"
          >
            {lightboxMedia?.type === 'image' && (
              <img 
                src={lightboxMedia.url} 
                alt="Gallery Fullscreen" 
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl pointer-events-auto"
              />
            )}
            {lightboxMedia?.type === 'video' && (
              <video 
                src={lightboxMedia.url} 
                controls 
                autoPlay 
                className="w-full max-h-[90vh] rounded-lg shadow-2xl outline-none pointer-events-auto bg-black"
              />
            )}
            {lightboxMedia?.type === 'youtube' && (
              <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl pointer-events-auto">
                <iframe 
                  src={`${lightboxMedia.url}?autoplay=1`} 
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen" 
                  allowFullScreen
                />
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  </>);
}
