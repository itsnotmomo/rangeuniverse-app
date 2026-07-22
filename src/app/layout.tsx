import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { BRAND, SITE_URL } from '@/lib/brand';

// Display — high-contrast serif. Reads private-capital, not crypto-room.
const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-display',
});

// Interface + body — neutral grotesk from the same family.
const sans = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

// Data, labels, prices — anything that should feel measured.
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono',
});

const DESCRIPTION =
  'Range Compound is a private execution desk. A disciplined methodology, real risk management, and performance compounded week over week. Membership is intentionally limited.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'The Compound',
    template: '%s | The Compound',
  },
  description: DESCRIPTION,

  // The favicon package from public/favicon/. favicon.svg is deliberately not
  // listed: it is a 272KB base64 raster wrapped in an <svg>, not real vector
  // art, so it would be no sharper than the 4.8KB PNG — but browsers that
  // support SVG icons prefer them, so listing it would ship the heavy file for
  // no gain.
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon/favicon.ico', sizes: 'any' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
  },
  manifest: '/favicon/site.webmanifest',

  openGraph: {
    title: 'The Compound',
    description: DESCRIPTION,
    siteName: BRAND.name,
    url: SITE_URL,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1731, height: 909, alt: BRAND.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Compound',
    description: DESCRIPTION,
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: '#0B0C0D',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
