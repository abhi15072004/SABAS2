// src/components/Navbar.js
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://i.postimg.cc/Hj5Yb4Xs/abhi1.jpg"
              alt="Abvhis" 
              className="h-12 w-12 mr-2 object-contain rounded-full" 
            />
            <span className="text-white font-bold text-2xl">Bus Alert</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#parent" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              PARENT APP
            </a>
            <a href="#driver" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              DRIVER APP
            </a>
            <a href="#admin" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              SCHOOL ADMIN
            </a>
          </div>

          {/* Desktop Buttons */}
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

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (toggle) */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-4 pt-2 pb-3 space-y-2">
          <a href="#parent" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            PARENT APP
          </a>
          <a href="#driver" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            DRIVER APP
          </a>
          <a href="#admin" className="block text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            SCHOOL ADMIN
          </a>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-sm font-medium border border-gray-600 transition-colors ${
                isActive ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
          >
            LOGIN
          </NavLink>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive ? 'bg-amber-400 text-gray-900' : 'bg-amber-500 text-gray-900 hover:bg-amber-400'
              }`
            }
          >
            REGISTER
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
