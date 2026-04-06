import type { Metadata } from "next";
import { Geist, Special_Gothic_Expanded_One } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const specialGothic = Special_Gothic_Expanded_One({
  variable: "--font-special-gothic",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Superlative Podcast | Edward Buchi",
  description:
    "A 15-minute live conversation hosted by Edward Buchi. Founders, investors, athletes, and media executives. No edits, no post-production. Streamed live to X.",
  openGraph: {
    title: "The Superlative Podcast",
    description:
      "One conversation. One guest. No ceiling. Live-streamed on X.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@thespeakerlisan",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${specialGothic.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
