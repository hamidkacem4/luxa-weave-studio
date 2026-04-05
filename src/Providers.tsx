"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

export default function Providers({ children, locale }: { children: React.ReactNode, locale: string }) {
  const [queryClient] = useState(() => new QueryClient());
  
  if (i18n.language !== locale) {
    i18n.changeLanguage(locale);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <TooltipProvider>
          {children}
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </I18nextProvider>
    </QueryClientProvider>
  );
}
