// src/components/Features.js
import React from 'react';
import { FaCog, FaClock, FaBell, FaMapMarkedAlt, FaShieldAlt, FaMobileAlt } from 'react-icons/fa';

const features = [
  { icon: FaCog, title: 'MVVM Architecture', description: 'Robust and scalable architecture ensuring maintainable code and smooth performance.' },
  { icon: FaClock, title: 'Real Time - No Polling', description: 'Instant updates using WebSockets for live tracking without unnecessary requests.' },
  { icon: FaBell, title: 'Push Notifications', description: 'Timely alerts for bus arrivals, delays, and emergencies via Firebase.' },
  { icon: FaMapMarkedAlt, title: 'Google Maps Integration', description: 'Precise location tracking with Google Maps SDK for accurate routes.' },
  { icon: FaShieldAlt, title: 'Secure Data Handling', description: 'End-to-end encryption and secure authentication for all user data.' },
  { icon: FaMobileAlt, title: 'Cross-Platform Apps', description: 'Seamless experience on Android and web with VueJS and Laravel backend.' }
];

const Features = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 
  bg-clip-text text-transparent 
  bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 
  animate-gradient-x 
  hover:scale-105 transition-transform duration-500">
  FEATURES
</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-gray-800 rounded-lg p-6 text-center shadow-lg 
                         transition-transform transition-shadow duration-500 ease-in-out
                         hover:scale-105 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform duration-500 ease-in-out hover:scale-110 hover:rotate-12">
                <feature.icon className="text-white text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
