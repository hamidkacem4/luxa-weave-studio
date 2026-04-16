"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "langSuggestion";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;
const ANIMATION_MS = 200;

type SupportedLocale = "fr" | "it" | "ko";

const legacySuggestions: Record<SupportedLocale, { 
  flag: string; 
  message: string; 
  cta: string;
}> = {
  fr: { flag: "🇫🇷", message: "Voir la version française ?",   cta: "Aller" },
  it: { flag: "🇮🇹", message: "Visualizzare la versione italiana ?", cta: "Vai" },
  ko: { flag: "🇰🇷", message: "한국어 사이트로 이동하시겠습니까 ?",   cta: "이동" },
};

const suggestions: Record<SupportedLocale, { message: string; cta: string }> = {
  fr: {
    message: "\uD83C\uDDEB\uD83C\uDDF7 Voir la version fran\u00e7aise ?",
    cta: "Aller",
  },
  it: {
    message: "\uD83C\uDDEE\uD83C\uDDF9 Visualizzare la versione italiana?",
    cta: "Vai",
  },
  ko: {
    message:
      "\uD83C\uDDF0\uD83C\uDDF7 \uD55C\uAD6D\uC5B4 \uC0AC\uC774\uD2B8\uB85C \uC774\uB3D9\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?",
    cta: "\uC774\uB3D9",
  },
};

function isLocalePath(pathname: string, locale: SupportedLocale) {
  return new RegExp(`^/${locale}(?:/|$)`).test(pathname);
}

function normalizeSuggestedPath(pathname: string) {
  const cleanedPath = pathname.replace(/^\/(?:en|fr|it|ko)(?=\/|$)/, "") || "/";
  return cleanedPath === "/" ? "" : cleanedPath.replace(/\/+$/, "");
}

export default function LanguageSuggestionBar() {
  const pathname = usePathname();
  const [suggestion, setSuggestion] = useState<SupportedLocale | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !pathname) {
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const { timestamp } = JSON.parse(stored) as { timestamp?: number };
        if (typeof timestamp === "number" && Date.now() - timestamp < SEVEN_DAYS_MS) {
          return;
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    const browserLang = navigator.language.split("-")[0].toLowerCase();
    if (!["fr", "it", "ko"].includes(browserLang)) {
      return;
    }

    const targetLang = browserLang as SupportedLocale;
    if (isLocalePath(pathname, targetLang)) {
      return;
    }

    setSuggestion(targetLang);
    const timer = window.setTimeout(() => setIsVisible(true), 50);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const targetPath = useMemo(() => {
    if (!suggestion || !pathname) {
      return "/";
    }

    return `/${suggestion}${normalizeSuggestedPath(pathname)}`;
  }, [pathname, suggestion]);

  const dismiss = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ timestamp: Date.now() }));
      window.setTimeout(() => setSuggestion(null), ANIMATION_MS);
    }
    setIsVisible(false);
  };

  const handleAccept = () => {
    if (typeof window === "undefined") {
      return;
    }

    dismiss();
    window.location.assign(`${targetPath}${window.location.search}${window.location.hash}`);
  };

  if (!suggestion) {
    return null;
  }

  return (
    <div
      className={`fixed inset-x-0 top-0 z-[100] w-full border-b border-gold/10 bg-charcoal/95 text-white shadow-xl backdrop-blur-md transition-all duration-200 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      }`}
      aria-live="polite"
    >
      <div className="container flex min-h-12 items-center justify-between gap-3 px-4 py-2">
        <p className="text-xs font-medium tracking-wide sm:text-sm">{suggestions[suggestion].message}</p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-charcoal transition-colors hover:bg-gold-dark sm:text-xs"
            aria-label={`Go to the ${suggestion} version`}
          >
            {suggestions[suggestion].cta}
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close language suggestion"
          >
            <span aria-hidden="true" className="text-base leading-none">
              x
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
