"use client";

import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useThemeStore } from "@/store/useThemeStore";
import { useSession } from "@/hooks/useAuth";

function ThemeApplier() {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return null;
}

function SessionBootstrap() {
  useSession(); // hydrates useAuthStore from the /api/auth/me cookie check
  return null;
}

export default function Providers({ children }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeApplier />
      <SessionBootstrap />
      {children}
    </QueryClientProvider>
  );
}
