# Deployment Checklist

## Pre-Deployment

- [ ] Test locally with `npm run dev`
- [ ] Verify all 20 country pages load correctly
- [ ] Run production build: `npm run build`
- [ ] Check build output for errors
- [ ] Verify holiday data in `data/` directory (17+ countries should have data)

## Vercel Deployment

### 1. Initial Setup

1. Create GitHub repository and push code
   ```bash
   git init
   git add .
   git commit -m "Initial commit: World Holidays Calendar MVP"
   git branch -M main
   git remote add origin YOUR_REPO_URL
   git push -u origin main
   ```

2. Import to Vercel
   - Go to https://vercel.com/new
   - Select your repository
   - Framework Preset: Next.js (auto-detected)

### 2. Environment Variables

Add in Vercel dashboard under Settings > Environment Variables:

**Production + Preview + Development:**

```
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

**Optional (AdSense - leave blank initially):**
```
NEXT_PUBLIC_ADSENSE_CLIENT_ID=
NEXT_PUBLIC_ADSENSE_SLOT_HEADER=
NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=
NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=
```

### 3. Build & Deployment Settings

Vercel auto-detects these, but verify:

- **Build Command**: `npm run build` (includes prebuild hook to fetch holidays)
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Node Version**: 20.x (recommended)

### 4. Deploy

Click "Deploy" - Vercel will:
1. Install dependencies
2. Run `npm run fetch-holidays` (via prebuild)
3. Build 26 static pages (1 home + 20 countries + 5 system pages)
4. Deploy to global CDN

## Post-Deployment

### Custom Domain (Optional)

1. Add domain in Vercel dashboard
2. Update DNS records as instructed
3. Update `NEXT_PUBLIC_SITE_URL` environment variable
4. Redeploy

### Google AdSense Setup

#### Phase 1: Site Approval (Week 1-2)

1. Apply for AdSense at https://adsense.google.com
2. Add AdSense site verification code (if required)
3. Wait for approval (usually 1-2 weeks)
4. Requirements:
   - Original content ✓ (holiday calendars)
   - Privacy Policy page (TODO: add if required)
   - Sufficient content ✓ (20+ pages)
   - Clean design ✓

#### Phase 2: Ad Implementation (After Approval)

1. Get your Publisher ID (ca-pub-XXXXXXXXXXXXXXXX)
2. Update `public/ads.txt`:
   ```
   google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
   ```

3. Create ad units in AdSense dashboard:
   - Header Banner: Display Ad (Responsive)
   - Sidebar: Display Ad (300x250)
   - Footer Banner: Display Ad (Responsive)

4. Update Vercel environment variables:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_SLOT_HEADER=1234567890
   NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR=0987654321
   NEXT_PUBLIC_ADSENSE_SLOT_FOOTER=1122334455
   ```

5. Redeploy to activate ads

## Monitoring & Optimization

### Week 1-4: Monitor Performance

- [ ] Check Google Analytics (if added)
- [ ] Monitor AdSense earnings and RPM
- [ ] Check Core Web Vitals in Vercel Analytics
- [ ] Review search console for indexing issues

### SEO Optimization

1. Submit sitemap to Google Search Console:
   - URL: `https://your-domain.com/sitemap.xml`

2. Submit to other search engines:
   - Bing Webmaster Tools
   - Yandex (for Russia/Eastern Europe traffic)

3. Build backlinks:
   - Submit to holiday directory sites
   - Reddit posts in relevant subreddits
   - Social media sharing

### Content Updates

- [ ] Add 2027 holiday data (in December 2026)
- [ ] Update year references in metadata
- [ ] Consider adding more countries if traffic warrants

## Troubleshooting

### Build Fails

- Check if `data/` directory has JSON files
- Verify Nager API is accessible
- Run `npm run fetch-holidays` locally to test

### Ads Not Showing

- Verify environment variables are set
- Check browser console for AdSense errors
- Ensure ads.txt is accessible at root domain
- AdSense may take 24-48 hours to start showing ads

### Pages Not Loading

- Check Vercel deployment logs
- Verify all 20 country codes in `lib/countries.ts` have data files
- Test with `npm run build` locally

## Success Metrics

### Technical
- Build time: < 2 minutes
- Page load: < 1 second
- Lighthouse score: 90+ (Performance, SEO, Accessibility)

### Business
- AdSense approval: Within 2 weeks
- Monthly visitors: Target 1,000+ (Month 1)
- RPM: $1-5 (typical for content sites)
- Total revenue: Variable based on traffic

## Next Steps

After successful deployment:

1. Monitor for 1 week
2. Apply for AdSense
3. Set up Google Search Console
4. Share on social media
5. Consider SEO content additions (e.g., blog about holidays)
