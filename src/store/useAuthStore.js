"use client";

import { create } from "zustand";

/**
 * useAuthStore
 * Holds the current user + isAuthenticated flag. The JWT itself lives in an
 * HTTP-only cookie (set by the API routes) so it never touches this store.
 * Hydrate this store on app load by calling `fetchMe()` (see hooks/useAuth.js).
 */
export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // true until the initial /api/auth/me check resolves

  setUser: (user) =>
    set({ user, isAuthenticated: !!user, isLoading: false }),

  clearUser: () =>
    set({ user: null, isAuthenticated: false, isLoading: false }),

  setLoading: (isLoading) => set({ isLoading }),
}));
