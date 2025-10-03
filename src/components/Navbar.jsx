// src/components/Navbar.js
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo with image link */}
          <div className="flex items-center">
            <img 
    src="https://i.postimg.cc/Hj5Yb4Xs/abhi1.jpg"
    alt="Abvhis" 
    className="h-30 w-16 mr-2 object-contain rounded-full" 
  />
  <span className="text-white font-bold text-2xl">Bus Alert</span>
            <span className="text-white font-bold text-xl"></span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#parent" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                PARENT APP
              </a>
              <a href="#driver" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                DRIVER APP
              </a>
              <a href="#admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                SCHOOL ADMIN
              </a>
            </div>
          </div>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium border border-gray-600 transition-colors ${
                  isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`
              }
            >
              LOGIN
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive ? 'bg-amber-400 text-gray-900' : 'bg-amber-500 text-gray-900 hover:bg-amber-400'
                }`
              }
            >
              REGISTER
            </NavLink>
          </div>

          {/* Mobile menu button - placeholder */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
