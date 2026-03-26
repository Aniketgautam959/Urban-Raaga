import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArtistProfileClient from "./ArtistProfileClient";
import { connectDB } from "@/lib/mongodb";
import Artist from "@/lib/models/Artist";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const BASE_URL = "https://www.bangaloresinger.in";

async function getArtist(slug: string) {
  await connectDB();
  const artist = await Artist.findOne({ slug }).lean();
  return artist as any;
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const artist = await getArtist(params.slug);
  if (!artist) return { title: "Artist Not Found | Urban Raaga" };

  const artistUrl = `${BASE_URL}/artist/${params.slug}`;
  const firstImage = artist.images?.[0] || artist.coverImage || "";
  const artistImage = firstImage.startsWith("http") ? firstImage : `${BASE_URL}${firstImage}`;

  return {
    title: artist.seo?.title || `${artist.name} | Urban Raaga`,
    description: artist.seo?.description || artist.bio || "",
    keywords: artist.seo?.keywords || "",
    alternates: { canonical: artistUrl },
    openGraph: {
      title: artist.seo?.title || artist.name,
      description: artist.seo?.description || artist.bio || "",
      url: artistUrl,
      type: "profile",
      images: [{ url: artistImage, width: 1200, height: 630, alt: `${artist.name} - Live Singer in Bangalore` }],
    },
    twitter: {
      card: "summary_large_image",
      title: artist.seo?.title || artist.name,
      description: artist.seo?.description || artist.bio || "",
      images: [artistImage],
    },
  };
}

export default async function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = await getArtist(params.slug);
  if (!artist) notFound();

  const artistUrl = `${BASE_URL}/artist/${params.slug}`;
  const firstImage = artist.images?.[0] || artist.coverImage || "";
  const artistImage = firstImage.startsWith("http") ? firstImage : `${BASE_URL}${firstImage}`;

  const videoObjects = (artist.videos ?? []).map((src: string, i: number) => ({
    "@type": "VideoObject",
    "name": `${artist.name} - Live Performance ${i + 1}`,
    "description": artist.seo?.description || artist.bio || "",
    "thumbnailUrl": `${BASE_URL}/logo.png`,
    "uploadDate": "2025-01-01",
    "contentUrl": src.startsWith("http") ? src : `${BASE_URL}${src}`,
    "embedUrl": src.includes("youtube") ? src : undefined,
  }));

  const artistSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "@id": `${artistUrl}/#artist`,
    "name": artist.name,
    "url": artistUrl,
    "image": artistImage,
    "description": artist.seo?.description || artist.bio || "",
    "genre": artist.genres || [],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": String(artist.rating || 4.5),
      "reviewCount": String(artist.totalBookings || "1").replace("+", ""),
      "bestRating": "5",
    },
    ...(videoObjects.length > 0 && { "video": videoObjects }),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL },
      { "@type": "ListItem", "position": 2, "name": "Artists", "item": `${BASE_URL}/results` },
      { "@type": "ListItem", "position": 3, "name": artist.name, "item": artistUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(artistSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ArtistProfileClient artist={artist} />
    </>
  );
}
