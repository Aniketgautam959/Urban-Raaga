"use client";

import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

export default function AdminNavbar() {
  return (
    <aside className="w-56 min-h-screen bg-[#111] border-r border-white/10 flex flex-col p-6 fixed left-0 top-0">
      <div className="mb-10">
        <h1 className="text-lg font-black text-white">
          Urban <span className="text-[#FF2E2E]">Raaga</span>
        </h1>
        <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 space-y-1">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Dashboard
        </Link>
        <Link
          href="/admin/artists/new"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Artist
        </Link>
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View Site
        </Link>
      </nav>

      {/* Clerk UserButton handles profile + sign out */}
      <div className="flex items-center gap-3 px-3 py-2.5">
        <UserButton afterSignOutUrl="/" />
        <span className="text-sm text-gray-400">Account</span>
      </div>
    </aside>
  );
}
