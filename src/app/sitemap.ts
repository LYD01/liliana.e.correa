import type { MetadataRoute } from 'next'
import { BASE_URL } from './_constants/BaseUrl'
import { WORKS_DATA } from './_constants/WorksData'

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  // Dynamic work pages
  const workPages: MetadataRoute.Sitemap = WORKS_DATA.map((work) => {
    // Normalize URL - ensure it starts with /
    const normalizedUrl = work.url.startsWith('/') ? work.url : `/${work.url}`
    
    return {
      url: `${BASE_URL}${normalizedUrl}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }
  })

  return [...staticPages, ...workPages]
}
