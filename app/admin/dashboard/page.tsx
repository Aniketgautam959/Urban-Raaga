"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminNavbar from "@/components/admin/AdminNavbar";

interface Artist {
  _id: string;
  name: string;
  title: string;
  status: "approved" | "pending" | "rejected";
  rating: number;
  totalBookings: string;
  coverImage: string;
  location: string;
  order?: number;
}

const STATUS_COLOR = {
  approved: "bg-green-500/20 text-green-400 border-green-500/30",
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function AdminDashboard() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [savingOrder, setSavingOrder] = useState(false);

  async function saveOrder(newArtists: Artist[]) {
    setSavingOrder(true);
    const items = newArtists.map((a, idx) => ({ id: a._id, order: idx }));
    await fetch("/api/artists/reorder", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    setSavingOrder(false);
  }

  function moveUp(index: number) {
    if (index === 0) return;
    const newArtists = [...artists];
    const temp = newArtists[index];
    newArtists[index] = newArtists[index - 1];
    newArtists[index - 1] = temp;
    setArtists(newArtists);
    saveOrder(newArtists);
  }

  function moveDown(index: number) {
    if (index === artists.length - 1) return;
    const newArtists = [...artists];
    const temp = newArtists[index];
    newArtists[index] = newArtists[index + 1];
    newArtists[index + 1] = temp;
    setArtists(newArtists);
    saveOrder(newArtists);
  }

  async function fetchArtists() {
    const res = await fetch("/api/artists?status=all", { cache: "no-store", next: { revalidate: 0 } });
    const data = await res.json();
    setArtists(data.artists || []);
    setLoading(false);
  }

  useEffect(() => { fetchArtists(); }, []);

  async function handleStatusChange(id: string, status: string) {
    await fetch(`/api/artists/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    fetchArtists();
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/artists/${id}`, { method: "DELETE" });
    fetchArtists();
    setDeleting(null);
  }

  const stats = {
    total: artists.length,
    approved: artists.filter((a) => a.status === "approved").length,
    pending: artists.filter((a) => a.status === "pending").length,
    rejected: artists.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white flex">
      <AdminNavbar />

      <main className="ml-56 flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-black text-white">Dashboard</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your artists</p>
          </div>
          <Link
            href="/admin/artists/new"
            className="bg-[#FF2E2E] hover:bg-red-700 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Artist
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "text-white" },
            { label: "Approved", value: stats.approved, color: "text-green-400" },
            { label: "Pending", value: stats.pending, color: "text-yellow-400" },
            { label: "Rejected", value: stats.rejected, color: "text-red-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{s.label}</p>
              <p className={`text-3xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Artists Table */}
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/10">
            <h2 className="font-bold text-white">All Artists</h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-16 text-gray-500">Loading...</div>
          ) : artists.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-500">
              <p className="mb-4">No artists found.</p>
              <Link href="/admin/artists/new" className="text-[#FF2E2E] font-semibold hover:underline text-sm">Add your first artist →</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-widest bg-white/3">
                    <th className="text-left px-6 py-3">Artist</th>
                    <th className="text-center px-4 py-3 w-24">Order</th>
                    <th className="text-left px-6 py-3">Status</th>
                    <th className="text-left px-6 py-3">Rating</th>
                    <th className="text-left px-6 py-3">Bookings</th>
                    <th className="text-right px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {artists.map((artist, idx) => (
                    <tr key={artist._id} className="hover:bg-white/3 transition-colors">
                      <td className="px-6 py-4 flex items-center gap-3">
                        {artist.coverImage ? (
                          <img src={artist.coverImage} alt="" className="w-10 h-10 rounded-full object-cover border border-white/10" />
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 text-xs font-bold">
                            {artist.name[0]}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-white">{artist.name}</p>
                          <p className="text-gray-500 text-xs">{artist.title}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center border-l border-r border-white/5">
                        <div className="flex flex-col items-center justify-center gap-1">
                          <button
                            onClick={() => moveUp(idx)}
                            disabled={idx === 0 || savingOrder}
                            className="text-gray-500 hover:text-white disabled:opacity-20 disabled:hover:text-gray-500 transition-colors"
                            title="Move Up"
                          >
                            ▲
                          </button>
                          <span className="text-[10px] font-bold text-gray-400">{idx + 1}</span>
                          <button
                            onClick={() => moveDown(idx)}
                            disabled={idx === artists.length - 1 || savingOrder}
                            className="text-gray-500 hover:text-white disabled:opacity-20 disabled:hover:text-gray-500 transition-colors"
                            title="Move Down"
                          >
                            ▼
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={artist.status}
                          onChange={(e) => handleStatusChange(artist._id, e.target.value)}
                          className={`text-xs font-bold border rounded-full px-3 py-1 bg-transparent cursor-pointer outline-none ${STATUS_COLOR[artist.status]}`}
                        >
                          <option value="approved" className="bg-[#111] text-white">Approved</option>
                          <option value="pending" className="bg-[#111] text-white">Pending</option>
                          <option value="rejected" className="bg-[#111] text-white">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-yellow-400 font-semibold">★ {artist.rating}</td>
                      <td className="px-6 py-4 text-gray-300">{artist.totalBookings}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <Link
                            href={`/admin/artists/${artist._id}/edit`}
                            className="px-4 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                          >
                            Edit
                          </Link>
                          <button
                            onClick={() => handleDelete(artist._id, artist.name)}
                            disabled={deleting === artist._id}
                            className="px-4 py-1.5 text-xs font-semibold bg-[#FF2E2E]/20 hover:bg-[#FF2E2E]/40 text-[#FF2E2E] rounded-lg transition-colors disabled:opacity-50"
                          >
                            {deleting === artist._id ? "..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
