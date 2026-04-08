import { MetadataRoute } from 'next'
import { connectDB } from "@/lib/mongodb"
import Artist from "@/lib/models/Artist"

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.bangaloresinger.in'

  await connectDB()
  const dbArtists = await Artist.find({ status: "approved" }).lean()

  // Static routes
  const routes = [
    '',
    '/services',
    '/results',
    '/contact',
    '/privacy-policy',
    '/refund-cancellation',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // Dynamic artist routes
  const artistRoutes = dbArtists.map((artist: any) => ({
    url: `${baseUrl}/artist/${artist.slug}`,
    lastModified: artist.updatedAt ? new Date(artist.updatedAt) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...routes, ...artistRoutes]
}
