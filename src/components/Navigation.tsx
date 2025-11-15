import { useTranslation } from "react-i18next";
import {
  Globe,
  Facebook,
  Instagram,
  MessageSquare,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

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
            <h1 className="text-xl font-bold tracking-tight">{t('nav.logo')}</h1>
          </div>

          {/* Contact Info */}
          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="tel:21652049969"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              <span>+216 52 049 969</span>
            </a>
            <a
              href="mailto:info@luxetextile.com"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              <span>info@luxetextile.com</span>
            </a>
            <a
              href="#contact"
              className="flex items-center gap-2 hover:text-foreground"
            >
              <MapPin className="h-4 w-4" />
              <span>{t('nav.address')}</span>
            </a>
          </div>

          {/* Social Media Icons and Language Switcher */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <a
                href="https://www.facebook.com/profile.php?id=61570008207516"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4 text-muted-foreground hover:text-foreground" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <MessageSquare className="h-4 w-4 text-muted-foreground hover:text-foreground" />
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