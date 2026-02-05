# World Public Holidays Calendar 2026

A high-performance, SEO-optimized static website showcasing public holidays for 20 countries worldwide. Built for AdSense monetization with Next.js SSG.

## Features

- 20 country holiday calendars (US, KR, JP, GB, CA, AU, DE, FR, IN, BR, MX, ES, IT, CN, TH, SG, AE, ZA, PH, VN)
- Complete 2026 holiday data from Nager.Date API
- Fully static generation for optimal performance
- Responsive mobile-first design
- SEO-optimized with structured data (Schema.org)
- AdSense-ready with 3 ad placement zones
- Automatic sitemap and robots.txt generation

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Static Site Generation (SSG)

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Fetch Holiday Data

```bash
npm run fetch-holidays
```

This will fetch 2026 holiday data for all 20 countries from the Nager.Date API and save them to the `data/` directory.

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### 4. Build for Production

```bash
npm run build
```

This automatically fetches fresh holiday data before building static pages.

## Environment Variables

Create a `.env.local` file (or set in Vercel):

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Optional: Google AdSense (leave empty for placeholders)
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=XXXXXXXXXX
```

## Deployment on Vercel

### Step 1: Import Project

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com/new)
3. Import your repository

### Step 2: Configure Environment Variables

In Vercel dashboard, add:

- `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., https://worldholidays2026.com)
- AdSense variables (if ready)

### Step 3: Deploy

Vercel will automatically:
- Run `npm run fetch-holidays` (via prebuild)
- Build static pages for all 20 countries
- Deploy to CDN

## AdSense Setup (Post-Deployment)

1. Apply for Google AdSense approval
2. Add your AdSense publisher ID to `public/ads.txt`
3. Set environment variables in Vercel
4. Redeploy

### Ad Placements

- **Header Banner**: Below H1 (728x90 / 320x100)
- **Sidebar**: Desktop only (300x250)
- **Footer Banner**: Below calendar (728x90 / 320x50)

## Project Structure

```
world-holidays-calendar/
├── app/
│   ├── [countryCode]/
│   │   └── page.tsx          # Country detail pages (SSG)
│   ├── page.tsx               # Homepage with country grid
│   ├── layout.tsx             # Root layout with AdSense script
│   ├── sitemap.ts             # Dynamic sitemap generation
│   └── robots.ts              # Robots.txt configuration
├── components/
│   ├── AdSense.tsx            # Ad placement component
│   ├── Calendar.tsx           # Monthly calendar grid
│   └── CountryCard.tsx        # Country selector card
├── lib/
│   ├── countries.ts           # Country configuration
│   ├── holidays.ts            # Holiday types and utilities
│   └── server-holidays.ts     # Server-side data loading
├── scripts/
│   └── fetch-holidays.ts      # API data fetcher
└── data/
    ├── US.json                # Holiday data (generated)
    ├── KR.json
    └── ...
```

## SEO Features

- Static page generation for all routes
- Optimized meta titles and descriptions
- Schema.org structured data (Event, BreadcrumbList, WebSite)
- Automatic sitemap.xml generation
- Mobile-responsive design
- Fast page load times (static CDN delivery)

## Data Source

Holiday data is fetched from [Nager.Date API](https://date.nager.at/) - a free public holiday API.

**Note**: Some countries (IN, TH, AE) may have incomplete 2026 data in the API. This is expected and will be updated as data becomes available.

## License

MIT
