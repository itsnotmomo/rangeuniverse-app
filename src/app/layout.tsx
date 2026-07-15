import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Range Universe | Live Trading Signals & Education",
    template: "%s | Range Universe",
  },
  description:
    "Range Universe — Professional trading education, live execution, and structured systems built for long-term profitability.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
