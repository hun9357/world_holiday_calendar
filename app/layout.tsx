import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "World Public Holidays 2026 | Official Holiday Calendars",
  description: "Complete list of public holidays for 20 countries in 2026. View official calendars, national holidays, and celebrations worldwide.",
  keywords: "public holidays, 2026 calendar, national holidays, world holidays, official holidays",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://worldholidays2026.com'),
  verification: {
    google: "KLUWmaJTvSkVldncIo2cPl6KQtr610FUWuZhywdYN5Y",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <a href="/" className="text-2xl font-bold text-gray-900 hover:text-blue-600">
              🌍 World Holidays 2026
            </a>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="container mx-auto px-4 py-8 text-center text-gray-600 text-sm">
            <p>© 2026 World Public Holidays Calendar. All rights reserved.</p>
            <p className="mt-2">Data provided by Nager.Date API</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
