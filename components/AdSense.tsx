'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  slot: 'header' | 'sidebar' | 'footer';
}

export default function AdSense({ slot }: AdSenseProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (error) {
      console.error('AdSense error:', error);
    }
  }, []);

  // TODO: Replace with actual AdSense ad unit IDs from Google AdSense account
  const adConfig = {
    header: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 100 },
    sidebar: { width: 300, height: 250, mobileWidth: 0, mobileHeight: 0 },
    footer: { width: 728, height: 90, mobileWidth: 320, mobileHeight: 50 },
  };

  const config = adConfig[slot];

  if (!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID) {
    return (
      <div
        className={`bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-500 ${
          slot === 'sidebar' ? 'hidden lg:flex' : ''
        }`}
        style={{
          width: config.width,
          height: config.height,
          maxWidth: '100%',
        }}
      >
        <span className="text-sm">Ad Placeholder ({slot})</span>
      </div>
    );
  }

  return (
    <div
      className={`ad-container ${slot === 'sidebar' ? 'hidden lg:block' : ''}`}
      style={{ minWidth: config.mobileWidth || config.width }}
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: config.width,
          height: config.height,
          maxWidth: '100%',
        }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={process.env[`NEXT_PUBLIC_ADSENSE_SLOT_${slot.toUpperCase()}`]}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
