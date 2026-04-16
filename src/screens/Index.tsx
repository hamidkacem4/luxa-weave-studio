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
import TeamSection from "@/components/TeamSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";
import { getLocale, localizedPath } from "@/lib/seo";
import { t } from "@/lib/i18n-utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type IndexProps = {
  locale: string;
};

const Index = ({ locale }: IndexProps) => {
  const currentLocale = getLocale(locale);

  return (
    <div className="min-h-screen">
      <main className="relative overflow-visible">
        <Hero locale={currentLocale} />
        <Navigation locale={currentLocale} />
        <WhyChooseUs locale={currentLocale} />
        <Collections locale={currentLocale} />
        <Products locale={currentLocale} />
        <About locale={currentLocale} />
        <AboutFactory locale={currentLocale} />
        <Sustainability locale={currentLocale} />
        <TeamSection locale={currentLocale} />
        <BlogSection locale={currentLocale} />
        <Contact locale={currentLocale} />
        
        {/* SEO Internal Linking Hub */}
        <section className="bg-charcoal py-12 text-white border-t border-gold/10">
          <div className="container px-4 mx-auto text-center">
            <h3 className="text-xl font-bold mb-4 tracking-tight">
              {t(currentLocale, "textile_tunisie.hero.title")}
            </h3>
            <p className="text-white/60 mb-6 max-w-2xl mx-auto text-sm">
              {t(currentLocale, "textile_tunisie.meta.description")}
            </p>
            <Link 
              href={localizedPath(currentLocale, "/textile-tunisie")}
              className="inline-flex items-center gap-2 text-gold hover:text-white transition-colors font-bold uppercase tracking-widest text-xs"
            >
              {t(currentLocale, "footer.textile_tunisie")}
              <ArrowRight className="w-4 h-4" />
            </Link>
            {currentLocale === "en" && (
              <p className="mt-4 text-xs uppercase tracking-[0.2em] text-white/50">
                <a href="/fr/textile-tunisie" className="hover:text-gold transition-colors">
                  Textile Tunisie
                </a>
              </p>
            )}
          </div>
        </section>
      </main>      
      <Footer locale={currentLocale} />      
      <WhatsAppButton />
    </div>
  );
};

export default Index;
