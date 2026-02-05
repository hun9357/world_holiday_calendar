import Link from 'next/link';
import { Country } from '@/lib/countries';

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link
      href={`/${country.code.toLowerCase()}`}
      className="group block p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 border border-gray-200"
    >
      <div className="flex flex-col items-center text-center gap-3">
        <span className="text-6xl" role="img" aria-label={country.name}>
          {country.flag}
        </span>
        <h2 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {country.name}
        </h2>
        <span className="text-sm text-gray-500 uppercase tracking-wider">
          {country.code}
        </span>
      </div>
    </Link>
  );
}
