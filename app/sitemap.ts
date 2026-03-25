import { MetadataRoute } from 'next'
import { artists } from '@/lib/artists'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.bangaloresinger.in'

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
  const artistRoutes = artists.map((artist) => ({
    url: `${baseUrl}/artist/${artist.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return [...routes, ...artistRoutes]
}
