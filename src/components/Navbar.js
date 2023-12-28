'use client';

import React from 'react';

import ThemeSwitcher from '../app/ThemeSwitcher';

export default function Navbar() {
  return (
    <div className="flex px-6 py-4 justify-between items-center mt-4">
      <p className="text-3xl text-red-500 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-red-500">LearnTube</p>
      <div className="hidden font-montserrat md:flex items-center gap-8 justify-center">
        <p className="px-4 py-2 rounded-md">Short Courses</p>
        <p className="px-4 py-2 rounded-md">Pathways</p>
        <p className="px-4 py-2 rounded-md">Micro-Learn</p>
      </div>

      <div className="flex mx-8 items-center justify-between">
        {/** Toogle modes */}
        <div className="flex mx-8">
          <ThemeSwitcher />
        </div>

        {/** Login/Sign-up options */}
        <div>
          <div className="hidden font-montserrat md:flex gap-4">
            <button type="button" className="rounded-md">Login</button>
            <button type="button" className="rounded-md">Sign-up</button>
          </div>
        </div>
      </div>
    </div>
  );
}
