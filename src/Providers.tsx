"use client";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { createI18nInstance } from "./i18n";
import { normalizeLocale } from "@/lib/locale";

export default function Providers({ children, locale }: { children: React.ReactNode, locale: string }) {
  const [queryClient] = useState(() => new QueryClient());
  const i18n = useMemo(() => createI18nInstance(normalizeLocale(locale)), [locale]);

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
