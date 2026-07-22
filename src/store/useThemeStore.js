"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

/**
 * useThemeStore
 * Tracks "light" | "dark" theme and persists the choice to localStorage.
 * The actual class application to <html>/<body> happens in layout.js
 * via the ThemeProvider component so we don't hydrate-mismatch.
 */
export const useThemeStore = create(
  persist(
    (set, get) => ({
      theme: "dark", // default matches the existing deep navy/black UI
      toggleTheme: () =>
        set({ theme: get().theme === "dark" ? "light" : "dark" }),
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage", // localStorage key
    }
  )
);
