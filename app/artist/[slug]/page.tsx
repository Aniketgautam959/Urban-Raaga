import type { Metadata } from "next";
import { getArtistBySlug } from "@/lib/artists";
import { notFound } from "next/navigation";
import ArtistProfileClient from "./ArtistProfileClient";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = getArtistBySlug(params.slug);
  if (!artist) {
    return {
      title: "Artist Not Found | Urban Raaga",
    };
  }

  return {
    title: artist.seo.title,
    description: artist.seo.description,
    keywords: artist.seo.keywords,
  };
}

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = getArtistBySlug(params.slug);

  if (!artist) {
    notFound();
  }

  return <ArtistProfileClient artist={artist} />;
}
