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

  const BASE_URL = "https://www.bangaloresinger.in";
  const artistUrl = `${BASE_URL}/artist/${params.slug}`;

  // Build VideoObject entries from artist videos (YouTube or mp4)
  const videoObjects = (artist.videos ?? []).map((src, i) => ({
    "@type": "VideoObject",
    "name": `${artist.name} - Live Performance ${i + 1}`,
    "description": artist.seo.description,
    "thumbnailUrl": `${BASE_URL}/logo.png`,
    "uploadDate": "2025-01-01",
    "contentUrl": src.startsWith("http") ? src : `${BASE_URL}${src}`,
    "embedUrl": src.includes("youtube") ? src : undefined
  }));

  const artistSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": `${artistUrl}/#artist`,
    "name": artist.name,
    "url": artistUrl,
    "image": artist.images[0].startsWith("http")
      ? artist.images[0]
      : `${BASE_URL}${artist.images[0]}`,
    "description": artist.seo.description,
    "genre": artist.genres,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(artist.rating),
      "reviewCount": artist.totalBookings.replace("+", ""),
      "bestRating": "5"
    },
    ...(videoObjects.length > 0 && { "video": videoObjects })
  };

  return (
    <>
      {/* Server-rendered schema — visible in page source */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(artistSchema) }}
      />
      <ArtistProfileClient artist={artist} />
    </>
  );
}
