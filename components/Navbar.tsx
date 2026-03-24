"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import EnquiryModal from "@/components/EnquiryModal";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "How It Works", href: "/#how-it-works" },
    { label: "About Us", href: "/#who-we-are" },
    { label: "Refund Policy", href: "/refund-cancellation" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Image 
              src="/logo.png" 
              alt="Urban Raaga Logo" 
              width={160} 
              height={64} 
              className="h-14 w-auto object-contain rounded-xl overflow-hidden border border-gray-100/50"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="tel:01169261547" className="text-sm font-semibold text-brand-red border border-brand-red rounded-full px-4 py-1.5 hover:bg-brand-red-light transition-colors">
              📞 Call Us
            </Link>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="text-sm font-semibold bg-brand-red text-white rounded-full px-5 py-1.5 hover:bg-brand-red-dark transition-colors shadow-md focus:outline-none"
            >
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="block text-sm font-medium text-gray-700 hover:text-brand-red transition-colors py-1"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 flex gap-3">
            <Link href="tel:01169261547" className="flex-1 text-center text-sm font-semibold text-brand-red border border-brand-red rounded-full px-4 py-2">
              📞 Call Us
            </Link>
            <button 
              onClick={() => {
                setIsModalOpen(true);
                setMenuOpen(false);
              }}
              className="flex-1 text-center text-sm font-semibold bg-brand-red text-white rounded-full px-4 py-2 focus:outline-none"
            >
              Book Now
            </button>
          </div>
        </div>
      )}

      {/* Enquiry Modal */}
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </header>
  );
}
