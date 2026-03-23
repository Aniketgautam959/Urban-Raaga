"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const footerLinks = {
  Company: [
    { label: "About Us", href: "#who-we-are" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Blog", href: "#" },
  ],
  Services: [
    { label: "Wedding Singers", href: "#" },
    { label: "House Party Singers", href: "#" },
    { label: "Corporate Events", href: "#" },
    { label: "Birthday Parties", href: "#" },
  ],
  Support: [
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/#faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Refund Policy", href: "/refund-cancellation" },
  ],
};

const cities = ["Bangalore"];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white" id="footer">
      {/* Top CTA Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-brand-red to-red-700 py-12 px-4"
      >
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl sm:text-3xl font-black mb-3">
            Ready to Book Your Live Singer?
          </h3>
          <p className="text-white/80 text-sm mb-6">
            Join thousands of happy customers who made their events unforgettable with Urban Raaga.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/#hero" className="inline-flex items-center justify-center gap-2 bg-white text-brand-red font-bold px-8 py-3 rounded-full text-sm hover:bg-gray-100 transition-colors shadow-lg">
              <svg className="w-4 h-4 border-brand-red text-brand-red" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
              Search Singers
            </Link>
            <Link href="tel:01169261547" className="inline-flex items-center justify-center gap-2 border-2 border-white text-white font-bold px-8 py-3 rounded-full text-sm hover:bg-white/10 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
              Call to Enquire
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6 cursor-pointer">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                <Image 
                  src="/logo.png" 
                  alt="Urban Raaga Logo" 
                  width={160} 
                  height={64} 
                  className="h-14 w-auto object-contain rounded-xl overflow-hidden" 
                />
              </motion.div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Bangalore&apos;s trusted platform to book live singers and bands for weddings, parties, and corporate events.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {["Instagram", "Facebook", "YouTube", "Twitter"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="w-9 h-9 bg-gray-800 hover:bg-brand-red rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 text-xs font-bold"
                  aria-label={social}
                >
                  {social[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-bold text-white text-sm uppercase tracking-widest mb-5">{group}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white text-sm transition-colors hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cities */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-xs uppercase tracking-widest font-semibold mb-4">
            Available in
          </p>
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city}
                href="#"
                className="text-xs text-gray-400 hover:text-brand-red bg-gray-800 hover:bg-gray-700 rounded-lg px-3 py-1.5 transition-colors"
              >
                {city}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-xs">
            © 2026 Urban Raaga. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Terms of Service</Link>
            <Link href="/refund-cancellation" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
