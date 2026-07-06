import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Bootcamp — Learn, Trade, Profit",
  icons: {
    icon: "/mastermind.webp",
  },
};

export default function BootcampLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
