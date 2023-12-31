'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import ThemeSwitcher from '../app/ThemeSwitcher';

export default function Navbar() {
  const pathname = usePathname();
  const active = 'underline underline-offset-8 text-red-400';
  const inActive = 'px-4 py-2 rounded-md';

  return (
    <div className="flex px-6 py-4 justify-between items-center mt-4">
      <Link href="/" className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-red-500">
        <motion.p whileTap={{ scale: 0.8 }}>
          LearnTube
        </motion.p>
      </Link>

      <div className="hidden md:flex text-md items-center gap-8 justify-center">
        <Link href="/short-courses" className={`link ${pathname === '/short-courses' ? active : inActive}`}>
          <motion.p whileTap={{ scale: 0.8 }}>Short Courses</motion.p>
        </Link>
        <Link href="/pathways" className={`link ${pathname === '/pathways' ? active : inActive}`}>
          <motion.p whileTap={{ scale: 0.8 }}>Pathways</motion.p>
        </Link>
        <Link href="/micro-learn" className={`link ${pathname === '/micro-learn' ? active : inActive}`}>
          <motion.p whileTap={{ scale: 0.8 }}>Micro-Learn</motion.p>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        {/** Toogle modes */}
        <div className="flex mx-8">
          <ThemeSwitcher />
        </div>

        {/** Login/Sign-up options */}
        <div>
          <div className="hidden md:flex text-md gap-4">
            <motion.button whileTap={{ scale: 0.8 }} type="button" className="rounded-md py-1 px-2 bg-red-400 text-black hover:bg-red-500">
              Login
            </motion.button>
            <motion.button whileTap={{ scale: 0.8 }} type="button" className="rounded-md py-1 px-2 bg-emerald-300 text-black hover:bg-emerald-500">
              Sign-up
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
