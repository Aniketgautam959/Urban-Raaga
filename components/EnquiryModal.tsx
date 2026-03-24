"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOCATION_OPTIONS = [
  "Bangalore",
  "Indiranagar",
  "Koramangala",
  "Whitefield",
  "HSR Layout",
  "JP Nagar",
  "Jayanagar",
  "Hebbal",
  "Marathahalli",
];

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
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

  const handleSubmit = () => {
    if (!fullName || !phoneNumber) {
      alert("Please provide your Full Name and WhatsApp Number so we can reach you!");
      return;
    }
    const message = `Hi Urban Raaga! I'd like to send an enquiry.\n\n*Name:* ${fullName}\n*Phone:* ${phoneNumber}\n*Event Type:* ${eventType || "Not specified"}\n*Date:* ${date || "Not specified"}\n*Location:* ${eventLocation || "Not specified"}\n*Guests:* ${guests || "Not specified"}\n*Venue:* ${indoorOutdoor || "Not specified"}\n*Sound:* ${soundRequirement || "Not specified"}\n*Requirements:* ${requirements || "None"}`;
    window.open(`https://wa.me/919424700519?text=${encodeURIComponent(message)}`, "_blank");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-2xl bg-[#141414] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Header */}
            <div className="px-8 py-7 border-b border-white/5 flex items-start justify-between bg-white/[0.02]">
              <div>
                <h3 className="text-2xl font-black text-white mb-1.5 tracking-tight">Send an Enquiry</h3>
                <p className="text-sm text-gray-400">Fill details to check availability and get custom quotes.</p>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white transition-all flex-shrink-0 ml-4 hover:rotate-90"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Form Body */}
            <div className="p-8 space-y-7 overflow-y-auto custom-scrollbar flex-1">
              {/* Name + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-2">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name *</label>
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-3.5 outline-none focus:border-red-500/50 focus:bg-white/[0.08] transition-all placeholder:text-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-red-500 uppercase tracking-widest ml-1">WhatsApp Number *</label>
                  <input
                    type="tel"
                    placeholder="+91"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full bg-white/5 border border-red-500/20 text-white rounded-2xl px-5 py-3.5 outline-none focus:border-red-500 focus:bg-white/[0.08] transition-all placeholder:text-gray-600"
                  />
                </div>
              </div>

              {/* Grid Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                {/* Event Type */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-3.5 outline-none focus:border-red-500/50 transition-all cursor-pointer appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
                  >
                    <option value="" disabled className="bg-[#141414]">Select Event Type</option>
                    <option value="Wedding" className="bg-[#141414]">Wedding / Sangeet</option>
                    <option value="Corporate" className="bg-[#141414]">Corporate Event</option>
                    <option value="PrivateParty" className="bg-[#141414]">Private Party</option>
                    <option value="Other" className="bg-[#141414]">Other</option>
                  </select>
                </div>

                {/* Event Date */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Event Date</label>
                  <input
                    type={date ? "date" : "text"}
                    placeholder="dd/mm/yyyy"
                    onFocus={(e) => { e.target.type = "date"; e.target.showPicker && e.target.showPicker(); }}
                    onBlur={(e) => { if (!e.target.value) e.target.type = "text"; }}
                    min={new Date().toLocaleDateString("en-CA")}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-3.5 outline-none focus:border-red-500/50 transition-all cursor-pointer"
                  />
                </div>

                {/* Venue Area */}
                <div className="space-y-2 relative">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Venue Area</label>
                  <input
                    type="text"
                    placeholder="e.g. Indiranagar, Bangalore"
                    value={eventLocation}
                    onChange={(e) => { setEventLocation(e.target.value); setShowLocationSuggestions(true); }}
                    onFocus={() => setShowLocationSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowLocationSuggestions(false), 200)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-3.5 outline-none focus:border-red-500/50 transition-all placeholder:text-gray-600"
                  />
                  {showLocationSuggestions && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 bg-[#1A1A1A] border border-white/10 rounded-2xl overflow-hidden z-[120] shadow-2xl max-h-48 overflow-y-auto">
                      {LOCATION_OPTIONS.filter((loc) =>
                        loc.toLowerCase().includes(eventLocation.toLowerCase())
                      ).map((loc) => (
                        <div
                          key={loc}
                          className="px-5 py-3.5 hover:bg-red-500/20 text-gray-300 hover:text-white font-medium cursor-pointer transition-colors text-sm flex items-center gap-3"
                          onClick={() => { setEventLocation(loc); setShowLocationSuggestions(false); }}
                        >
                          <svg className="w-4 h-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {loc}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Approximate Guests */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Approximate Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-3.5 outline-none focus:border-red-500/50 transition-all cursor-pointer appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
                  >
                    <option value="" disabled className="bg-[#141414]">Select Capacity</option>
                    <option value="0-50" className="bg-[#141414]">Under 50</option>
                    <option value="50-200" className="bg-[#141414]">50 - 200</option>
                    <option value="200-500" className="bg-[#141414]">200 - 500</option>
                    <option value="500+" className="bg-[#141414]">500+</option>
                  </select>
                </div>

                {/* Venue Setting */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Venue Setting</label>
                  <select
                    value={indoorOutdoor}
                    onChange={(e) => setIndoorOutdoor(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-3.5 outline-none focus:border-red-500/50 transition-all cursor-pointer appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
                  >
                    <option value="" disabled className="bg-[#141414]">Indoor or Outdoor?</option>
                    <option value="Indoor" className="bg-[#141414]">Indoor</option>
                    <option value="Outdoor" className="bg-[#141414]">Outdoor</option>
                  </select>
                </div>

                {/* Sound & Equipment */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Sound & Equipment</label>
                  <select
                    value={soundRequirement}
                    onChange={(e) => setSoundRequirement(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-3.5 outline-none focus:border-red-500/50 transition-all cursor-pointer appearance-none"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1.25rem center', backgroundSize: '1rem' }}
                  >
                    <option value="" disabled className="bg-[#141414]">Select Requirement</option>
                    <option value="Available at Venue" className="bg-[#141414]">Available at Venue</option>
                    <option value="Need Urban Raaga to arrange" className="bg-[#141414]">Need Urban Raaga to arrange</option>
                  </select>
                </div>
              </div>

              {/* Special Requirements */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Special Requirements (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell us about specific songs, setup needs, or schedule..."
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 text-white rounded-2xl px-5 py-4 outline-none focus:border-red-500/50 transition-all placeholder:text-gray-600 resize-none"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium tracking-tight uppercase">* Advance is required to lock dates.</p>
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="px-6 py-3 text-white font-bold rounded-full hover:bg-white/10 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(220,38,38,0.2)] hover:scale-105 active:scale-95 text-sm"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

  );
}
