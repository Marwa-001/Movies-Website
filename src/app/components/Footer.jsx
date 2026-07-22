"use client";

const footerLinks = [
  { label: "Get the OMO App", href: "#" },
  { label: "Help", href: "#" },
  { label: "Site Index", href: "#" },
  { label: "OMO Pro", href: "#" },
  { label: "Advertising", href: "#" },
  { label: "OMO Developer", href: "#" },
  { label: "Jobs", href: "#" },
  { label: "Privacy Policy", href: "#" },
];

// Minimal inline glyphs so we don't depend on brand icons that lucide-react
// no longer ships (Facebook/Instagram/LinkedIn/YouTube/Telegram).
const socialIcons = [
  {
    label: "Facebook",
    path: "M13.5 21v-7.5H16l.5-3H13.5V8.5c0-.9.25-1.5 1.55-1.5H16.5V4.3c-.28-.04-1.24-.12-2.36-.12-2.33 0-3.93 1.42-3.93 4.03V10.5H8v3h2.21V21h3.29Z",
  },
  {
    label: "Instagram",
    path: "M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Zm0 6.27a2.47 2.47 0 1 1 0-4.94 2.47 2.47 0 0 1 0 4.94ZM17.7 3H6.3A3.3 3.3 0 0 0 3 6.3v11.4A3.3 3.3 0 0 0 6.3 21h11.4a3.3 3.3 0 0 0 3.3-3.3V6.3A3.3 3.3 0 0 0 17.7 3Zm2 14.7a2 2 0 0 1-2 2H6.3a2 2 0 0 1-2-2V6.3a2 2 0 0 1 2-2h11.4a2 2 0 0 1 2 2ZM16.9 6.5a.9.9 0 1 0 0 1.8.9.9 0 0 0 0-1.8Z",
  },
  {
    label: "LinkedIn",
    path: "M6.94 8.5H4V20h2.94V8.5ZM5.47 4A1.7 1.7 0 1 0 5.5 7.4 1.7 1.7 0 0 0 5.47 4ZM20 13.3c0-3-1.6-4.4-3.74-4.4a3.23 3.23 0 0 0-2.93 1.6V8.5H10.4c.04.85 0 11.5 0 11.5h2.93v-6.4c0-.35.02-.7.13-.95.28-.7.9-1.42 1.96-1.42 1.38 0 1.94 1.06 1.94 2.6V20H20v-6.7Z",
  },
  {
    label: "YouTube",
    path: "M21.6 7.6a2.8 2.8 0 0 0-2-2C17.9 5 12 5 12 5s-5.9 0-7.6.6a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.4 2.8 2.8 0 0 0 2 2C6.1 19 12 19 12 19s5.9 0 7.6-.6a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.4ZM10 15.2V8.8l5.5 3.2Z",
  },
  {
    label: "Telegram",
    path: "M21.6 4.6 2.9 11.9c-1.1.4-1.1 1 .1 1.3l4.8 1.5 1.9 5.7c.2.6.5.8.9.8.4 0 .6-.2.9-.5l2.3-2.3 4.6 3.4c.8.5 1.4.2 1.6-.8l3-14.1c.3-1.3-.4-1.8-1.4-1.3ZM8.6 14.3l9.4-6c.4-.3.8-.1.5.3l-8 7.4-.3 3-1.5-4.7Z",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-24 py-12 px-12 lg:px-24">
      <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/50">
        {footerLinks.map((link) => (
          <a key={link.label} href={link.href} className="hover:text-white transition-colors">
            {link.label}
          </a>
        ))}
      </nav>

      <div className="mt-8 flex items-center justify-center gap-5">
        {socialIcons.map((icon) => (
          <a
            key={icon.label}
            href="#"
            aria-label={icon.label}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d={icon.path} />
            </svg>
          </a>
        ))}
      </div>
    </footer>
  );
}
