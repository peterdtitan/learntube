import React from 'react';
import Link from 'next/link';
import { RiTwitterLine, RiInstagramLine } from 'react-icons/ri';
import { FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <div className="flex flex-col mt-20 p-16 pb-8 gap-4 font-thin w-full">
      <div className="grid grid-cols-2 gap-6 md:flex-row md:flex justify-between items-start">
        <div className="flex flex-col gap-2 cursor-pointer">
          <h2 className="text-base tracking-widest font-medium hover:text-primaryYellow">SITEMAP</h2>
          <div className="text-sm">
            <ul>
              <Link href="/"><li className="hover:text-primaryYellow">Home</li></Link>
              <Link href="/short-courses"><li className="hover:text-primaryYellow">Short Courses</li></Link>
              <Link href="/pathways"><li className="hover:text-primaryYellow">Pathways</li></Link>
              <Link href="/micro-learn"><li className="hover:text-primaryYellow">Micro-Learn</li></Link>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 cursor-pointer">
          <h2 className="text-base tracking-widest font-medium hover:text-primaryYellow">DISCOVER</h2>
          <div className="text-sm">
            <ul>
              <Link href="/"><li className="hover:text-primaryYellow">Popular Videos</li></Link>
              <Link href="/"><li className="hover:text-primaryYellow">Top Courses</li></Link>
              <Link href="/"><li className="hover:text-primaryYellow">Most Completed</li></Link>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 cursor-pointer">
          <h2 className="text-base tracking-widest font-medium hover:text-primaryYellow">RESOURCES</h2>
          <div className="text-sm">
            <ul>
              <Link href="/"><li className="hover:text-primaryYellow">Data Policy</li></Link>
              <Link href="/marketplace"><li className="hover:text-primaryYellow">Become A Contributor</li></Link>
              <Link href="/marketplace"><li className="hover:text-primaryYellow">FAQs</li></Link>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 cursor-pointer">
          <h2 className="text-base tracking-widest font-medium hover:text-primaryYellow">CONNECT</h2>

          <div className="flex items-center justify-start gap-6">
            <Link href="https://www.linkedin.com/in/peterokorafor" rel="noopener noreferrer" target="_blank">
              <FaLinkedinIn size={25} />
            </Link>
            <Link href="https://www.instagram.com/peterdtitan/" rel="noopener noreferrer" target="_blank">
              <RiInstagramLine size={25} />
            </Link>
            <Link href="https://twitter.com/PeterDeTitan" rel="noopener noreferrer" target="_blank">
              <RiTwitterLine size={25} />
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center text-xs justify-center">
        <p>© Copyright 2024, MadHouse Inc.</p>
      </div>
    </div>
  );
}
