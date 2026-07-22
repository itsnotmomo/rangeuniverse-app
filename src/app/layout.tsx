import './globals.css';
import type { Metadata, Viewport } from 'next';
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import { SITE_URL } from '@/lib/brand';

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Range Compound — Where discipline compounds',
    template: '%s | Range Compound',
  },
  description:
    'Range Compound is a private execution desk. A disciplined methodology, real risk management, and performance compounded week over week. Membership is intentionally limited.',
  openGraph: {
    title: 'Range Compound — Where discipline compounds',
    description:
      'A private execution desk. Disciplined methodology, real risk management, compounding performance.',
    type: 'website',
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
