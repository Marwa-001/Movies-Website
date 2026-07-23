"use client";

import React from "react";

const footerLinksRow1 = [
  { label: "Get the Omni App", href: "#" },
  { label: "Help", href: "#" },
  { label: "Site Index", href: "#" },
  { label: "Omni Pro", href: "#" },
  { label: "Advertising", href: "#" },
];

const footerLinksRow2 = [
  { label: "Omni Developer", href: "#" },
  { label: "Jobs", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

const socialIcons = [
  {
    label: "Facebook",
    path: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1V12h3l-.5 3H13v6.8c4.56-.93 8-4.96 8-9.8z",
  },
  {
    label: "Instagram",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "LinkedIn",
    path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  },
  {
    label: "YouTube",
    path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z",
  },
  {
    label: "Telegram",
    path: "M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.891 7.007l-2.012 9.491c-.153.676-.554.843-1.12.523l-3.059-2.254-1.475 1.42c-.163.163-.3.299-.614.299l.219-3.11 5.66-5.114c.246-.219-.054-.341-.381-.123l-6.995 4.403-3.014-.943c-.655-.205-.667-.655.137-.968l11.771-4.535c.544-.199 1.02.127.883.89z",
  },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-[var(--bg-page)] pt-20 pb-16 px-6 font-sans overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,_#1e293b_0%,_transparent_70%)] opacity-40 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center">
        {/* Navigation Links - Row 1 */}
        <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-5">
          {footerLinksRow1.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center gap-1.5 text-[15px] font-medium text-[var(--text-primary)] hover:text-blue-400 transition-colors"
            >
              {link.label}
              <ChevronRightIcon />
            </a>
          ))}
        </nav>

        {/* Navigation Links - Row 2 */}
        <nav className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12">
          {footerLinksRow2.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="group flex items-center gap-1.5 text-[15px] font-medium text-[var(--text-primary)] hover:text-blue-400 transition-colors"
            >
              {link.label}
              <ChevronRightIcon />
            </a>
          ))}
        </nav>

        
        {/* Social Icons */}
        <div className="flex items-center justify-center gap-8">
          {socialIcons.map((icon) => (
            <a
              key={icon.label}
              href="#"
              aria-label={icon.label}
              className="text-[var(--text-primary)] hover:text-sky-400 transition-all duration-200 transform hover:scale-110"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d={icon.path} />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function ChevronRightIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-[var(--text-primary)]/40 group-hover:text-blue-400"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}