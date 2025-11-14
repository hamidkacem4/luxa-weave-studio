import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import Products from "@/components/Products";
import About from "@/components/About";
import AboutFactory from "@/components/AboutFactory";
import PartnerBrands from "@/components/PartnerBrands";
import Sustainability from "@/components/Sustainability";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Navigation />
      <Collections />
      <Products />
      <About />
      <AboutFactory />
      <PartnerBrands />
      <Sustainability />
      <Contact />
      
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
