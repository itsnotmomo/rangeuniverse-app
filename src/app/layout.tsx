// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // Helps Next resolve relative URLs like "/og.jpeg"
  metadataBase: new URL("https://rangeuniverse.com"),

  // Browser tab title
  title: "Master Room | Copy, Paste, Profit.",
  description: "RangeUniverse.com | COPY. PASTE. PROFIT.",

  // Open Graph (Facebook, Telegram, iMessage, etc.)
  openGraph: {
    title: "Master Room | Copy, Paste, Profit.",
    description: "RangeUniverse.com | COPY. PASTE. PROFIT.",
    url: "https://rangeuniverse.com",
    siteName: "Master Room",
    type: "website",
    images: [
      {
        url: "/og.jpeg", // file in /public/og.jpeg
        width: 1200,
        height: 630,
        alt: "Master Room | Copy, Paste, Profit.",
      },
    ],
  },

  // Twitter cards
  twitter: {
    card: "summary_large_image",
    title: "Master Room | Copy, Paste, Profit.",
    description: "RangeUniverse.com | COPY. PASTE. PROFIT.",
    images: ["/og.jpeg"],
  },

  // Canonical
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
