import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Geist Pixel (Vercel, SIL OFL — see src/app/fonts/LICENSE.txt). It isn't in
// this Next version's Google-font manifest, so it's self-hosted. Uses the
// "Square" static style — the cleanest pixel blocks. (The font's ELSH variable
// axis barely changes the shape, so it's not worth shipping the variable file.)
// The pixel grid is fine, so it only reads as pixelated at large sizes.
// Exposed as the `--font-geist-pixel` CSS variable rather than applied
// globally, since it's a display face.
const geistPixel = localFont({
  src: "./fonts/GeistPixel-Square.woff2",
  variable: "--font-geist-pixel",
  display: "swap",
});

// Body face. A quiet sans so the pixel display face is the only loud thing
// on the page. Self-hosted by next/font, so it looks the same on every device.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "garbage time",
  description: "basketball and sports projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${geistPixel.variable} ${plexSans.variable}`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
