import Meta from "@/components/Meta";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import WhyChooseUs from "@/components/WhyChooseUs";
import Products from "@/components/Products";
import About from "@/components/About";
import AboutFactory from "@/components/AboutFactory";
import Sustainability from "@/components/Sustainability";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Meta 
        title={t("meta.title")}
        description={t("meta.description")}
        keywords={t("meta.keywords")}
      />
      <Hero />
      <Navigation />
      <div>
        <WhyChooseUs />
        <Collections />
        <Products />
        <About />
        <AboutFactory />
        <Sustainability />
        <Contact />
      </div>
      
      {/* Footer */}
      <footer className="border-t bg-cream py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 MagTexco. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      <WhatsAppButton />
    </div>
  );
};

export default Index;