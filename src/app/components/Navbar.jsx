"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, X, Menu, Search } from 'lucide-react'; // Added some icons for toggle
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useLogout } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
    const theme = useThemeStore((s) => s.theme);
    const toggleTheme = useThemeStore((s) => s.toggleTheme);
    const { user, isAuthenticated } = useAuthStore();
    const logout = useLogout();
    const pathname = usePathname();

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const link = navLinks.find(l => l.href.includes(hash));
            if (link) setActiveTab(link.name);
        } else if (pathname === '/') {
            setActiveTab('Home');
        }
    }, [pathname]);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
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
                {/* Decorative background layer */}
                <div
                    className="absolute inset-0 rounded-[16px] overflow-hidden pointer-events-none"
                    style={{
                        backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(26, 25, 25, 0.3)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)',
                    }}
                >
                    <div
                        className="absolute inset-0 rounded-[16px]"
                        style={{
                            padding: '0.5px',
                            background: 'linear-gradient(to right, #228EE5, rgba(34, 142, 229, 0.18), rgba(34, 142, 229, 0.14), #228EE5)',
                            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            WebkitMaskComposite: 'destination-out',
                            maskComposite: 'exclude',
                        }}
                    />
                </div>

                {/* Main Content Layer */}
                <div className="relative flex items-center justify-between px-4 md:px-8 py-3">
                    
                    {/* Desktop Logo */}
                    <div className="hidden md:flex items-center gap-2 cursor-pointer">
                        <img
                            src={theme === 'dark' ? '/assets/logo-light.png' : '/assets/logo-dark.png'}
                            style={{ width: 34, height: 34 }}
                            alt="Logo"
                        />
                    </div>

                    {/* Mobile: Hamburger + Search on left */}
                    <div className="flex md:hidden items-center gap-5">
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu" 
                            className="flex items-center justify-center text-[var(--text-primary)] transition-transform active:scale-90"
                        >
                            {isMenuOpen ? <X size={22} strokeWidth={2.2} /> : (
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                                    <line x1="4" y1="6" x2="20" y2="6" />
                                    <line x1="4" y1="12" x2="20" y2="12" />
                                    <line x1="4" y1="18" x2="14" y2="18" />
                                </svg>
                            )}
                        </button>
                        <button aria-label="Search" className="flex items-center justify-center text-[var(--text-primary)]">
                            <Search size={20} strokeWidth={2.2} />
                        </button>
                    </div>

                    {/* Mobile: Logo on Right */}
                    <div className="flex md:hidden items-center">
                        <img
                            src={theme === 'dark' ? '/assets/logo-light.png' : '/assets/logo-dark.png'}
                            style={{ width: 30, height: 30 }}
                            alt="Logo"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8 mr-80">
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
                                {activeTab === link.name && (
                                    <div className="absolute -bottom-[2px] left-0 right-0 h-[2px] bg-blue-500 rounded-full blur-[1.5px] shadow-[0_0_14px_rgba(59,130,246,0.9)]" />
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* Desktop Right Side Icons */}
                    <div className="hidden md:flex items-center gap-6 text-gray-300">
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
                            <span className="absolute top-0 -right-1 w-2.5 h-2.5 bg-rose-500 border-2 border-[#0a0c10] rounded-full"></span>
                        </div>

                        {isAuthenticated ? (
                            <div className="relative group/profile">
                                <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/15 transition-transform group-hover/profile:scale-105">
                                    {user?.avatarUrl ? (
                                        <img src={user.avatarUrl} className="w-full h-full object-cover" alt="User" />
                                    ) : (
                                        <img src="/assets/user.png" className="w-4 h-4 object-contain opacity-90" style={{ filter: 'var(--icon-filter)' }} alt="User" />
                                    )}
                                </button>
                                <div className="absolute right-0 top-3 pt-3 opacity-0 translate-y-1 pointer-events-none transition-all duration-200 group-hover/profile:opacity-100 group-hover/profile:translate-y-0 group-hover/profile:pointer-events-auto">
                                    <button onClick={() => logout.mutate()} className="whitespace-nowrap rounded-full bg-[#E5228E] px-4 py-1.5 text-xs font-semibold text-white shadow-lg hover:bg-[#c91d7c]">
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="relative">
                                <Link href="/login" className="group flex h-8 w-8 items-center justify-center">
                                    <img src="/assets/user.png" className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 brightness-0 invert transition-all" alt="User" />
                                </Link>
                                <div className="absolute right-0 top-2 pt-2">
                                    <Link href="/login" className="whitespace-nowrap rounded-full bg-[#E5228E] px-2 py-0.5 text-[10px] font-semibold text-white shadow-lg hover:bg-[#c91d7c]">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        )}

                        <button onClick={toggleTheme} className="flex items-center justify-center transition-all duration-300 hover:opacity-100 opacity-80 active:scale-90">
                            <img src={theme === 'dark' ? '/assets/sun.png' : '/assets/moon.png'} alt="Toggle Theme" className="h-[20px] w-[20px] object-contain" style={{ filter: 'var(--icon-filter)' }} />
                        </button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 rounded-[16px] overflow-hidden flex flex-col gap-4 z-50 transition-all duration-300"
                        style={{
                            backgroundColor: theme === 'light' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(26, 25, 25, 0.95)',
                            backdropFilter: 'blur(12px)',
                            WebkitBackdropFilter: 'blur(12px)',
                            border: '1px solid rgba(34, 142, 229, 0.3)'
                        }}
                    >
                        <ul className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        onClick={() => { setActiveTab(link.name); setIsMenuOpen(false); }}
                                        className={`text-[16px] font-medium transition-colors ${activeTab === link.name ? "text-blue-500" : "text-[var(--text-primary)]"}`}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="h-[1px] bg-white/10 w-full" />

                        <div className="flex items-center justify-between pt-2">
                            {/* Mobile Auth Button */}
                            {isAuthenticated ? (
                                <button onClick={() => logout.mutate()} className="rounded-full bg-[#E5228E] px-6 py-2 text-sm font-semibold text-white shadow-lg">
                                    Logout
                                </button>
                            ) : (
                                <Link href="/login" className="rounded-full bg-[#E5228E] px-6 py-2 text-sm font-semibold text-white shadow-lg">
                                    Login
                                </Link>
                            )}
                            
                            {/* Mobile Theme Toggle */}
                            <button onClick={toggleTheme} className="p-2 rounded-full bg-white/5 border border-white/10">
                                <img 
                                    src={theme === 'dark' ? '/assets/sun.png' : '/assets/moon.png'} 
                                    alt="Theme" 
                                    className="h-5 w-5"
                                    style={{ filter: 'var(--icon-filter)' }}
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;