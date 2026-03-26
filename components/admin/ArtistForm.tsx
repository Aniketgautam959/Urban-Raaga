"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Pricing {
  type: string;
  price: number;
}

interface ArtistFormData {
  name: string;
  title: string;
  bio: string;
  shortDescription: string;
  coverImage: string;
  images: string[];
  videos: string[];
  genres: string;
  location: string;
  availableIn: string;
  rating: number;
  totalBookings: string;
  badges: string;
  pricing: Pricing[];
  priceIndicator: string;
  originalPriceIndicator: string;
  bookingAmount: string;
  status: "approved" | "pending" | "rejected";
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
}

interface ArtistFormProps {
  initial?: Partial<ArtistFormData> & { _id?: string };
  mode: "create" | "edit";
}

const DEFAULT: ArtistFormData = {
  name: "", title: "", bio: "", shortDescription: "",
  coverImage: "", images: [], videos: [],
  genres: "", location: "Bangalore", availableIn: "",
  rating: 4.5, totalBookings: "0", badges: "",
  pricing: [{ type: "Solo", price: 0 }],
  priceIndicator: "",
  originalPriceIndicator: "",
  bookingAmount: "",
  status: "pending",
  seoTitle: "", seoDescription: "", seoKeywords: "",
};

export default function ArtistForm({ initial, mode }: ArtistFormProps) {
  const router = useRouter();
  const [form, setForm] = useState<ArtistFormData>({
    ...DEFAULT,
    ...initial,
    genres: initial?.genres ?? "",
    availableIn: initial?.availableIn ?? "",
    badges: initial?.badges ?? "",
    seoTitle: (initial as any)?.seo?.title ?? "",
    seoDescription: (initial as any)?.seo?.description ?? "",
    seoKeywords: (initial as any)?.seo?.keywords ?? "",
  });

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField<K extends keyof ArtistFormData>(key: K, value: ArtistFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updatePricing(idx: number, field: keyof Pricing, value: string | number) {
    const updated = form.pricing.map((p, i) =>
      i === idx ? { ...p, [field]: field === "price" ? Number(value) : value } : p
    );
    updateField("pricing", updated);
  }

  function addPricing() {
    updateField("pricing", [...form.pricing, { type: "", price: 0 }]);
  }

  function removePricing(idx: number) {
    updateField("pricing", form.pricing.filter((_, i) => i !== idx));
  }

  async function uploadFile(file: File, folder = "urban-raaga/artists"): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("folder", folder);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    const data = await res.json();
    return data.url as string;
  }

  async function handleCoverUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadFile(file);
    updateField("coverImage", url);
    setUploading(false);
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setUploading(true);
    const urls = await Promise.all(files.map((f) => uploadFile(f)));
    updateField("images", [...form.images, ...urls]);
    setUploading(false);
  }

  async function handleVideoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    setUploading(true);
    const urls = await Promise.all(files.map((f) => uploadFile(f, "urban-raaga/videos")));
    updateField("videos", [...form.videos, ...urls]);
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      name: form.name,
      title: form.title,
      bio: form.bio,
      shortDescription: form.shortDescription,
      coverImage: form.coverImage,
      images: form.images.length ? form.images : [form.coverImage],
      videos: form.videos,
      genres: form.genres.split(",").map((g) => g.trim()).filter(Boolean),
      location: form.location,
      availableIn: form.availableIn.split(",").map((a) => a.trim()).filter(Boolean),
      rating: form.rating,
      totalBookings: form.totalBookings,
      badges: form.badges.split(",").map((b) => b.trim()).filter(Boolean),
      pricing: form.pricing,
      priceIndicator: form.priceIndicator,
      originalPriceIndicator: form.originalPriceIndicator,
      bookingAmount: form.bookingAmount,
      status: form.status,
      seo: {
        title: form.seoTitle,
        description: form.seoDescription,
        keywords: form.seoKeywords,
      },
    };

      const url = mode === "create" ? "/api/artists" : `/api/artists/${(initial as any)?._id}`;
      const method = mode === "create" ? "POST" : "PUT";

      try {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          setSuccess(mode === "create" ? "Artist created successfully!" : "Artist updated successfully!");
          setTimeout(() => router.push("/admin/dashboard"), 1000);
        } else {
          try {
            const data = await res.json();
            setError(data.error || "Something went wrong saving the artist.");
          } catch (e) {
            setError(`Server error (${res.status}). Please check server logs.`);
          }
        }
      } catch (err: any) {
        setError(err.message || "Network error. Failed to connect.");
      } finally {
        setSaving(false);
      }
    }
  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#FF2E2E] transition-colors placeholder-gray-600";
  const labelCls = "block text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">

      {/* Basic Info */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-bold text-white">Basic Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Artist Name *</label>
            <input className={inputCls} value={form.name} onChange={(e) => updateField("name", e.target.value)} placeholder="e.g. Devashish Music" required />
          </div>
          <div>
            <label className={labelCls}>Artist Title</label>
            <input className={inputCls} value={form.title} onChange={(e) => updateField("title", e.target.value)} placeholder="e.g. Wedding Singer in Bangalore" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Short Description</label>
          <input className={inputCls} value={form.shortDescription} onChange={(e) => updateField("shortDescription", e.target.value)} placeholder="One-line summary" />
        </div>
        <div>
          <label className={labelCls}>Full Bio</label>
          <textarea className={inputCls + " min-h-[120px] resize-y"} value={form.bio} onChange={(e) => updateField("bio", e.target.value)} placeholder="Full artist bio..." />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Location</label>
            <input className={inputCls} value={form.location} onChange={(e) => updateField("location", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Status</label>
            <select className={inputCls} value={form.status} onChange={(e) => updateField("status", e.target.value as any)}>
              <option value="pending" className="bg-[#111]">Pending</option>
              <option value="approved" className="bg-[#111]">Approved</option>
              <option value="rejected" className="bg-[#111]">Rejected</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className={labelCls}>Rating (0–5)</label>
            <input type="number" step="0.1" min="0" max="5" className={inputCls} value={form.rating} onChange={(e) => updateField("rating", Number(e.target.value))} />
          </div>
          <div>
            <label className={labelCls}>Total Bookings</label>
            <input className={inputCls} value={form.totalBookings} onChange={(e) => updateField("totalBookings", e.target.value)} placeholder="e.g. 100+" />
          </div>
        </div>
        <div>
          <label className={labelCls}>Genres (comma-separated)</label>
          <input className={inputCls} value={form.genres} onChange={(e) => updateField("genres", e.target.value)} placeholder="Bollywood, Sufi, English, Kannada" />
        </div>
        <div>
          <label className={labelCls}>Available In (comma-separated areas)</label>
          <input className={inputCls} value={form.availableIn} onChange={(e) => updateField("availableIn", e.target.value)} placeholder="Indiranagar, Whitefield, Koramangala" />
        </div>
        <div>
          <label className={labelCls}>Badges (comma-separated)</label>
          <input className={inputCls} value={form.badges} onChange={(e) => updateField("badges", e.target.value)} placeholder="Top Performer, Premium Performer" />
        </div>
      </section>

      {/* Photos */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-bold text-white">Cover & Gallery</h2>
        <div>
          <label className={labelCls}>Cover / Profile Photo</label>
          <input type="file" accept="image/*" onChange={handleCoverUpload} className="text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF2E2E]/20 file:text-[#FF2E2E] hover:file:bg-[#FF2E2E]/30 cursor-pointer" />
          {form.coverImage && <img src={form.coverImage} alt="cover preview" className="mt-3 h-32 w-32 object-cover rounded-xl border border-white/10" />}
        </div>
        <div>
          <label className={labelCls}>Gallery Photos (multiple)</label>
          <input type="file" accept="image/*" multiple onChange={handleGalleryUpload} className="text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF2E2E]/20 file:text-[#FF2E2E] hover:file:bg-[#FF2E2E]/30 cursor-pointer" />
          {form.images.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {form.images.map((img, i) => (
                <div key={i} className="relative group">
                  <img src={img} alt="" className="h-20 w-20 object-cover rounded-lg border border-white/10" />
                  <button type="button" onClick={() => updateField("images", form.images.filter((_, j) => j !== i))} className="absolute top-1 right-1 bg-[#FF2E2E] text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <label className={labelCls}>Videos (upload local or paste YouTube URL)</label>
          <input type="file" accept="video/*" multiple onChange={handleVideoUpload} className="text-sm text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#FF2E2E]/20 file:text-[#FF2E2E] hover:file:bg-[#FF2E2E]/30 cursor-pointer" />
          <input className={inputCls + " mt-3"} placeholder="Or paste YouTube embed URL and press Enter" onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              const val = (e.target as HTMLInputElement).value.trim();
              if (val) { updateField("videos", [...form.videos, val]); (e.target as HTMLInputElement).value = ""; }
            }
          }} />
          <div className="mt-2 space-y-1">
            {form.videos.map((v, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-gray-400 bg-white/5 rounded-lg px-3 py-2">
                <span className="truncate flex-1">{v}</span>
                <button type="button" onClick={() => updateField("videos", form.videos.filter((_, j) => j !== i))} className="text-[#FF2E2E] hover:text-red-400">✕</button>
              </div>
            ))}
          </div>
        </div>
        {uploading && <p className="text-xs text-yellow-400 animate-pulse">Uploading to Cloudinary...</p>}
      </section>

      {/* Pricing */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-bold text-white">Pricing</h2>
        <div className="space-y-3">
          {form.pricing.map((p, i) => (
            <div key={i} className="flex gap-3 items-center">
              <input className={inputCls} value={p.type} onChange={(e) => updatePricing(i, "type", e.target.value)} placeholder="Type (Solo / Duo / Trio)" />
              <input type="number" className={inputCls} value={p.price} onChange={(e) => updatePricing(i, "price", e.target.value)} placeholder="Price (₹)" />
              <button type="button" onClick={() => removePricing(i)} className="text-[#FF2E2E] hover:text-red-400 flex-shrink-0">✕</button>
            </div>
          ))}
          <button type="button" onClick={addPricing} className="text-sm text-[#FF2E2E] font-semibold hover:underline">+ Add pricing tier</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <label className={labelCls}>Original Price (MRP)</label>
            <input className={inputCls} value={form.originalPriceIndicator} onChange={(e) => updateField("originalPriceIndicator", e.target.value)} placeholder="e.g. ₹20,000" />
          </div>
          <div>
            <label className={labelCls}>Price Indicator (Deal Price)</label>
            <input className={inputCls} value={form.priceIndicator} onChange={(e) => updateField("priceIndicator", e.target.value)} placeholder="starts from ₹15,000" />
          </div>
          <div>
            <label className={labelCls}>Booking Amount (Advance)</label>
            <input className={inputCls} value={form.bookingAmount} onChange={(e) => updateField("bookingAmount", e.target.value)} placeholder="₹4,500" />
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5">
        <h2 className="text-lg font-bold text-white">SEO Settings</h2>
        <div>
          <label className={labelCls}>Meta Title</label>
          <input className={inputCls} value={form.seoTitle} onChange={(e) => updateField("seoTitle", e.target.value)} placeholder="Artist SEO title" />
        </div>
        <div>
          <label className={labelCls}>Meta Description</label>
          <textarea className={inputCls} value={form.seoDescription} onChange={(e) => updateField("seoDescription", e.target.value)} placeholder="SEO meta description (140–160 chars)" />
        </div>
        <div>
          <label className={labelCls}>Keywords</label>
          <input className={inputCls} value={form.seoKeywords} onChange={(e) => updateField("seoKeywords", e.target.value)} placeholder="wedding singer bangalore, bollywood singer..." />
        </div>
      </section>

      {error && <p className="text-[#FF2E2E] text-sm font-medium bg-[#FF2E2E]/10 border border-[#FF2E2E]/30 rounded-lg px-4 py-3">{error}</p>}
      {success && <p className="text-green-400 text-sm font-medium bg-green-400/10 border border-green-400/30 rounded-lg px-4 py-3">{success}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving || uploading} className="bg-[#FF2E2E] hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {saving ? "Saving..." : mode === "create" ? "Create Artist" : "Save Changes"}
        </button>
        <button type="button" onClick={() => router.back()} className="bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold px-8 py-3 rounded-xl transition-colors text-sm">
          Cancel
        </button>
      </div>
    </form>
  );
}
