'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

import ThemeSwitcher from '../app/ThemeSwitcher';

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const pathname = usePathname();
  const active = 'font-bold underline underline-offset-8 text-red-400';
  const inActive = 'px-4 py-2 rounded-md';

  const menuRef = useRef();

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex px-6 py-4 justify-between items-center mt-4">
      <Link href="/" className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-red-500">
        <motion.p whileTap={{ scale: 0.8 }}>
          LearnTube
        </motion.p>
      </Link>

      <div className="hidden lg:flex text-md items-center gap-8 justify-center">
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
        <div className="flex mx-4">
          <ThemeSwitcher />
        </div>

        {/** Login/Sign-up options */}
        <div>
          <div className="hidden lg:flex lg:text-md gap-2">
            <motion.button whileTap={{ scale: 0.8 }} type="button" className="rounded-md py-1 px-2 bg-red-400 text-black hover:bg-red-500">
              Login
            </motion.button>
            <motion.button whileTap={{ scale: 0.8 }} type="button" className="rounded-md py-1 px-2 bg-emerald-300 text-black hover:bg-emerald-500">
              Sign-up
            </motion.button>
          </div>
        </div>

        <div ref={menuRef} className="lg:hidden">
          <button type="button" aria-label="Menu" onClick={() => setShowMenu(!showMenu)}><AiOutlineMenu className="text-3xl text-red-500" /></button>
          {showMenu && (
            <div className="absolute top-20 right-0 w-40 p-2 rounded-md shadow-md">
              <div className="flex flex-col justify-between items-center gap-6 p-4">
                <Link href="/short-courses" className="text-sm font-medium font-montserrat ">Short Courses</Link>
                <Link href="/pathways" className="text-sm font-medium font-montserrat ">Pathways</Link>
                <Link href="/micro-learn" className="text-sm font-medium font-montserrat ">Micro-Learn</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
