import React from 'react';
import {
  Atkinson_Hyperlegible as atkinsonHyperlegible,
  Bricolage_Grotesque as bricolageGrotesque,
} from 'next/font/google';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Providers from './providers';
import './globals.css';

// No fallback metrics exist for Bricolage, so Next can't size-adjust a fallback for it.
const display = bricolageGrotesque({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  adjustFontFallback: false,
});

// Atkinson Hyperlegible was designed for readers with low vision; it stays legible for everyone.
const body = atkinsonHyperlegible({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-body',
  display: 'swap',
});

const DESCRIPTION = 'Free YouTube lessons, put in order. Watch a short step, try it with your own hands, and earn XP for what you make. An Elev8r product.';

export const metadata = {
  title: 'Skillreps · Learn a skill by making something',
  description: DESCRIPTION,
  applicationName: 'Skillreps',
  openGraph: { siteName: 'Skillreps', title: 'Skillreps', description: DESCRIPTION },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <body>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            {/* A page whose root has the "bleed" class (the landing) runs edge to edge. */}
            <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 has-[>.bleed]:max-w-none has-[>.bleed]:p-0">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
