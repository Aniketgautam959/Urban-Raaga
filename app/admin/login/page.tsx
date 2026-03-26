"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      const data = await res.json();
      setError(data.error || "Login failed");
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-white tracking-tight">
            Urban <span className="text-[#FF2E2E]">Raaga</span>
          </h1>
          <p className="text-gray-400 mt-2 text-sm">Admin Panel</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@urbanraaga.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#FF2E2E] transition-colors placeholder-gray-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#FF2E2E] transition-colors placeholder-gray-600"
              />
            </div>

            {error && (
              <p className="text-[#FF2E2E] text-sm font-medium bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 rounded-lg px-3 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF2E2E] hover:bg-red-700 text-white font-bold py-3 rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
