"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useLogout } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const theme = useThemeStore((s) => s.theme);
    const toggleTheme = useThemeStore((s) => s.toggleTheme);
    const { user, isAuthenticated } = useAuthStore();
    const logout = useLogout();
    const pathname=usePathname()

    useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
        const link = navLinks.find(l => l.href.includes(hash));
        if (link) setActiveTab(link.name);
    } else if (pathname === '/') {
        setActiveTab('Home');
    }
}, [pathname]);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Movies', href: '/#movies' },
        { name: 'Series', href: '/#series' },
        { name: 'Collection', href: '/#collections' },
        { name: 'FAQ', href: '#faqs' },
    ];

    return (
        <nav className="navbar-container fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
  <div className="relative rounded-[16px] shadow-2xl">
    {/*
      Decorative background layer only — this is where the blur, fill color,
      and pseudo-border live. It's the one that needs overflow-hidden (to
      keep the border-gradient mask contained to the rounded corners), and
      it has no interactive content, so nothing here can get clipped.
    */}
    <div
      className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none"
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
        className="absolute inset-0 rounded-[16px]"
        style={{
          padding: '0.5px', // Exact border width
          background: 'linear-gradient(to right, #228EE5, rgba(34, 142, 229, 0.18), rgba(34, 142, 229, 0.14), #228EE5)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
        }}
      />
    </div>

    {/*
      Content layer — deliberately has NO overflow-hidden, so things like the
      Login/Logout capsule that pop out below the profile icon aren't clipped
      and stay clickable.
    */}
    <div className="relative flex items-center justify-between px-8 py-3">

                {/* Left Side: Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <div className="relative flex items-center justify-center">
                       
                            <img
                                src={theme === 'dark' ? '/assets/logo-light.png' : '/assets/logo-dark.png'}
                                style={{ width: 34, height: 34 }}
                            />
                    </div>
                </div>

                {/* Center: Navigation Links */}
                <ul className="flex items-center gap-8 mr-80">
                    {navLinks.map((link) => (
                        <li key={link.name} className="relative group">
                            <Link
                                href={link.href}
                                onClick={() => setActiveTab(link.name)}
                                className={`text-[15px] font-medium transition-colors duration-300 pb-1 ${activeTab === link.name ? "text-[var(--text-primary)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
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
                                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                                style={{ filter: 'var(--icon-filter)' }}
                        />
                    </button>

                    <div className="relative cursor-pointer hover:text-white transition-colors">
                        <Bell size={20} strokeWidth={2.5} />
                        {/* Notification Dot */}
                        <span className="absolute top-0 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-[#0a0c10] rounded-full"></span>
                    </div>

                    {isAuthenticated ? (
                        <div className="relative group/profile">
                            <button
                                className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/15 transition-transform group-hover/profile:scale-105"
                                title={user?.username || user?.name || "Account"}
                            >
                                {console.log(user)}
                                {user?.avatarUrl ? (
                                        <img
                                            src={user.avatarUrl}
                                            className="w-full h-full object-cover opacity-100"
                                            alt="User"
                                        />
                                    ) : (
                                        <img
                                            src="/assets/user.png"
                                            className="w-4 h-4 object-contain opacity-90"
                                            style={{ filter: 'var(--icon-filter)' }}
                                            alt="User"
                                        />
                                    )}
                            </button>

                            {/* Logout capsule — appears below the avatar on hover */}
                            <div className="absolute right-0 top-3 pt-3 opacity-0 translate-y-1 pointer-events-none transition-all duration-200 group-hover/profile:opacity-100 group-hover/profile:translate-y-0 group-hover/profile:pointer-events-auto">
                                <button
                                    onClick={() => logout.mutate()}
                                    className="whitespace-nowrap rounded-full bg-[#E5228E] px-4 py-1.5 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-[#c91d7c]"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative">
                            <button className="group flex h-8 w-8 items-center justify-center" aria-label="Account">
                                <img
                                    src="/assets/user.png"
                                    className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 brightness-0 invert transition-all"
                                    alt="User"
                                />
                            </button>

                            {/* Login capsule — always visible below the profile icon */}
                            <div className="absolute right-0 top-2 pt-2">
                                <Link
                                    href="/login"
                                    className="whitespace-nowrap rounded-full bg-[#E5228E] px-1 py-0.5 text-[9px] font-semibold text-white shadow-lg transition-colors hover:bg-[#c91d7c]"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>
                    )}

                    <button
                        onClick={toggleTheme}
                        aria-label="Toggle Theme"
                        className="flex items-center justify-center transition-all duration-300 hover:opacity-100 opacity-80 active:scale-90"
                    >
                            <img
                                src={theme === 'dark' ? '/assets/sun.png' : '/assets/moon.png'}
                                alt="Toggle Theme"
                                className="h-[20px] w-[20px] object-contain"
                                style={{ filter: 'var(--icon-filter)' }}
                            />
                    </button>
                </div>
            </div>
            </div>
        </nav>
    );
};

export default Navbar;