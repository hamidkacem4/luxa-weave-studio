"use client";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Globe,
  Facebook,
  Linkedin,
  Phone,
  Mail,
  Menu, // Import Menu icon for hamburger
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
];

const Navigation = () => {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const changeLanguage = (lng: string) => {
    // When changing language, we want to stay on the same page but with the new language prefix
    if (!pathname) return;
    const pathParts = pathname.split('/').filter(Boolean);
    let hash = "";
    if (typeof window !== "undefined") {
      hash = window.location.hash;
    }
    
    const supportedLangs = ['en', 'fr', 'ko'];
    
    if (pathParts.length > 0 && supportedLangs.includes(pathParts[0])) {
      pathParts[0] = lng;
      router.push(`/${pathParts.join('/')}${hash}`);
    } else {
      // If we're at root / but it doesn't have a locale prefix (shouldn't happen with our app structure)
      router.push(`/${lng}${pathname === '/' ? '' : pathname}${hash}`);
    }
    i18n.changeLanguage(lng);
    setIsMobileMenuOpen(false);
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === i18n.language) || languages[0];
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
  };

  // Handle hash scroll on initial load or navigation from other pages
  useEffect(() => {
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

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/20 shadow-sm">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href={`/${i18n.language}/`} onClick={() => setIsMobileMenuOpen(false)}>
              <div className="text-lg font-bold tracking-tight">{t('nav.logo')}</div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href={`/${i18n.language}/`} 
              onClick={(e) => handleNavClick(e, `/${i18n.language}/`)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {t('nav.home')}
            </Link>
            <Link 
              href={`/${i18n.language}/#collections`} 
              onClick={(e) => handleNavClick(e, `/${i18n.language}/#collections`)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {t('collections.title', 'Collections')}
            </Link>
            <Link 
              href={`/${i18n.language}/#team`} 
              onClick={(e) => handleNavClick(e, `/${i18n.language}/#team`)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {t('nav.team', 'Team')}
            </Link>
            <Link 
              href={`/${i18n.language}/blog`} 
              onClick={(e) => handleNavClick(e, `/${i18n.language}/blog`)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {t('nav.blog', 'Blog')}
            </Link>
            <Link 
              href={`/${i18n.language}/contact`} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {t('nav.contact')}
            </Link>
            <Link 
              href={`/${i18n.language}/recruitment`} 
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {t('nav.recruitment')}
            </Link>
          </div>

          {/* Right side elements */}
          <div className="flex items-center gap-4">

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

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {getCurrentLanguage().flag}
                  </span>
                  <span className="text-sm">
                    {getCurrentLanguage().code.toUpperCase()}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`flex items-center gap-3 cursor-pointer ${
                      i18n.language === lang.code ? "bg-muted" : ""
                    }`}
                  >
                    <span className="text-base">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu (Hamburger Icon) */}
            <div className="flex items-center md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[85vw] max-w-[400px] sm:max-w-sm">
                  <div className="flex flex-col items-start gap-4 pt-10 pb-4 px-2 overflow-y-auto max-h-full">
                    <Link 
                      href={`/${i18n.language}/`} 
                      onClick={(e) => handleNavClick(e, `/${i18n.language}/`)}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2" 
                    >
                      {t('nav.home')}
                    </Link>
                    <Link 
                      href={`/${i18n.language}/#collections`} 
                      onClick={(e) => handleNavClick(e, `/${i18n.language}/#collections`)}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2"
                    >
                      {t('collections.title', 'Collections')}
                    </Link>
                    <Link 
                      href={`/${i18n.language}/#team`} 
                      onClick={(e) => handleNavClick(e, `/${i18n.language}/#team`)}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2"
                    >
                      {t('nav.team', 'Team')}
                    </Link>
                    <Link 
                      href={`/${i18n.language}/blog`} 
                      onClick={(e) => handleNavClick(e, `/${i18n.language}/blog`)}
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2"
                    >
                      {t('nav.blog', 'Blog')}
                    </Link>
                    <Link 
                      href={`/${i18n.language}/contact`} 
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.contact')}
                    </Link>
                    <Link 
                      href={`/${i18n.language}/recruitment`} 
                      className="text-lg font-medium text-foreground hover:text-muted-foreground w-full border-b border-border/50 pb-2" 
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {t('nav.recruitment')}
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