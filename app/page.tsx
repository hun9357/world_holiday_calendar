import { COUNTRIES } from '@/lib/countries';
import CountryCard from '@/components/CountryCard';
import AdSense from '@/components/AdSense';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'World Public Holidays 2026 | Official Holiday Calendars for 20 Countries',
  description: 'Browse public holidays for 2026 across 20 countries including United States, United Kingdom, Japan, Germany, France, and more. View complete official holiday calendars.',
  openGraph: {
    title: 'World Public Holidays 2026',
    description: 'Complete holiday calendars for 20 countries in 2026',
    type: 'website',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'World Public Holidays 2026',
    description: 'Complete list of public holidays for 20 countries in 2026',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://worldholidays2026.com',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
          World Public Holidays 2026
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8 max-w-3xl mx-auto">
          Explore official public holidays and celebrations for 20 countries around the world.
          Click any country to view its complete 2026 holiday calendar.
        </p>

        <div className="flex justify-center mb-12">
          <AdSense slot="header" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {COUNTRIES.map((country) => (
            <CountryCard key={country.code} country={country} />
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <AdSense slot="footer" />
        </div>
      </div>
    </>
  );
}
