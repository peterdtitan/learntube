import React from 'react';
import { motion } from 'framer-motion';
import options from '../data/dummy';

function Card({ title, icon }) {
  return (
    <div className="w-[250px]">
      <motion.div
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-md"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          <img
            src={icon}
            alt="web-development"
            className="w-16 h-16 object-contain"
          />

          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </div>
  );
}

export default function About() {
  return (
    <div className="mt-12">
      <div className="mt-32 flex flex-col items-center justify-center">
        <p className="text-red-500 uppercase">Lorem Ipsum</p>

        <motion.p className="mt-4 text-[17px] max-w-[80%] leading-[30px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
          molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
          numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
          optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
          obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
        </motion.p>
      </div>

      <div className="mt-20 flex gap-10 items-center justify-center">
        {options.map((item) => (
          <Card
            key={item.index}
            index={item.index}
            title={item.title}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}
