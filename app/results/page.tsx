"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ArtistWhyChooseUs from "@/components/ArtistWhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { useRouter } from "next/navigation";

const LOCATION_OPTIONS = [
  "Bangalore", "Indiranagar", "Koramangala", "Whitefield",
  "HSR Layout", "JP Nagar", "Jayanagar", "Hebbal", "Marathahalli"
];

const SETUP_OPTIONS = ["Solo", "Duo", "Trio Ensemble", "Full Band"];
const GUEST_OPTIONS = ["Up to 20", "21 to 50", "51 to 100", "101 to 200", "More than 200"];
const BUDGET_OPTIONS = ["Under ₹15,000", "₹15,000 – ₹30,000", "₹30,000 – ₹60,000", "₹60,000+"];
const VENUE_OPTIONS = ["Indoor", "Outdoor", "Banquet Hall", "Open Air", "Living Room"];
const GENRE_OPTIONS = ["Bollywood", "Sufi", "Retro Classics", "Indie", "English", "Kannada", "Tamil", "Classical", "Pop", "Rock", "Folk"];

function RadioGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border-b border-white/10 pb-5">
      <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
        {label}
      </label>
      <div className="space-y-2.5">
        {options.map((opt) => (
          <label
            key={opt}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onChange(value === opt ? "" : opt)}
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                value === opt
                  ? "border-[#FF2E2E] bg-[#FF2E2E]"
                  : "border-gray-600 group-hover:border-gray-400"
              }`}
            >
              {value === opt && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            <span
              className={`text-sm transition-colors ${
                value === opt ? "text-white font-semibold" : "text-gray-400 group-hover:text-gray-200"
              }`}
            >
              {opt}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function ResultsPage() {
  const router = useRouter();

  // Fetch artists from API (approved only)
  const [allArtists, setAllArtists] = useState<any[]>([]);
  const [loadingArtists, setLoadingArtists] = useState(true);

  useEffect(() => {
    fetch("/api/artists?status=approved")
      .then((r) => r.json())
      .then((d) => { setAllArtists(d.artists || []); setLoadingArtists(false); })
      .catch(() => setLoadingArtists(false));
  }, []);

  // Filter states
  const [location, setLocation] = useState("Bangalore");
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false);
  const [date, setDate] = useState("");
  const [setupType, setSetupType] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [venueType, setVenueType] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("Recommended");
  const [budget, setBudget] = useState("");

  const getBadgeStyle = (badge: string) => {
    switch (badge.toLowerCase()) {
      case "top performer":
        return "bg-amber-500/20 text-amber-400 border border-amber-500/30";
      case "premium performer":
        return "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30";
      case "soulful":
        return "bg-orange-500/20 text-orange-400 border border-orange-500/30";
      case "established artist":
      case "seasoned artist":
        return "bg-blue-500/20 text-blue-300 border border-blue-500/30";
      case "urban raaga's choice":
      case "emerging artist":
        return "bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-purple-300 border border-purple-500/30";
      case "23+ years experience":
        return "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30";
      case "budget friendly":
        return "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
      case "multi-language performer":
      case "multi lang":
      case "multilingual":
      case "multi-language live band":
        return "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30";
      default:
        return "bg-[#FF2E2E]/20 text-[#FF2E2E] border border-[#FF2E2E]/30";
    }
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const resetFilters = () => {
    setSetupType("");
    setGuestCount("");
    setBudget("");
    setVenueType("");
    setSelectedGenres([]);
    setDate("");
  };

  const hasActiveFilters = setupType || guestCount || budget || venueType || selectedGenres.length > 0;

  const filteredArtists = useMemo(() => {
    let list = [...allArtists];

    // Genre filter
    if (selectedGenres.length > 0) {
      list = list.filter((a) =>
        selectedGenres.some((g) => (a.genres || []).map((x: string) => x.toLowerCase()).includes(g.toLowerCase()))
      );
    }

    // Setup type filter
    if (setupType) {
      list = list.filter((a) =>
        (a.pricing || []).some((p: any) => p.type?.toLowerCase().includes(setupType.toLowerCase().split(" ")[0]))
      );
    }

    // Budget filter
    if (budget) {
      list = list.filter((a) => {
        const minPrice = Math.min(...((a.pricing || []).map((p: any) => p.price) || [0]));
        if (budget === "Under ₹15,000") return minPrice < 15000;
        if (budget === "₹15,000 – ₹30,000") return minPrice >= 15000 && minPrice <= 30000;
        if (budget === "₹30,000 – ₹60,000") return minPrice > 30000 && minPrice <= 60000;
        if (budget === "₹60,000+") return minPrice > 60000;
        return true;
      });
    }

    // Sort
    if (sortBy === "Highest Rated") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "Price: Low to High") {
      list.sort((a, b) => {
        const pA = Math.min(...((a.pricing || []).map((p: any) => p.price) || [0]));
        const pB = Math.min(...((b.pricing || []).map((p: any) => p.price) || [0]));
        return pA - pB;
      });
    } else if (sortBy === "Price: High to Low") {
      list.sort((a, b) => {
        const pA = Math.min(...((a.pricing || []).map((p: any) => p.price) || [0]));
        const pB = Math.min(...((b.pricing || []).map((p: any) => p.price) || [0]));
        return pB - pA;
      });
    }

    return list;
  }, [allArtists, selectedGenres, setupType, budget, sortBy]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white selection:bg-[#FF2E2E] selection:text-white pb-0">
      <Navbar />

      <div className="pt-28 pb-16 relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF2E2E]/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row gap-8">

          {/* ======================= SIDEBAR ======================= */}
          <aside className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sticky top-28 shadow-xl max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filter Results
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="text-xs text-[#FF2E2E] font-semibold hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="space-y-5">

                {/* Location */}
                <div className="relative border-b border-white/10 pb-5">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Location</label>
                  <div className="bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => { setLocation(e.target.value); setShowLocationSuggestions(true); }}
                      onFocus={() => setShowLocationSuggestions(true)}
                      onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                      className="bg-transparent text-sm text-white outline-none w-full"
                      placeholder="Enter city or area"
                    />
                  </div>
                  {showLocationSuggestions && (
                    <div className="absolute left-0 right-0 bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden z-[60] shadow-2xl mt-1 max-h-48 overflow-y-auto">
                      {LOCATION_OPTIONS.filter((l) => l.toLowerCase().includes(location.toLowerCase())).map((loc) => (
                        <div
                          key={loc}
                          className="px-3 py-2.5 hover:bg-[#FF2E2E]/20 text-gray-300 hover:text-white font-medium cursor-pointer text-xs flex items-center gap-2"
                          onClick={() => { setLocation(loc); setShowLocationSuggestions(false); }}
                        >
                          <svg className="w-3 h-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Event Date */}
                <div className="border-b border-white/10 pb-5">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Event Date</label>
                  <div className="bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input
                      type={date ? "date" : "text"}
                      placeholder="dd/mm/yyyy"
                      onFocus={(e) => { e.target.type = "date"; e.target.showPicker && e.target.showPicker(); }}
                      onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      min={new Date().toLocaleDateString("en-CA")}
                      className={`bg-transparent text-sm outline-none w-full cursor-pointer ${!date ? "text-gray-500" : "text-white"}`}
                    />
                  </div>
                </div>

                {/* Band Setup Type */}
                <RadioGroup
                  label="Band Setup Type"
                  options={SETUP_OPTIONS}
                  value={setupType}
                  onChange={setSetupType}
                />

                {/* Number of Guests */}
                <RadioGroup
                  label="Number of Guests"
                  options={GUEST_OPTIONS}
                  value={guestCount}
                  onChange={setGuestCount}
                />

                {/* Budget */}
                <RadioGroup
                  label="Budget"
                  options={BUDGET_OPTIONS}
                  value={budget}
                  onChange={setBudget}
                />

                {/* Venue Type */}
                <RadioGroup
                  label="Venue Type"
                  options={VENUE_OPTIONS}
                  value={venueType}
                  onChange={setVenueType}
                />

                {/* Genres */}
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Genres</label>
                  <div className="flex flex-wrap gap-2">
                    {GENRE_OPTIONS.map((genre) => (
                      <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedGenres.includes(genre)
                            ? "bg-[#FF2E2E]/20 border-[#FF2E2E]/50 text-[#FF2E2E]"
                            : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/30"
                        }`}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* ======================= RESULTS GRID ======================= */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                  Top Singers in <span className="text-[#FF2E2E]">{location || "Bangalore"}</span>
                </h1>
                <p className="text-gray-400 mt-2 font-medium">
                  {filteredArtists.length} {filteredArtists.length === 1 ? "result" : "results"} found
                  {hasActiveFilters && <span className="ml-1 text-[#FF2E2E]">· Filters applied</span>}
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-2 flex-shrink-0">
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

            {/* Active filter chips */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-6">
                {setupType && (
                  <span className="px-3 py-1 bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 text-[#FF2E2E] text-xs font-semibold rounded-full flex items-center gap-1.5">
                    {setupType}
                    <button onClick={() => setSetupType("")} className="hover:text-white">✕</button>
                  </span>
                )}
                {guestCount && (
                  <span className="px-3 py-1 bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 text-[#FF2E2E] text-xs font-semibold rounded-full flex items-center gap-1.5">
                    {guestCount}
                    <button onClick={() => setGuestCount("")} className="hover:text-white">✕</button>
                  </span>
                )}
                {budget && (
                  <span className="px-3 py-1 bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 text-[#FF2E2E] text-xs font-semibold rounded-full flex items-center gap-1.5">
                    {budget}
                    <button onClick={() => setBudget("")} className="hover:text-white">✕</button>
                  </span>
                )}
                {venueType && (
                  <span className="px-3 py-1 bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 text-[#FF2E2E] text-xs font-semibold rounded-full flex items-center gap-1.5">
                    {venueType}
                    <button onClick={() => setVenueType("")} className="hover:text-white">✕</button>
                  </span>
                )}
                {selectedGenres.map((g) => (
                  <span key={g} className="px-3 py-1 bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 text-[#FF2E2E] text-xs font-semibold rounded-full flex items-center gap-1.5">
                    {g}
                    <button onClick={() => toggleGenre(g)} className="hover:text-white">✕</button>
                  </span>
                ))}
              </div>
            )}

            {/* Cards List */}
            <div className="space-y-6">
              {filteredArtists.length === 0 ? (
                <div className="text-center py-20 text-gray-500">
                  <svg className="w-16 h-16 mx-auto mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-lg font-semibold">No artists match your filters</p>
                  <button onClick={resetFilters} className="mt-4 text-[#FF2E2E] text-sm font-semibold hover:underline">Clear filters</button>
                </div>
              ) : (
                filteredArtists.map((artist, idx) => (
                  <motion.div
                    key={artist.id}
                    onClick={() => router.push(`/artist/${artist.slug}`)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-4 sm:p-6 hover:border-[#FF2E2E]/30 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,46,46,0.1)] flex flex-col sm:flex-row gap-6 lg:gap-8 items-start cursor-pointer"
                  >
                    {/* Card Image */}
                    <div className="w-full sm:w-56 aspect-square sm:h-56 rounded-2xl overflow-hidden relative flex-shrink-0 bg-gray-900">
                      <Image
                        src={(artist.images?.[0] || artist.coverImage) || "/placeholder.jpg"}
                        alt={artist.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                    </div>

                    {/* Card Details */}
                    <div className="flex-1 py-1 flex flex-col h-full w-full">
                      <div className="mb-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF2E2E] transition-colors leading-tight">
                          {artist.name}
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">{artist.title}</p>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {(artist.badges || []).map((badge: string) => (
                          <span key={badge} className={`px-2 py-0.5 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1 ${getBadgeStyle(badge)}`}>
                            <span className="text-current opacity-70">★</span> {badge}
                          </span>
                        ))}
                        <span className="px-2 py-0.5 bg-white/5 text-gray-200 border border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full flex items-center gap-1">
                          <span className="text-yellow-500">★</span> {artist.rating} Rating
                        </span>
                      </div>

                      {/* Genres */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {(artist.genres || []).slice(0, 5).map((genre: string) => (
                          <span key={genre} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium text-gray-300">
                            {genre}
                          </span>
                        ))}
                      </div>

                      {/* Location & Stats */}
                      <div className="flex flex-col gap-1.5 mb-4 mt-auto">
                        <p className="text-gray-300 font-medium text-sm flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          From {artist.location}
                        </p>
                        <div className="flex items-center gap-3 text-gray-300 font-medium text-sm">
                          <span className="flex items-center gap-1.5">
                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {artist.totalBookings} Bookings
                          </span>
                          <span className="text-gray-600">|</span>
                          <span className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            {artist.rating} Rating
                          </span>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
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
                          onClick={(e) => e.stopPropagation()}
                          className="w-full sm:w-auto text-center px-8 py-3 bg-white/10 hover:bg-[#FF2E2E] border border-white/10 hover:border-[#FF2E2E] text-white font-bold rounded-full transition-all duration-300 text-sm"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Trust Sections */}
      <ArtistWhyChooseUs />
      <div className="[&_section]:!bg-[#0F0F0F] [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-gray-400 [&_.text-gray-900]:!text-white [&_.text-gray-600]:!text-gray-400 [&_.text-gray-500]:!text-gray-400 [&_.bg-white]:!bg-white/5 [&_.bg-gray-50]:!bg-[#0F0F0F] [&_.border-gray-100]:!border-white/10 [&_.shadow-card]:!shadow-none [&_.text-gray-800]:!text-gray-300">
        <HowItWorks />
        <Testimonials />
        <FAQ />
      </div>

      <Footer />
    </main>
  );
}
