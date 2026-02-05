import { readFileSync } from 'fs';
import { join } from 'path';
import { Holiday } from './holidays';

export function getHolidays(countryCode: string): Holiday[] {
  try {
    const dataPath = join(process.cwd(), 'data', `${countryCode.toUpperCase()}.json`);
    const data = readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Failed to load holidays for ${countryCode}:`, error);
    return [];
  }
}
