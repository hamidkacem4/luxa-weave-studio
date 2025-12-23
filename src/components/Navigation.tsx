import { useTranslation } from "react-i18next";
import {
  Globe,
  Facebook,
  Phone,
  Mail,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "ko", name: "한국어", flag: "🇰🇷" },
];

const Navigation = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
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
                      <Link to={`/${i18n.language}/`}>
                        <h1 className="text-xl font-bold tracking-tight">{t('nav.logo')}</h1>
                      </Link>
                    </div>
          
                    {/* Navigation Links */}
                    <div className="flex items-center space-x-4">
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
          
                              {/* Social Media Icons and Language Switcher */}
          
                              <div className="flex items-center gap-4">
          
                                <a
          
                                  href="tel:+21695518870"
          
                                  className="hidden md:flex items-center gap-2 hover:text-foreground text-sm text-muted-foreground"
          
                                >
          
                                  <Phone className="h-4 w-4" />
          
                                  <span>+216 95 518 870</span>
          
                                </a>
          
                                <a
          
                                  href="mailto:walid.horchani@thefactory.com.tn"
          
                                  className="hidden md:flex items-center gap-2 hover:text-foreground text-sm text-muted-foreground"
          
                                >
          
                                  <Mail className="h-4 w-4" />
          
                                  <span>walid.horchani@thefactory.com.tn</span>
          
                                </a>
          
                                <div className="flex items-center gap-2">
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
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;