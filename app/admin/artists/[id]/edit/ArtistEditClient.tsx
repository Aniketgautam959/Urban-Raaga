"use client";

import { useEffect, useState } from "react";
import ArtistForm from "@/components/admin/ArtistForm";

export default function ArtistEditClient({ id }: { id: string }) {
  const [artist, setArtist] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/artists/${id}`, { cache: "no-store", next: { revalidate: 0 } })
      .then((r) => r.json())
      .then((d) => { setArtist(d.artist); setLoading(false); });
  }, [id]);

  if (loading) return <p className="text-gray-400">Loading artist data...</p>;
  if (!artist) return <p className="text-[#FF2E2E]">Artist not found.</p>;

  return (
    <ArtistForm
      mode="edit"
      initial={{
        ...artist,
        genres: artist.genres?.join(", ") ?? "",
        availableIn: artist.availableIn?.join(", ") ?? "",
        badges: artist.badges?.join(", ") ?? "",
      }}
    />
  );
}
