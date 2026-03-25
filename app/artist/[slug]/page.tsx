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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": artist.name,
    "image": artist.images[0].startsWith("http") ? artist.images[0] : `https://urbanraaga.com${artist.images[0]}`,
    "description": artist.seo.description,
    "url": `https://urbanraaga.com/artist/${params.slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArtistProfileClient artist={artist} />
    </>
  );
}
