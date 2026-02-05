import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const COUNTRIES = [
  'US', 'KR', 'JP', 'GB', 'CA', 'AU', 'DE', 'FR', 'IN', 'BR',
  'MX', 'ES', 'IT', 'CN', 'TH', 'SG', 'AE', 'ZA', 'PH', 'VN'
];

const YEAR = 2026;
const API_BASE = 'https://date.nager.at/api/v3/PublicHolidays';

async function fetchHolidays(countryCode: string): Promise<any[]> {
  const url = `${API_BASE}/${YEAR}/${countryCode}`;
  console.log(`Fetching ${countryCode}...`);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch ${countryCode}: ${response.status}`);
      return [];
    }
    const data = await response.json();
    console.log(`✓ ${countryCode}: ${data.length} holidays`);
    return data;
  } catch (error) {
    console.error(`Error fetching ${countryCode}:`, error);
    return [];
  }
}

async function main() {
  const dataDir = join(process.cwd(), 'data');

  try {
    mkdirSync(dataDir, { recursive: true });
  } catch (error) {
    // Directory already exists
  }

  console.log(`Fetching ${YEAR} holidays for ${COUNTRIES.length} countries...\n`);

  for (const country of COUNTRIES) {
    const holidays = await fetchHolidays(country);
    const filePath = join(dataDir, `${country}.json`);
    writeFileSync(filePath, JSON.stringify(holidays, null, 2));

    // Delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log('\n✓ All holidays fetched successfully!');
}

main();
