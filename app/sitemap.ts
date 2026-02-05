import { MetadataRoute } from 'next';
import { COUNTRIES } from '@/lib/countries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://worldholidays2026.com';

  const countryPages = COUNTRIES.map((country) => ({
    url: `${baseUrl}/${country.code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...countryPages,
  ];
}
