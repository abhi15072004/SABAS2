// src/components/Technologies.js
import React from 'react';

const technologies = [
  'Android',
  'Laravel',
  'VueJS',
  'Firebase',
  'Socket.io',
  'Google Maps SDK'
];

const Technologies = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-5xl mx-auto">
        {/* Animated Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12
          bg-clip-text text-transparent
          bg-gradient-to-r from-pink-400 via-purple-500 to-blue-500
          animate-gradient-x
          hover:scale-105 transition-transform duration-500">
          TECHNOLOGIES
        </h2>

        {/* Technology Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 
                         text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg
                         transition-transform transition-shadow duration-300 ease-in-out
                         hover:scale-110 hover:-translate-y-1 hover:shadow-2xl cursor-pointer">
              {tech}
            </span>
          ))}
        </div>

        {/* Brand Image */}
        <div className="flex justify-center items-center">
          <img
            // src="https://babybus.in/images/branffds.png"
            // alt="Technologies & Brands"
            className="max-w-full h-auto rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105 hover:-translate-y-2"
          />
        </div>
      </div>
    </section>
  );
};

export default Technologies;








// 