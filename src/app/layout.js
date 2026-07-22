// src/app/layout.js
import { Lato } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato", // This must match the CSS variable above
});

export const metadata = {
  title: "Movies Website",
  description: "A high-fidelity movie streaming web app.",
};

export default function RootLayout({ children }) {
  return (
    // suppressHydrationWarning: the "dark"/"light" class is applied client-side
    // by <ThemeApplier /> (see providers.js) once the persisted Zustand theme
    // is read from localStorage, so the very first paint can briefly differ.
    <html lang="en" className={`${lato.variable} dark`} suppressHydrationWarning>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
