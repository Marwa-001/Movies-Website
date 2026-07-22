"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useLogout } from '@/hooks/useAuth';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const theme = useThemeStore((s) => s.theme);
    const toggleTheme = useThemeStore((s) => s.toggleTheme);
    const { user, isAuthenticated } = useAuthStore();
    const logout = useLogout();

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Movies', href: '/movies' },
        { name: 'Series', href: '/series' },
        { name: 'Collection', href: '/collection' },
        { name: 'FAQ', href: '/faq' },
    ];

    return (
        <nav className="navbar-container fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
  <div
    className="relative flex items-center justify-between px-8 py-3 rounded-[16px] overflow-hidden shadow-2xl"
    style={{
      // Exact background from Figma: #1A1919 at 30%
      backgroundColor: 'rgba(26, 25, 25, 0.3)', 
      backdropFilter: 'blur(8px)', // Exact blur from Figma
      WebkitBackdropFilter: 'blur(8px)',
    }}
  >
    {/* 
      This pseudo-border ensures the blue stays ONLY on the edges.
      It uses the exact 0.5px width and gradient stops from your screenshot.
    */}
    <div 
      className="absolute inset-0 rounded-[16px] pointer-events-none"
      style={{
        padding: '0.5px', // Exact border width
        background: 'linear-gradient(to right, #228EE5, rgba(34, 142, 229, 0.18), rgba(34, 142, 229, 0.14), #228EE5)',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'destination-out',
        maskComposite: 'exclude',
      }}
    />

                {/* Left Side: Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="relative flex items-center justify-center">
                        {/* Custom SVG Logo based on image */}
                        {/* <svg width="34" height="34" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 10C5 7.23858 7.23858 5 10 5H30C32.7614 5 35 7.23858 35 10V30C35 32.7614 32.7614 35 30 35H10C7.23858 35 5 32.7614 5 30V10Z" fill="white" fillOpacity="0.1" />
                            <path d="M10 5L30 35M5 22.5H35M17.5 5V35" stroke="white" strokeWidth="1.5" strokeOpacity="0.2" />
                            <path d="M8 12L14 8M16 12L22 8M24 12L30 8" stroke="white" strokeWidth="2" />
                            <circle cx="25" cy="25" r="5" stroke="white" strokeWidth="2.5" />
                            <path d="M25 22V28M22 25H28" stroke="white" strokeWidth="1.5" />
                        </svg> */}
                        <img src="/assets/logo-light.png" style={{ width: 34, height: 34 }} />
                    </div>
                </div>

                {/* Center: Navigation Links */}
                <ul className="flex items-center gap-8 mr-80">
                    {navLinks.map((link) => (
                        <li key={link.name} className="relative group">
                            <Link
                                href={link.href}
                                onClick={() => setActiveTab(link.name)}
                                className={`text-[15px] font-medium transition-colors duration-300 ${activeTab === link.name ? 'text-white' : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>

                            {/* Active Indicator (The blue glow line) */}
                            {activeTab === link.name && (
                                <div className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-blue-500 rounded-full blur-[1.5px] shadow-[0_0_14px_rgba(59,130,246,0.9)]" />
                            )}
                        </li>
                    ))}
                </ul>

                {/* Right Side: Icons */}
                <div className="flex items-center gap-6 text-gray-300">
                    <button className="group flex items-center justify-center transition-all duration-300">
                        <img
                            src="/assets/magnifying-glass.png"
                            alt="Search"
                            className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 brightness-0 invert transition-opacity"
                        />
                    </button>

                    <div className="relative cursor-pointer hover:text-white transition-colors">
                        <Bell size={20} strokeWidth={2.5} />
                        {/* Notification Dot */}
                        <span className="absolute top-0 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-[#0a0c10] rounded-full"></span>
                    </div>

                    {isAuthenticated ? (
                        <button
                            className="group flex items-center justify-center"
                            onClick={() => logout.mutate()}
                            title={user?.name ? `Log out (${user.name})` : "Log out"}
                        >
                            <img
                                src="/assets/user.png"
                                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 brightness-0 invert transition-all"
                                alt="User"
                            />
                        </button>
                    ) : (
                        <Link href="/login" className="group flex items-center justify-center">
                            <img
                                src="/assets/user.png"
                                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 brightness-0 invert transition-all"
                                alt="User"
                            />
                        </Link>
                    )}

                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        className="flex items-center justify-center transition-all duration-300 hover:opacity-100 opacity-80 active:scale-90"
                    >
                        <img
                            src={theme === 'dark' ? '/assets/sun.png' : '/assets/moon.png'}
                            alt="Toggle Theme"
                            className="h-[20px] w-[20px] object-contain brightness-0 invert"
                            onError={(e) => { e.currentTarget.src = '/assets/sun.png'; }}
                        />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;