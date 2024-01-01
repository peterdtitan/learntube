import React from 'react';
import { motion } from 'framer-motion';
import '../app/globals.css';

export default function Hero() {
  return (
    <div>
      <div className="flex flex-col gap-y-12 md:flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-4xl md:text-4xl lg:text-6xl font-bold max-w-[80%] md:max-w-[50%] text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-red-500">
            <p>Learning</p>
            {' '}
            <span className="dark:text-white">redefined with</span>
            {' '}
            LearnTube
            <span>.</span>
          </h1>
          <p className="max-w-[60%] text-xs md:text-base">
            Re-imagine the way you learn. We've collected the most helpful content across YouTube and organized it into learning 
            pathways.
          </p>
          <motion.button type="button"
            whileTap={{ scale: 0.8 }}
            className="w-[50%] md:w-[20%] lg:w-[35%] mt-4 text-xs md:text-base animate-pulse bg-gradient-to-r from-blue-400 via-pink-500 to-red-500 text-white px-4 py-2 rounded-md">
            Start Learning
          </motion.button>
        </div>

        <div className="w-full lg:w-[50%] h-[300px] lg:h-[450px]">
          <img
            alt="Captivating Image"
            className="object-cover w-full h-full lg:transform lg:-skew-x-12"
            height="500"
            src="/vercel.jpg"
            style={{
              aspectRatio: "500/500",
              objectFit: "cover",
            }}
            width="500" 
          />
        </div>

      </div>
      
    </div>
  );
}

{/** TODO: Modify text for light theme in header text */}