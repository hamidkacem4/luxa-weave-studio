"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  Facebook,
  Linkedin,
  Phone,
  Mail,
  Globe,
  ChevronDown,
  Menu, // Import Menu icon for hamburger
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { normalizeLocale } from "@/lib/locale";
import { t as translate } from "@/lib/i18n-utils";
import { localizedPath } from "@/lib/seo";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];
const LOCALE_SCROLL_KEY = "magtexco:locale-switch-scroll-y";
type LocaleScrollSnapshot = {
  y: number;
  navDelta: number | null;
  keepNavInView: boolean;
};

const getNavAnchorElement = () => {
  if (typeof document === "undefined") {
    return null;
  }

  return document.getElementById("site-nav");
};

type NavigationProps = {
  locale?: string;
};

const Navigation = ({ locale }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const currentLocale = normalizeLocale(locale);
  const currentLanguage =
    languages.find((language) => language.code === currentLocale) ?? languages[0];
  const localePath = (suffix = "") => localizedPath(currentLocale, suffix);
  const t = (key: string, fallback = "") => translate(currentLocale, key, fallback);

  const buildLanguageHref = (lng: string) => {
    const cleanPath = (pathname ?? "/")
      .replace(/^\/(?:en|fr|ko|it)(?=\/|$)/, "")
      .replace(/\/+$/, "") || "/";

    return lng === "en" ? cleanPath : `/${lng}${cleanPath === "/" ? "" : cleanPath}`;
  };

  const persistLocaleSwitchScroll = () => {
    if (typeof window === "undefined") {
      return;
    }

    const navElement = getNavAnchorElement();
    const navOffsetTop = navElement?.offsetTop ?? 0;
    const currentScrollY = window.scrollY;
    const isAtOrPastNav = currentScrollY >= navOffsetTop;
    const snapshot: LocaleScrollSnapshot = {
      y: currentScrollY,
      navDelta: isAtOrPastNav ? currentScrollY - navOffsetTop : null,
      keepNavInView: isAtOrPastNav && navOffsetTop > 0,
    };
    sessionStorage.setItem(LOCALE_SCROLL_KEY, JSON.stringify(snapshot));
  };

  const handleLanguageLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    lng: string,
    href: string,
  ) => {
    setIsLanguageMenuOpen(false);

    if (lng === currentLocale || href === pathname) {
      event.preventDefault();
      setIsMobileMenuOpen(false);
      return;
    }

    persistLocaleSwitchScroll();
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isAnchor = href.includes('#');
    const [path, hash] = isAnchor ? href.split('#') : [href, null];
    
    // Normalize path comparison (handle trailing slashes if any)
    const currentPath = pathname ? (pathname.endsWith('/') ? pathname : `${pathname}/`) : "/";
    const targetPath = path.endsWith('/') ? path : `${path}/`;

    if (currentPath === targetPath) {
      if (isAnchor && hash) {
        e.preventDefault();
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // If it's the current page but no hash, just scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
    // Always close the mobile menu on click
    setIsMobileMenuOpen(false);
    setIsLanguageMenuOpen(false);
  };

  // Handle hash scroll on initial load or navigation from other pages
  useEffect(() => {
    // Restore previous scroll position after locale switch.
    if (typeof window !== "undefined") {
      const savedScroll = sessionStorage.getItem(LOCALE_SCROLL_KEY);
      if (savedScroll) {
        let snapshot: LocaleScrollSnapshot | null = null;
        const legacyY = Number(savedScroll);
        if (Number.isFinite(legacyY)) {
          snapshot = {
            y: legacyY,
            navDelta: null,
            keepNavInView: false,
          };
        } else {
          try {
            const parsed = JSON.parse(savedScroll) as Partial<LocaleScrollSnapshot>;
            if (typeof parsed.y === "number" && Number.isFinite(parsed.y)) {
              snapshot = {
                y: parsed.y,
                navDelta:
                  typeof parsed.navDelta === "number" && Number.isFinite(parsed.navDelta)
                    ? parsed.navDelta
                    : null,
                keepNavInView: Boolean(parsed.keepNavInView),
              };
            }
          } catch {
            snapshot = null;
          }
        }

        if (snapshot) {
          const restoreScroll = () => {
            const navElement = getNavAnchorElement();
            const navOffsetTop = navElement?.offsetTop ?? 0;
            const viewportHeight = window.innerHeight || 0;
            const docHeight =
              document.documentElement?.scrollHeight || document.body?.scrollHeight || 0;
            const maxY = Math.max(0, docHeight - viewportHeight);
            let targetY = snapshot.y;

            if (typeof snapshot.navDelta === "number") {
              targetY = navOffsetTop + snapshot.navDelta;

              if (snapshot.keepNavInView && targetY < navOffsetTop + 1) {
                targetY = navOffsetTop + 1;
              }
            }

            const nextY = Math.min(Math.max(0, targetY), maxY);
            window.scrollTo({ top: nextY, behavior: "auto" });
          };

          requestAnimationFrame(restoreScroll);
          // One late pass handles small post-hydration layout shifts.
          window.setTimeout(restoreScroll, 120);
        }
        sessionStorage.removeItem(LOCALE_SCROLL_KEY);
      }
    }

    if (typeof window !== "undefined" && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        // Small timeout to ensure page content is rendered
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!isLanguageMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!languageMenuRef.current?.contains(target)) {
        setIsLanguageMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLanguageMenuOpen]);

  return (
    <nav
      id="site-nav"
      className="site-nav-sticky w-full bg-background/95 backdrop-blur-lg border-b border-border/20 shadow-sm"
      suppressHydrationWarning
    >
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex min-w-0 items-center">
            <Link href={localePath("/")} onClick={() => setIsMobileMenuOpen(false)}>
              <div suppressHydrationWarning className="truncate pr-3 text-base font-bold tracking-tight sm:text-lg">{t('nav.logo')}</div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              key="home"
              href={localePath("/")}
              onClick={(e) => handleNavClick(e, localePath("/"))}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <span dangerouslySetInnerHTML={{ __html: t('nav.home', 'Home') }} />
            </Link>
            <Link 
              key="collections"
              href={localePath("/#collections")}
              onClick={(e) => handleNavClick(e, localePath("/#collections"))}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <span dangerouslySetInnerHTML={{ __html: t('collections.title', 'Collections') }} />
            </Link>
            <Link 
              key="team"
              href={localePath("/#team")}
              onClick={(e) => handleNavClick(e, localePath("/#team"))}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <span dangerouslySetInnerHTML={{ __html: t('nav.team', 'Team') }} />
            </Link>
            <Link 
              key="blog"
              href={localePath("/blog")}
              onClick={(e) => handleNavClick(e, localePath("/blog"))}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <span dangerouslySetInnerHTML={{ __html: t('nav.blog', 'Blog') }} />
            </Link>
            <Link 
              key="textile-tunisie"
              href={localePath("/textile-tunisie")}
              onClick={(e) => handleNavClick(e, localePath("/textile-tunisie"))}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <span dangerouslySetInnerHTML={{ __html: t("footer.textile_tunisie", "Textile Tunisia") }} />
            </Link>
            <Link 
              key="contact"
              href={localePath("/contact")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <span dangerouslySetInnerHTML={{ __html: t('nav.contact', 'Contact') }} />
            </Link>
            <Link 
              key="recruitment"
              href={localePath("/recruitment")}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              <span dangerouslySetInnerHTML={{ __html: t('nav.recruitment', 'Careers') }} />
            </Link>
          </div>

          {/* Right side elements */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-4">

            {/* Desktop Social Media Icons */}
            <div className="hidden md:flex items-center gap-2">
              <a
                href="tel:+21695518870"
                className="flex items-center gap-2 hover:text-foreground text-sm text-muted-foreground"
              >
                <Phone className="h-4 w-4" />
              </a>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="mailto:walid.horchani@thefactory.com.tn"
                      className="flex items-center gap-2 hover:text-foreground text-sm text-muted-foreground"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>walid.horchani@thefactory.com.tn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <a
                href="https://www.facebook.com/profile.php?id=61570008207516"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </a>
              <a
                href="https://www.linkedin.com/company/magtexco-the-factory"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </a>
            </div>

            <div className="relative" ref={languageMenuRef}>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full border border-border/60 bg-background/90 px-3 py-2 text-xs font-semibold tracking-[0.22em] text-foreground transition-colors hover:border-gold/60 hover:text-gold-dark"
                onClick={() => setIsLanguageMenuOpen((open) => !open)}
                aria-expanded={isLanguageMenuOpen}
                aria-haspopup="menu"
                aria-label="Language switcher"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>{currentLanguage.code.toUpperCase()}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform ${
                    isLanguageMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isLanguageMenuOpen && (
                <div
                  className="absolute right-0 top-full z-50 mt-3 min-w-[180px] overflow-hidden rounded-2xl border border-border/60 bg-background/95 p-2 shadow-xl backdrop-blur"
                  role="menu"
                >
                  {languages.map((lang) => {
                    const href = buildLanguageHref(lang.code);
                    const isActive = currentLocale === lang.code;

                    return (
                      <a
                        key={lang.code}
                        href={href}
                        hrefLang={lang.code}
                        lang={lang.code}
                        role="menuitem"
                        onClick={(event) => handleLanguageLinkClick(event, lang.code, href)}
                        className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          isActive
                            ? "bg-gold/15 text-gold-dark"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        <span className="font-medium">{lang.name}</span>
                        <span className="text-[11px] font-semibold tracking-[0.2em] opacity-70">
                          {lang.code.toUpperCase()}
                        </span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Menu (Hamburger Icon) */}
            <div className="flex items-center md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-[400px] sm:max-w-sm">
                  <div className="flex flex-col items-start gap-4 pt-10 pb-4 px-2 overflow-y-auto max-h-full">
                    <Link 
                      key="mobile-home"
                      href={localePath("/")}
                      onClick={(e) => handleNavClick(e, localePath("/"))}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2" 
                    >
                      <span dangerouslySetInnerHTML={{ __html: t('nav.home', 'Home') }} />
                    </Link>
                    <Link 
                      key="mobile-collections"
                      href={localePath("/#collections")}
                      onClick={(e) => handleNavClick(e, localePath("/#collections"))}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2"
                    >
                      <span dangerouslySetInnerHTML={{ __html: t('collections.title', 'Collections') }} />
                    </Link>
                    <Link 
                      key="mobile-team"
                      href={localePath("/#team")}
                      onClick={(e) => handleNavClick(e, localePath("/#team"))}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2"
                    >
                      <span dangerouslySetInnerHTML={{ __html: t('nav.team', 'Team') }} />
                    </Link>
                    <Link 
                      key="mobile-blog"
                      href={localePath("/blog")}
                      onClick={(e) => handleNavClick(e, localePath("/blog"))}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2"
                    >
                      <span dangerouslySetInnerHTML={{ __html: t('nav.blog', 'Blog') }} />
                    </Link>
                    <Link 
                      key="mobile-textile"
                      href={localePath("/textile-tunisie")}
                      onClick={(e) => handleNavClick(e, localePath("/textile-tunisie"))}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2"
                    >
                      <span dangerouslySetInnerHTML={{ __html: t("footer.textile_tunisie", "Textile Tunisia") }} />
                    </Link>
                    <Link 
                      key="mobile-contact"
                      href={localePath("/contact")}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span dangerouslySetInnerHTML={{ __html: t('nav.contact', 'Contact') }} />
                    </Link>
                    <Link 
                      key="mobile-recruitment"
                      href={localePath("/recruitment")}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span dangerouslySetInnerHTML={{ __html: t('nav.recruitment', 'Careers') }} />
                    </Link>
                    
                    <div className="mt-4 space-y-4 w-full">
                      <a
                        href="tel:+21695518870"
                        className="flex items-center gap-3 hover:text-foreground text-muted-foreground text-base"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="bg-muted p-2 rounded-full"><Phone className="h-4 w-4" /></div>
                        <span>+216 95 518 870</span>
                      </a>
                      <a
                        href="mailto:walid.horchani@thefactory.com.tn"
                        className="flex items-center gap-3 hover:text-foreground text-muted-foreground text-base w-full"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="bg-muted p-2 rounded-full flex-shrink-0"><Mail className="h-4 w-4" /></div>
                        <span className="break-all text-sm leading-tight">walid.horchani@thefactory.com.tn</span>
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-6">
                      <a
                        href="https://www.facebook.com/profile.php?id=61570008207516"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Facebook"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground bg-muted p-3 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Facebook className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/magtexco-the-factory"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground bg-muted p-3 rounded-full transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
