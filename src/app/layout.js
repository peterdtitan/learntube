'use client';

import React from 'react';

import Navbar from '../components/Navbar';
import Providers from './providers';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          <div className="p-8">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
