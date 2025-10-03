// src/components/Hero.js
import React, { useEffect, useState } from "react";

// Rotating Text Component
const RotatingText = () => {
  const words = ['Students', 'Drivers', 'College'];
  const [currentWord, setCurrentWord] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord(prev => (prev + 1) % words.length);
    }, 1500); // rotate every 1.5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="bg-amber-400 text-white px-4 py-2 text-xl md:text-2xl font-bold rounded-lg shadow-lg inline-block transition-all duration-500 transform hover:scale-105">
      {words[currentWord]}
    </span>
  );
};

const Hero = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto text-center">

        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          <span className="animate-gradient"> BUS ALERT SYSTEM</span>
        </h1>

        {/* Subheading with Rotating Text */}
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto text-center">
          Track your college bus in real-time with{' '}
          <b className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 animate-gradient-x">
            SABAS
          </b> <br/>
          Ensure safety and peace of mind for <RotatingText />
        </p>

        {/* CTA Button */}
        <button className="bg-amber-500 text-gray-900 hover:bg-amber-400 px-8 py-4 rounded-lg text-xl font-semibold transition-colors mb-12">
          START FOR FREE
        </button>

        {/* Dashboard Image */}
        <div className="flex justify-center items-center w-full">
          <img
            src="https://babybus.in/images/screens.png"
            alt="Dashboard Preview"
            className="w-full max-w-3xl rounded-lg shadow-2xl 
                       transition-transform duration-200 ease-in-out 
                       hover:scale-105 hover:-translate-y-2 hover:rotate-1"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
