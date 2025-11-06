import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans"
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Spectrum Themes – Curated Next.js theme marketplace",
  description:
    "Discover high-converting, modern Next.js themes tailored for product builders. Explore live previews, curated collections, and instant downloads."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${grotesk.variable}`}>
      <body className="font-sans antialiased">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-70" aria-hidden="true" />
        <header className="sticky top-0 z-20 border-b border-slate-800/60 bg-midnight/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 via-indigo-500 to-purple-600 text-lg font-semibold text-white shadow-glow">
                ST
              </span>
              <div>
                <p className="font-display text-lg font-semibold text-white">Spectrum Themes</p>
                <p className="text-xs text-slate-400">Curated store for builders</p>
              </div>
            </Link>
            <nav className="flex items-center gap-6 text-sm text-slate-200">
              <Link href="/#collections" className="transition hover:text-white">
                Collections
              </Link>
              <Link href="/#themes" className="transition hover:text-white">
                Catalog
              </Link>
              <Link href="/#faq" className="transition hover:text-white">
                FAQ
              </Link>
              <Link
                href="mailto:hello@spectrumthemes.dev"
                className="inline-flex items-center rounded-full border border-slate-600/70 px-4 py-1.5 text-sm font-medium text-white transition hover:border-transparent hover:bg-slate-500/20"
              >
                Request a theme
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto min-h-screen max-w-6xl px-4 pb-24 pt-16 sm:px-6">{children}</main>
        <footer className="border-t border-slate-800/60 bg-midnight/60 py-10 text-sm text-slate-400">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between sm:px-6">
            <p>© {new Date().getFullYear()} Spectrum Themes. Built for creators.</p>
            <div className="flex gap-6">
              <Link href="https://twitter.com" className="transition hover:text-white">
                Twitter
              </Link>
              <Link href="https://dribbble.com" className="transition hover:text-white">
                Dribbble
              </Link>
              <Link href="https://vercel.com" className="transition hover:text-white">
                Deploy on Vercel
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
