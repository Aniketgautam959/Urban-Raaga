"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const BANGALORE_LOCALITIES = [
  "Indiranagar, Bangalore",
  "Whitefield, Bangalore",
  "Koramangala, Bangalore",
  "HSR Layout, Bangalore",
  "Electronic City, Bangalore",
  "Jayanagar, Bangalore",
  "JP Nagar, Bangalore",
  "BTM Layout, Bangalore",
  "Marathahalli, Bangalore",
  "Bellandur, Bangalore",
  "Malleshwaram, Bangalore",
  "Rajajinagar, Bangalore",
  "Yelahanka, Bangalore",
  "Hebbal, Bangalore",
  "Banashankari, Bangalore",
];

const EVENT_TYPES = [
  "Wedding / Sangeet",
  "Corporate Event",
  "Private / House Party",
  "Birthday Celebration",
  "Anniversary",
  "Reception",
  "College Fest",
  "Other"
];

const BUDGET_OPTIONS = [
  "Under ₹20,000",
  "₹20,000 - ₹50,000",
  "₹50,000 - ₹1,00,000",
  "Above ₹1,00,000"
];

export default function ServicesPage() {
  const [location, setLocation] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState("");
  const [showEventSuggestions, setShowEventSuggestions] = useState(false);
  const [budget, setBudget] = useState("");
  const [showBudgetSuggestions, setShowBudgetSuggestions] = useState(false);

  const filteredLocalities = BANGALORE_LOCALITIES.filter((loc) =>
    loc.toLowerCase().includes(location.toLowerCase())
  );

  const filteredEventTypes = EVENT_TYPES.filter((type) => 
    type.toLowerCase().includes(eventType.toLowerCase())
  );

  const filteredBudgets = BUDGET_OPTIONS.filter((b) => 
    b.toLowerCase().includes(budget.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white selection:bg-[#FF2E2E] selection:text-white">
      <Navbar />

      {/* 🎯 HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <motion.div
           initial={{ scale: 1.0 }}
           animate={{ scale: 1.08 }}
           transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
           className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/slider-1.jpg"
            alt="Live music concert"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/80 via-[#0F0F0F]/60 to-[#0F0F0F] pointer-events-none" />

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#FF2E2E] rounded-full opacity-60 animate-pulse"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-6 tracking-tight text-balance uppercase">
            Live Singers in Bangalore for <span className="text-[#FF2E2E]">Weddings, Parties &amp; Corporate Events</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-12 font-medium leading-relaxed text-balance">
            Hire verified live singers, Bollywood artists, Kannada performers, English singers, and live bands in Bangalore for weddings, corporate events, and private parties.
          </p>

          {/* 🔍 SEARCH / FILTER BAR */}
          <div className="relative z-50 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-3 sm:p-4 max-w-5xl mx-auto mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Location */}
              <div className="relative flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10 focus-within:border-[#FF2E2E] transition-colors z-[60]">
                <svg className="w-5 h-5 text-[#FF2E2E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-400 outline-none font-semibold"
                />

                <AnimatePresence>
                  {showSuggestions && location && filteredLocalities.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] max-h-60 overflow-y-auto"
                    >
                      {filteredLocalities.map((loc) => (
                        <button
                          key={loc}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setLocation(loc);
                            setShowSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50 last:border-none transition-colors"
                        >
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                          <span className="truncate">{loc}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Date */}
              <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10 focus-within:border-[#FF2E2E] transition-colors relative z-40">
                <svg className="w-5 h-5 text-[#FF2E2E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <input
                  type={date ? "date" : "text"}
                  placeholder="dd/mm/yyyy"
                  onFocus={(e) => {
                    e.target.type = "date";
                    e.target.showPicker && e.target.showPicker();
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) e.target.type = "text";
                  }}
                  value={date}
                  min={new Date().toLocaleDateString('en-CA')}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full bg-transparent text-sm outline-none font-medium cursor-pointer ${!date ? 'text-gray-400' : 'text-gray-300'}`}
                />
              </div>

              {/* Event Type */}
              <div className="relative flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10 focus-within:border-[#FF2E2E] transition-colors z-[50]">
                <svg className="w-5 h-5 text-[#FF2E2E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <input
                  type="text"
                  placeholder="Event Type"
                  value={eventType}
                  onChange={(e) => {
                    setEventType(e.target.value);
                    setShowEventSuggestions(true);
                  }}
                  onFocus={() => setShowEventSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowEventSuggestions(false), 200)}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-400 outline-none font-medium"
                />

                <AnimatePresence>
                  {showEventSuggestions && filteredEventTypes.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] max-h-60 overflow-y-auto"
                    >
                      {filteredEventTypes.map((type) => (
                        <button
                          key={type}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setEventType(type);
                            setShowEventSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50 last:border-none transition-colors"
                        >
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                          <span className="truncate">{type}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Budget */}
              <div className="relative flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10 focus-within:border-[#FF2E2E] transition-colors z-[40]">
                <svg className="w-5 h-5 text-[#FF2E2E] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Budget"
                  value={budget}
                  onChange={(e) => {
                    setBudget(e.target.value);
                    setShowBudgetSuggestions(true);
                  }}
                  onFocus={() => setShowBudgetSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowBudgetSuggestions(false), 200)}
                  className="w-full bg-transparent text-sm text-white placeholder-gray-400 outline-none font-medium"
                />

                <AnimatePresence>
                  {showBudgetSuggestions && filteredBudgets.length > 0 && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-[calc(100%+8px)] left-0 right-0 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-[100] max-h-60 overflow-y-auto"
                    >
                      {filteredBudgets.map((bInfo) => (
                        <button
                          key={bInfo}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setBudget(bInfo);
                            setShowBudgetSuggestions(false);
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 border-b border-gray-50 last:border-none transition-colors"
                        >
                          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="truncate">{bInfo}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Button */}
              <Link 
                href="/results"
                className="bg-[#FF2E2E] hover:bg-red-700 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all duration-200 shadow-[0_0_15px_rgba(255,46,46,0.4)] active:scale-95 flex-shrink-0 w-full lg:w-auto flex items-center justify-center whitespace-nowrap"
              >
                Search
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#book"
              className="group flex items-center gap-2 bg-[#FF2E2E] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-full text-sm shadow-[0_0_15px_rgba(255,46,46,0.4)] transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Book Now
            </Link>

          </div>
        </motion.div>
      </section>

      {/* 🎶 INTRO SECTION */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-lg sm:text-2xl text-gray-300 font-medium leading-relaxed"
        >
          Urban Raaga offers professional live singers in Bangalore, including experienced Kannada singers, talented English singers, popular Hindi &amp; Bollywood singers, and high-energy live bands for weddings, corporate events, and private parties.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-base sm:text-lg text-gray-400 mt-6"
        >
          If you&apos;re looking to hire a singer in Bangalore, we provide verified artists who deliver unforgettable live music experiences.
        </motion.p>
      </section>

      {/* 🔥 MAIN SERVICES CARDS (Grid styling similar to WhyChooseUs) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-[#FF2E2E] text-sm font-bold uppercase tracking-widest mb-3">
              Main Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Events We Specialize In
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Corporate Events",
                desc: "Looking for professional live singers for corporate events in Bangalore? We provide premium performers for corporate parties, annual functions, product launches, and networking events.",
                icon: <svg className="w-8 h-8 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              },
              {
                title: "Weddings",
                desc: "Make your big day unforgettable with the best wedding singers in Bangalore. Perfect for sangeet, mehendi, wedding ceremonies, and reception events.",
                icon: <svg className="w-8 h-8 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
              },
              {
                title: "House Parties",
                desc: "Hire live singers for house parties in Bangalore for private celebrations, weekend parties, and small gatherings. Experience great music intimately.",
                icon: <svg className="w-8 h-8 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              },
              {
                title: "Birthdays",
                desc: "Celebrate your birthday with live singers performing nostalgic songs and trending hits. Create the best musical memories with your friends and family.",
                icon: <svg className="w-8 h-8 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" /></svg>
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7 shadow-2xl hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF2E2E]/20 rounded-full -translate-y-8 translate-x-8 group-hover:scale-110 transition-transform duration-500 blur-xl" />

                <div className="relative w-14 h-14 bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:bg-[#FF2E2E]/20 transition-colors duration-300">
                  <span className="relative z-10">{item.icon}</span>
                </div>

                <h3 className="font-bold text-white text-xl mb-3">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#FF2E2E] to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-300 text-lg">We also provide singers and bands for anniversary celebrations, college fests, cultural events, and private gatherings.</p>
          </div>
        </div>
      </section>

      {/* 🎤 SERVICES WE OFFER (TEXT SECTIONS) */}
      <section id="services-list" className="py-20 relative border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Services We Offer
            </h2>
            <div className="w-24 h-1 bg-[#FF2E2E] mx-auto rounded-full" />
          </motion.div>

          <div className="space-y-10 text-gray-300 text-base sm:text-lg">
            <motion.div id="wedding-singers" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF2E2E] rounded-full" /> Wedding Singers in Bangalore
              </h3>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                <li>Sangeet &amp; Mehendi</li>
                <li>Wedding ceremonies</li>
                <li>Reception events</li>
              </ul>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF2E2E] rounded-full" /> Hindi &amp; Bollywood Singers in Bangalore
              </h3>
              <p className="ml-4 text-gray-400">
                Hire professional Bollywood singers for sangeet nights, weddings, house parties, and corporate events. From romantic classics to trending hits, our singers keep your guests entertained.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF2E2E] rounded-full" /> Kannada Singers in Bangalore
              </h3>
              <p className="ml-4 text-gray-400">
                Book Kannada singers for traditional weddings, cultural events, and family celebrations.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF2E2E] rounded-full" /> English Singers in Bangalore
              </h3>
              <p className="ml-4 text-gray-400">
                Perfect for corporate events, cocktail parties, and luxury weddings. Genres include pop, rock, jazz, and acoustic.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-[#FF2E2E] rounded-full" /> Live Bands in Bangalore
              </h3>
              <ul className="list-disc list-inside ml-4 space-y-1 text-gray-400">
                <li>Acoustic bands</li>
                <li>Bollywood bands</li>
                <li>Fusion bands</li>
              </ul>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6">
               <motion.div id="corporate-events" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                 <h4 className="text-xl font-bold text-white mb-2">Corporate Event Singers</h4>
                 <p className="text-gray-400 text-sm">Professional performers for office parties, annual events, and product launches in Bangalore.</p>
               </motion.div>
               <motion.div id="house-party" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white/5 p-6 rounded-2xl border border-white/10">
                 <h4 className="text-xl font-bold text-white mb-2">Party Singers</h4>
                 <p className="text-gray-400 text-sm">Perfect performers for house parties, birthdays, and anniversaries in Bangalore.</p>
               </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ⭐ WHY CHOOSE URBAN RAAGA */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="inline-block text-[#FF2E2E] text-sm font-bold uppercase tracking-widest mb-3">
              Why Choose Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              The Urban Raaga Advantage
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { title: "Verified Artists", desc: "Verified singers and live bands", icon: <svg className="w-6 h-6 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { title: "Multi-Language", desc: "Performers in Hindi, Kannada, English", icon: <svg className="w-6 h-6 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
              { title: "Easy Booking", desc: "Seamless and fast booking process", icon: <svg className="w-6 h-6 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
              { title: "Transparent Pricing", desc: "No hidden costs or surprise charges", icon: <svg className="w-6 h-6 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
              { title: "Strong Network", desc: "Vast Bangalore artist network", icon: <svg className="w-6 h-6 text-[#FF2E2E]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:border-[#FF2E2E]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#FF2E2E]/20 text-[#FF2E2E] rounded-full flex items-center justify-center text-xl mx-auto mb-4 border border-[#FF2E2E]/30">
                  {item.icon}
                </div>
                <h3 className="font-bold text-white text-lg mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📍 SERVICE AREAS */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl font-black text-white mb-4">
              Service Areas Across Bangalore
            </h2>
            <div className="w-24 h-1 bg-[#FF2E2E] mx-auto rounded-full mb-8" />
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
            {[
              "Indiranagar", "Whitefield", "Koramangala", "HSR Layout", 
              "Jayanagar", "JP Nagar", "Electronic City", "Sarjapur Road", 
              "Hebbal", "Yelahanka", "Malleshwaram", "Rajajinagar"
            ].map((area) => (
              <span key={area} className="bg-white/5 border border-white/10 text-gray-300 px-5 py-2 rounded-full text-sm font-medium hover:bg-[#FF2E2E] hover:text-white hover:border-[#FF2E2E] transition-colors cursor-default">
                {area}
              </span>
            ))}
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            We specialize in events at premium venues, villas, and corporate spaces across Bangalore.
          </p>
        </div>
      </section>

      {/* 📸 IMAGE GALLERY */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
              Moments We&apos;ve Created
            </h2>
            <p className="text-gray-400">A glimpse into our performances across weddings, parties, and corporate events.</p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: "/slider-cat-1.jpg", alt: "Live singer performing at a wedding event in Bangalore" },
              { src: "/slider-cat-2.jpg", alt: "Professional live singers performing on stage in Bangalore" },
              { src: "/slider-cat-3.jpg", alt: "Bollywood singer performing at sangeet in Bangalore" },
              { src: "/slider-cat-4.jpg", alt: "Kannada singer performing live at cultural event Bangalore" },
              { src: "/slider-1.jpg", alt: "English singer performing at corporate event in Bangalore" },
              { src: "/slider-2.jpg", alt: "Live band performing at wedding reception in Bangalore" },
              { src: "/slider-3.jpg", alt: "Acoustic band performance at corporate event Bangalore" },
              { src: "/slider-cat-1.jpg", alt: "Singer performing at house party in Bangalore" },
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="relative aspect-square rounded-2xl overflow-hidden group border border-white/10"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0F0F0F]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-xs font-semibold leading-tight">{img.alt}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 📞 FINAL CTA LOGIC */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#FF2E2E]/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            Book Live Singers &amp; Bands in Bangalore Today
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto">
            Looking to hire live singers, Bollywood singers, Kannada singers, English singers, or live bands in Bangalore? <br className="hidden sm:block" />
            Contact Urban Raaga today for availability and pricing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Link
              href="#book"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-[#FF2E2E] hover:bg-red-700 text-white font-bold px-10 py-4 rounded-full text-base shadow-[0_0_20px_rgba(255,46,46,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Book Now
            </Link>

            <Link
              href="tel:+919999999999"
              className="group flex items-center justify-center gap-2 w-full sm:w-auto bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-bold px-10 py-4 rounded-full text-base transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call / WhatsApp
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
