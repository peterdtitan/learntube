'use client';

import React from 'react';

import Navbar from '../components/Navbar';
import Providers from './providers';
import './globals.css';
import Footer from '../components/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white text-black dark:bg-gray-900 dark:text-white">
        <Providers>
          <Navbar />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
