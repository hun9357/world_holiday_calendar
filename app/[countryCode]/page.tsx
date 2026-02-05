import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COUNTRIES, getCountryByCode } from '@/lib/countries';
import { getHolidays } from '@/lib/server-holidays';
import { getCalendarDays } from '@/lib/holidays';
import Calendar from '@/components/Calendar';
import AdSense from '@/components/AdSense';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ countryCode: string }>;
}

export async function generateStaticParams() {
  return COUNTRIES.map((country) => ({
    countryCode: country.code.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { countryCode } = await params;
  const country = getCountryByCode(countryCode);

  if (!country) {
    return {
      title: 'Country Not Found',
    };
  }

  return {
    title: `${country.name} Public Holidays 2026 | Official Calendar`,
    description: `Complete list of ${country.name} public holidays in 2026. View all national holidays, celebrations, and observances with dates and details.`,
    keywords: `${country.name} holidays, ${country.name} public holidays 2026, ${country.code} calendar, national holidays ${country.name}`,
    openGraph: {
      title: `${country.name} Public Holidays 2026`,
      description: `Complete calendar of public holidays in ${country.name} for 2026`,
      type: 'website',
    },
  };
}

export default async function CountryPage({ params }: Props) {
  const { countryCode } = await params;
  const country = getCountryByCode(countryCode);

  if (!country) {
    notFound();
  }

  const holidays = getHolidays(countryCode);
  const year = 2026;

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'https://worldholidays2026.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: country.name,
        item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://worldholidays2026.com'}/${countryCode}`,
      },
    ],
  };

  const eventJsonLd = holidays.map((holiday) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: holiday.name,
    startDate: holiday.date,
    endDate: holiday.date,
    location: {
      '@type': 'Country',
      name: country.name,
    },
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />

      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            ← Back to all countries
          </Link>
        </div>

        <div className="text-center mb-8">
          <div className="text-8xl mb-4">{country.flag}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            {country.name} Public Holidays {year}
          </h1>
          <p className="text-lg text-gray-600">
            {holidays.length} official public holidays
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <AdSense slot="header" />
        </div>

        <div className="lg:flex lg:gap-8">
          <div className="lg:flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {Array.from({ length: 12 }, (_, i) => i).map((month) => {
                const days = getCalendarDays(year, month, holidays);
                return <Calendar key={month} year={year} month={month} days={days} />;
              })}
            </div>

            <div className="flex justify-center mb-8">
              <AdSense slot="footer" />
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Holiday List {year}
              </h2>
              <div className="space-y-4">
                {holidays
                  .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                  .map((holiday, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex-1 mb-2 sm:mb-0">
                        <h3 className="font-semibold text-gray-900">{holiday.name}</h3>
                        {holiday.localName !== holiday.name && (
                          <p className="text-sm text-gray-600">{holiday.localName}</p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">
                          {new Date(holiday.date + 'T00:00:00').toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                          })}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(holiday.date + 'T00:00:00').toLocaleDateString('en-US', {
                            weekday: 'short',
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="lg:w-80 flex-shrink-0">
            <div className="sticky top-8">
              <AdSense slot="sidebar" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
