"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { artists } from "@/lib/artists";
import { useRouter } from "next/navigation";

const LOCATION_OPTIONS = [
  "Bangalore",
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "HSR Layout",
  "JP Nagar",
  "Delhi-NCR",
  "Mumbai",
  "Hyderabad",
  "Goa"
];

export default function ResultsPage() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("Bangalore");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState("Recommended");

  const getBadgeStyle = (badge: string) => {
    switch(badge.toLowerCase()) {
      case "top performer":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      case "established artist":
      case "seasoned artist":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
      case "urban raaga's choice":
      case "emerging artist":
        return "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300 border border-purple-500/30";
      case "budget friendly":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "multi-language performer":
      case "multi lang":
      case "multi-language live band":
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";
      default:
        return "bg-[#FF2E2E]/20 text-[#FF2E2E] border border-[#FF2E2E]/30";
    }
  };

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white selection:bg-[#FF2E2E] selection:text-white pb-0">
      <Navbar />

      <div className="pt-28 pb-16 relative">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF2E2E]/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-8">
          
          {/* =======================
              FULL LEFT SIDEBAR
             ======================= */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 sticky top-28 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                Filter Results
              </h2>

              <div className="space-y-6">
                
                {/* Location */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <input 
                      type="text" 
                      value={location} 
                      onChange={(e) => {
                        setLocation(e.target.value);
                        setShowLocationSuggestions(true);
                      }}
                      onFocus={() => setShowLocationSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                      className="bg-transparent text-sm text-white outline-none w-full"
                      placeholder="Enter city or area"
                    />
                  </div>

                  {/* Autocomplete Dropdown */}
                  {showLocationSuggestions && (
                    <div className="absolute top-[80px] left-0 right-0 bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden z-[60] shadow-2xl max-h-60 overflow-y-auto">
                      {LOCATION_OPTIONS.filter(loc => loc.toLowerCase().includes(location.toLowerCase())).length > 0 ? (
                        LOCATION_OPTIONS.filter(loc => loc.toLowerCase().includes(location.toLowerCase())).map((loc) => (
                          <div
                            key={loc}
                            className="px-4 py-3 hover:bg-[#FF2E2E]/20 hover:text-white text-gray-300 font-medium cursor-pointer transition-colors text-sm flex items-center gap-2"
                            onClick={() => {
                              setLocation(loc);
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

                {/* Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">Event Date</label>
                  <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                    <input 
                      type={date ? "date" : "text"}
                      placeholder="dd/mm/yyyy"
                      onFocus={(e) => { e.target.type = "date"; e.target.showPicker && e.target.showPicker(); }}
                      onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                      value={date} 
                      onChange={(e) => setDate(e.target.value)} 
                      min={new Date().toLocaleDateString('en-CA')}
                      className={`bg-transparent text-sm outline-none w-full cursor-pointer ${!date ? 'text-gray-500' : 'text-white'}`} 
                    />
                  </div>
                </div>

                {/* Performance Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Setup Type</label>
                  <div className="space-y-2">
                    {["Solo", "Duo", "Trio / Full Band"].map((type) => (
                      <label key={type} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-600 bg-gray-800 text-[#FF2E2E] focus:ring-[#FF2E2E] focus:ring-offset-gray-900" />
                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Genres */}
                <div>
                  <label className="block text-sm font-semibold text-gray-400 uppercase tracking-widest mb-3">Genres</label>
                  <div className="flex flex-wrap gap-2">
                    {["Bollywood", "Sufi", "Retro", "Indie", "English", "Classical"].map((genre) => (
                      <span key={genre} className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:border-white/30 cursor-pointer transition-colors">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* =======================
              RIGHT RESULTS GRID
             ======================= */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Top Singers in <span className="text-[#FF2E2E]">{location || "Bangalore"}</span>
                </h1>
                <p className="text-gray-400 mt-2 font-medium">Showing highly rated professionals available for your event.</p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2">
                <span className="text-sm text-gray-400">Sort by:</span>
                <select 
                  className="bg-transparent text-sm text-white outline-none cursor-pointer"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="Recommended" className="bg-gray-900">Recommended</option>
                  <option value="Highest Rated" className="bg-gray-900">Highest Rated</option>
                  <option value="Price: Low to High" className="bg-gray-900">Price: Low to High</option>
                  <option value="Price: High to Low" className="bg-gray-900">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Cards List */}
            <div className="space-y-6">
              {[...artists].sort((a, b) => {
                if (sortBy === "Highest Rated") {
                  return b.rating - a.rating;
                } else if (sortBy === "Price: Low to High") {
                  const pA = Math.min(...(a.pricing?.map(p => p.price) || [0]));
                  const pB = Math.min(...(b.pricing?.map(p => p.price) || [0]));
                  return pA - pB;
                } else if (sortBy === "Price: High to Low") {
                  const pA = Math.min(...(a.pricing?.map(p => p.price) || [0]));
                  const pB = Math.min(...(b.pricing?.map(p => p.price) || [0]));
                  return pB - pA;
                }
                return 0;
              }).map((artist, idx) => (
                <motion.div 
                  key={artist.id}
                  onClick={() => router.push(`/artist/${artist.slug}`)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 sm:p-6 hover:border-[#FF2E2E]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,46,46,0.1)] flex flex-col sm:flex-row gap-6 lg:gap-8 items-start cursor-pointer"
                >
                  {/* Card Image */}
                  <div className="w-full sm:w-64 h-64 sm:h-full min-h-[300px] rounded-2xl overflow-hidden relative flex-shrink-0 bg-gray-900">
                    <Image 
                      src={artist.images[0]} 
                      alt={artist.name} 
                      fill 
                      className="object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  </div>

                  {/* Card Details */}
                  <div className="flex-1 py-1 flex flex-col h-full w-full">
                    
                    {/* Name */}
                    <div className="mb-3">
                      <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF2E2E] transition-colors leading-tight">
                        {artist.name}
                      </h3>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {artist.badges.map(badge => (
                        <span key={badge} className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full backdrop-blur-md flex items-center gap-1 ${getBadgeStyle(badge)}`}>
                          <span className="text-current opacity-70">★</span> {badge}
                        </span>
                      ))}
                      <span className="px-2 py-0.5 bg-white/5 backdrop-blur-md text-gray-200 border border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                         <span className="text-yellow-500">★</span> {artist.rating} Rating
                      </span>
                    </div>

                    {/* Genres */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {artist.genres.map(genre => (
                        <span key={genre} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300 whitespace-nowrap">
                          {genre}
                        </span>
                      ))}
                    </div>

                    {/* Location & Stats */}
                    <div className="flex flex-col gap-2 mb-4 mt-auto">
                      <p className="text-gray-300 font-medium text-sm flex items-center gap-1.5">
                        <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                        From {artist.location}
                      </p>
                      
                      <div className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                          {artist.totalBookings} Bookings
                        </span>
                        <span className="text-gray-600">|</span>
                        <span className="flex items-center gap-1.5">
                          <span className="text-yellow-500">★</span>
                          {artist.rating} Rating
                        </span>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
                      <div>
                        <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-1">Starting from</p>
                        <div className="flex items-center gap-2">
                           {artist.originalPriceIndicator && (
                             <p className="text-sm font-medium text-gray-500 line-through">{artist.originalPriceIndicator}</p>
                           )}
                           <p className="text-xl font-bold text-white">{artist.priceIndicator}</p>
                        </div>
                        {artist.bookingAmount && (
                          <p className="text-xs text-[#FF2E2E] mt-1 font-semibold">Booking Amount: {artist.bookingAmount}</p>
                        )}
                      </div>
                      
                      <Link 
                        href={`/artist/${artist.slug}`}
                        className="w-full sm:w-auto text-center px-8 py-3 bg-white/10 hover:bg-[#FF2E2E] border border-white/10 hover:border-[#FF2E2E] text-white font-bold rounded-full transition-all duration-300 text-sm"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination / Load More */}
            <div className="mt-12 text-center">
              <button className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-full transition-all text-sm">
                Load More Results
              </button>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
