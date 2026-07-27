"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { Bell, X } from 'lucide-react';
import { useThemeStore } from '@/store/useThemeStore';
import { useAuthStore } from '@/store/useAuthStore';
import { useLogout } from '@/hooks/useAuth';
import { usePathname } from 'next/navigation';

const navLinks = [
    { name: 'Home', href: '/', sectionId: null }, // no section — top of page
    { name: 'Pricing', href: '#pricing', sectionId: 'pricing' },
    { name: 'Movies', href: '/#movies', sectionId: 'movies' },
    { name: 'Series', href: '/#series', sectionId: 'series' },
    { name: 'Collection', href: '/#collections', sectionId: 'collections' },
    { name: 'FAQ', href: '#faqs', sectionId: 'faqs' },
];

const Navbar = ({onSeeMore}) => {
    const [activeTab, setActiveTab] = useState('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state
    const theme = useThemeStore((s) => s.theme);
    const toggleTheme = useThemeStore((s) => s.toggleTheme);
    const { user, isAuthenticated } = useAuthStore();
    const logout = useLogout();
    const pathname = usePathname();

    // Guards against the scroll-spy observer fighting with a manual click
    // for a brief moment while the smooth-scroll animation is still running.
    const manualOverrideRef = useRef(null);

    // --- SCROLL-SPY: watches each section and updates the active tab as the
    // user scrolls, without needing a click. Only runs on the home page,
    // since that's the only page where these section ids exist.
    useEffect(() => {
        if (pathname !== '/') return;

        const sectionEntries = navLinks.filter((l) => l.sectionId);
        const observers = [];

        // Tracks how visible each section currently is so we can pick the
        // one with the most visibility on screen at any given time.
        const visibility = {};

        const handleIntersect = (name) => (entries) => {
            entries.forEach((entry) => {
                visibility[name] = entry.intersectionRatio;
            });

            // If the user just clicked a link, don't let the observer
            // override that choice until the scroll settles.
            if (manualOverrideRef.current) return;

            // Special-case: if we're scrolled near the very top of the
            // page, force "Home" regardless of section visibility.
            if (window.scrollY < 120) {
                setActiveTab('Home');
                return;
            }

            const mostVisible = Object.entries(visibility)
                .filter(([, ratio]) => ratio > 0)
                .sort((a, b) => b[1] - a[1])[0];

            if (mostVisible) {
                const match = sectionEntries.find((l) => l.sectionId === mostVisible[0]);
                if (match) setActiveTab(match.name);
            }
        };

        sectionEntries.forEach(({ sectionId, name }) => {
            const el = document.getElementById(sectionId);
            if (!el) return;
            const observer = new IntersectionObserver(handleIntersect(sectionId), {
                threshold: [0, 0.25, 0.5, 0.75, 1],
                rootMargin: '-88px 0px -50% 0px', // account for fixed navbar height
            });
            observer.observe(el);
            observers.push(observer);
        });

        const handleScroll = () => {
            if (manualOverrideRef.current) return;
            if (window.scrollY < 120) setActiveTab('Home');
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            observers.forEach((o) => o.disconnect());
            window.removeEventListener('scroll', handleScroll);
        };
    }, [pathname]);

    // Handles the hash on first load (e.g. landing directly on /#movies)
    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const link = navLinks.find((l) => l.href.includes(hash));
            if (link) setActiveTab(link.name);
        } else if (pathname === '/') {
            setActiveTab('Home');
        }
    }, [pathname]);

    // Close mobile menu whenever the route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const handleNavClick = useCallback((name) => {
        setActiveTab(name);
        setIsMenuOpen(false); // always close on mobile, no-op on desktop

        // Briefly suppress the scroll-spy so the click's target tab stays
        // highlighted while the smooth-scroll to that section plays out.
        manualOverrideRef.current = name;
        window.clearTimeout(manualOverrideRef.current?._t);
        const timeoutId = setTimeout(() => {
            manualOverrideRef.current = null;
        }, 900);
        manualOverrideRef.current = { name, _t: timeoutId };
    }, []);

    const searchIconSrc = theme === 'dark' ? '/assets/magnifying-glass.png' : '/assets/magnifying-glass-dark.png';
    const bellIconSrc = theme === 'dark' ? '/assets/bell.png' : '/assets/bell-dark.png';
    const userIconSrc = theme === 'dark' ? '/assets/user.png' : '/assets/user-dark.png';
    const logoSrc = theme === 'dark' ? '/assets/logo-light.png' : '/assets/logo-dark.png';
    const themeToggleIconSrc = theme === 'dark' ? '/assets/sun.png' : '/assets/moon.png';

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
                        <img src={logoSrc} style={{ width: 34, height: 34 }} alt="Logo" />
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
                        <button aria-label="Search" className="flex items-center justify-center">
                            <img src={searchIconSrc} onClick={onSeeMore} alt="Search" className="w-5 h-5 object-contain" />
                        </button>
                    </div>

                    {/* Mobile: Logo on Right */}
                    <div className="flex md:hidden items-center">
                        <img src={logoSrc} style={{ width: 30, height: 30 }} alt="Logo" />
                    </div>

                    {/* Desktop Navigation */}
                    <ul className="hidden md:flex items-center gap-8 mr-80">
                        {navLinks.map((link) => (
                            <li key={link.name} className="relative group">
                                <Link
                                    href={link.href}
                                    onClick={() => handleNavClick(link.name)}
                                    style={{
                                        color: activeTab === link.name
                                            ? (theme === 'light' ? '#091E51' : '#FFFFFF')
                                            : (theme === 'light' ? '#091E51' : '#9ca3af')
                                    }}
                                    className="text-[15px] font-medium transition-colors duration-300 pb-1 hover:opacity-80"
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
                    <div className="hidden md:flex items-center gap-6">
                        <button className="group flex items-center justify-center transition-all duration-300">
                            <img
                                src={searchIconSrc}
                                onClick={onSeeMore}
                                alt="Search"
                                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                        </button>

                        <div
                            className="relative cursor-pointer transition-colors"
                            // style={{ color: theme === 'light' ? '#091E51' : '#d1d5db' }}
                        >
                            <img
                                src={bellIconSrc}
                                alt="Search"
                                className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                            />
                        </div>

                        {isAuthenticated ? (
                            <div className="relative group/profile">
                                <button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/15 transition-transform group-hover/profile:scale-105">
                                    {user?.avatarUrl ? (
                                        <img src={user.avatarUrl} className="w-full h-full object-cover" alt="User" />
                                    ) : (
                                        <img src={userIconSrc} className="w-4 h-4 object-contain opacity-90" alt="User" />
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
                                    <img src={userIconSrc} className="w-5 h-5 object-contain opacity-70 group-hover:opacity-100 transition-all" alt="User" />
                                </Link>
                                <div className="absolute right-0 top-2 pt-2">
                                    <Link href="/login" className="whitespace-nowrap rounded-full bg-[#E5228E] px-1 py-0.5 text-[9px] font-semibold text-white shadow-lg hover:bg-[#c91d7c]">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        )}

                        <button onClick={toggleTheme} className="flex items-center justify-center transition-all duration-300 hover:opacity-100 opacity-80 active:scale-90">
                            <img src={themeToggleIconSrc} alt="Toggle Theme" className="h-[20px] w-[20px] object-contain" />
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
                                        onClick={() => handleNavClick(link.name)}
                                        style={{
                                            color: activeTab === link.name
                                                ? '#228EE5'
                                                : (theme === 'light' ? '#091E51' : '#FFFFFF')
                                        }}
                                        className="text-[16px] font-medium transition-colors"
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
                                <button onClick={() => { logout.mutate(); setIsMenuOpen(false); }} className="rounded-full bg-[#E5228E] px-6 py-2 text-sm font-semibold text-white shadow-lg">
                                    Logout
                                </button>
                            ) : (
                                <Link href="/login" onClick={() => setIsMenuOpen(false)} className="rounded-full bg-[#E5228E] px-6 py-2 text-sm font-semibold text-white shadow-lg">
                                    Login
                                </Link>
                            )}

                            {/* Mobile Theme Toggle */}
                            <button onClick={toggleTheme} className="p-2 rounded-full bg-white/5 border border-white/10">
                                <img
                                    src={themeToggleIconSrc}
                                    alt="Theme"
                                    className="h-5 w-5"
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