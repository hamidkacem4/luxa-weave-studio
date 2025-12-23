import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Globe,
  Facebook,
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
import { Link } from "react-router-dom";
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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsMobileMenuOpen(false); // Close mobile menu on language change
  };

  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === i18n.language) || languages[0];
  };

  return (
    <nav className="sticky top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border/20 shadow-sm">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to={`/${i18n.language}/`} onClick={() => setIsMobileMenuOpen(false)}>
              <h1 className="text-lg font-bold tracking-tight">{t('nav.logo')}</h1>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to={`/${i18n.language}/`} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {t('nav.home')}
            </Link>
            <Link to={`/${i18n.language}/contact`} className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {t('nav.contact')}
            </Link>
            <Link to={`/${i18n.language}/recruitment`} className="text-sm font-medium text-muted-foreground hover:text-foreground">
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
                <span>+216 95 518 870</span>
              </a>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href="mailto:walid.horchani@thefactory.com.tn"
                      className="flex items-center gap-2 hover:text-foreground text-sm text-muted-foreground"
                    >
                      <Mail className="h-4 w-4" />
                      <span>walid.horchani...</span>
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
                <SheetContent side="right">
                  <div className="flex flex-col items-start gap-4 p-4">
                    <Link to={`/${i18n.language}/`} className="text-base font-medium text-foreground hover:text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('nav.home')}
                    </Link>
                    <Link to={`/${i18n.language}/contact`} className="text-base font-medium text-foreground hover:text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('nav.contact')}
                    </Link>
                    <Link to={`/${i18n.language}/recruitment`} className="text-base font-medium text-foreground hover:text-muted-foreground" onClick={() => setIsMobileMenuOpen(false)}>
                      {t('nav.recruitment')}
                    </Link>
                    <a
                      href="tel:+21695518870"
                      className="flex items-center gap-2 hover:text-foreground text-muted-foreground text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Phone className="h-5 w-5" />
                      <span>+216 95 518 870</span>
                    </a>
                    <a
                      href="mailto:walid.horchani@thefactory.com.tn"
                      className="flex items-center gap-2 hover:text-foreground text-muted-foreground text-base"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Mail className="h-5 w-5" />
                      <span>walid.horchani@thefactory.com.tn</span>
                    </a>
                    <a
                      href="https://www.facebook.com/profile.php?id=61570008207516"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Facebook className="h-5 w-5" />
                      <span>Facebook</span>
                    </a>
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