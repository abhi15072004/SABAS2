// src/components/Footer.js
import React from 'react';
import { FaFacebook, FaLinkedin, FaTwitter, FaEnvelope, FaPhone, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Column 1: Contact */}
          <div className="bg-gray-800 p-6 rounded-xl transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Contact Us</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li className="flex items-start">
                <FaEnvelope className="mt-1 mr-3 text-amber-500" />
                Guru Marudhar Kesari Building, Jyothi Nagar, Thoraipakkam, Chennai - 600097
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-3 text-amber-500" />
                +91 9176333850
              </li>
              <li>
                Website: <a href="https://www.mnmjec.ac.in" className="hover:text-amber-500 transition-colors">https://www.mnmjec.ac.in</a>
              </li>
            </ul>
          </div>

          {/* Column 2: Privacy & Terms */}
          <div className="bg-gray-800 p-6 rounded-xl transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Privacy & Terms</h3>
            <ul className="space-y-4 text-gray-300 text-sm">
              <li><a href="#" className="hover:text-amber-500 transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 3: Social Media */}
          <div className="bg-gray-800 p-6 rounded-xl transition-transform duration-500 hover:scale-105 hover:shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-6">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="https://www.facebook.com/nikunj.kumar.124787?mibextid=ZbWKwL" className="transition-transform transform hover:scale-125 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500">
                <FaFacebook size={28} />
              </a>
              <a href="https://www.linkedin.com/in/padmaraju-kishore-kumar-raju-929921288" className="transition-transform transform hover:scale-125 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500">
                <FaLinkedin size={28} />
              </a>
              <a href="https://x.com/NikunjKuma89756?t=FlluTfklzwBM781PSJ5slQ&s=09" className="transition-transform transform hover:scale-125 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500">
                <FaTwitter size={28} />
              </a>
              <a href="https://github.com/nik1062" className="transition-transform transform hover:scale-125 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500">
                <FaGithub size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Developer Credit */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between text-gray-400 text-sm">
          
          {/* Left: Copyright */}
          <span>&copy; 2025 SABAS TEAM All rights reserved.</span>

          {/* Right: Developer Credit */}
          <span className="mt-2 md:mt-0 text-white font-semibold hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-2">
            Developed by 
            <span className="bg-amber-500 text-gray-900 px-2 py-1 rounded-full hover:animate-pulse">Love with "SABAS TEAM"</span>
            <svg className="w-4 h-4 animate-bounce text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 3v12m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
