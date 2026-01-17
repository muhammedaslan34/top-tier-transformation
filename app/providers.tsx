"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/i18n/config";

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  // Handle RTL/LTR direction based on language
  useEffect(() => {
    // Only run on client side after hydration
    if (typeof window === "undefined") return;
    
    const isRTL = i18n.language === "ar";
    const newDir = isRTL ? "rtl" : "ltr";
    const newLang = i18n.language;
    
    // Only update if values have changed to avoid unnecessary re-renders
    if (document.documentElement.dir !== newDir) {
      document.documentElement.dir = newDir;
    }
    if (document.documentElement.lang !== newLang) {
      document.documentElement.lang = newLang;
    }
  }, [i18n.language]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
