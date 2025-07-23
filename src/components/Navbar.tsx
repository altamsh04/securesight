"use client";

import React, { useState } from 'react';
import { Menu, X, ChevronDown, Users, AlertTriangle, Clapperboard, Camera, LayoutDashboard } from 'lucide-react';

// Placeholder logo SVG
const LogoIcon = () => (
  <img src="/logo.png" alt="Logo" className="w-10 h-10" />
);

const navItems = [
  {
    name: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    active: true,
  },
  {
    name: 'Cameras',
    icon: <Camera className="w-5 h-5" />,
    active: false,
  },
  {
    name: 'Scenes',
    icon: <Clapperboard className="w-5 h-5" />,
    active: false,
  },
  {
    name: 'Incidents',
    icon: <AlertTriangle className="w-5 h-5" />,
    active: false,
  },
  {
    name: 'Users',
    icon: <Users className="w-5 h-5" />,
    active: false,
  },
];

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className="w-full bg-gradient-to-r from-black via-zinc-900 to-black text-white font-sans shadow z-50"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center flex-shrink-0 gap-2">
            <LogoIcon />
            <span className="font-bold text-lg tracking-wide select-none">MANDLACX</span>
          </div>

          {/* Center: Nav Items (hidden on mobile) */}
          <div className="hidden md:flex flex-1 justify-center items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black text-sm font-medium ${
                  item.active
                    ? 'text-yellow-400 bg-zinc-900'
                    : 'text-zinc-200 hover:text-yellow-400 hover:bg-zinc-800'
                }`}
                aria-current={item.active ? 'page' : undefined}
                tabIndex={0}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
          </div>

          {/* Right: User Info (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-3 ml-4">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="User avatar"
              className="w-10 h-10 rounded-full border-2 border-zinc-700 object-cover"
            />
            <div className="flex flex-col items-start">
              <span className="font-semibold text-sm leading-tight">Mohammed Ajhas</span>
              <span className="text-xs text-zinc-400 leading-tight">ajhas@mandlac.com</span>
            </div>
            <button
              aria-label="Open user menu"
              className="ml-1 p-1 rounded hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
            >
              <ChevronDown className="w-5 h-5 text-zinc-400" />
            </button>
          </div>

          {/* Mobile: Hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gradient-to-r from-black via-zinc-900 to-black border-t border-zinc-800 px-4 pb-4 pt-2 animate-fade-in-down">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href="#"
                className={`flex items-center gap-2 px-3 py-2 rounded transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500 text-sm font-medium ${
                  item.active
                    ? 'text-yellow-400 bg-zinc-900'
                    : 'text-zinc-200 hover:text-yellow-400 hover:bg-zinc-800'
                }`}
                aria-current={item.active ? 'page' : undefined}
                tabIndex={0}
              >
                {item.icon}
                {item.name}
              </a>
            ))}
            <div className="flex items-center gap-3 mt-4 border-t border-zinc-800 pt-3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="User avatar"
                className="w-10 h-10 rounded-full border-2 border-zinc-700 object-cover"
              />
              <div className="flex flex-col items-start">
                <span className="font-semibold text-sm leading-tight">Mohammed Ajhas</span>
                <span className="text-xs text-zinc-400 leading-tight">ajhas@mandlac.com</span>
              </div>
              <button
                aria-label="Open user menu"
                className="ml-1 p-1 rounded hover:bg-zinc-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-500"
              >
                <ChevronDown className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// Bottom Camera Bar
export const CameraBar = () => (
  <div className="fixed bottom-0 left-0 w-full bg-zinc-950 border-t border-zinc-800 flex items-center justify-center py-2 z-50">
    <a
      href="/camera"
      className="flex items-center gap-2 px-4 py-2 rounded text-white hover:text-yellow-400 hover:bg-zinc-900 transition-colors duration-200 font-medium text-base"
      aria-current={typeof window !== 'undefined' && window.location.pathname === '/camera' ? 'page' : undefined}
    >
      <Camera className="w-5 h-5" />
      Camera
    </a>
  </div>
); 