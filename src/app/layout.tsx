import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Caveat,
  DM_Sans,
  Libre_Baskerville,
  Playfair_Display,
  Ranga,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const libre = Libre_Baskerville({
  variable: "--font-libre",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const ranga = Ranga({
  variable: "--font-ranga",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const tiro = Tiro_Devanagari_Hindi({
  variable: "--font-tiro",
  weight: ["400"],
  subsets: ["devanagari", "latin"],
});

export const metadata: Metadata = {
  title: "Birthday Surprise",
  description: "A Pinterest-style birthday inspo board with a secret pin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${caveat.variable} ${libre.variable} ${ranga.variable} ${tiro.variable} ${bodoni.variable} h-full antialiased`}
    >
      <body className="min-h-full" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
