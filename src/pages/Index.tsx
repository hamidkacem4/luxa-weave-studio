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
import TeamSection from "@/components/TeamSection";
import BlogSection from "@/components/BlogSection";
import Footer from "@/components/Footer";

const Index = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      <Meta 
        title={t("meta.title")}
        description={t("meta.description")}
        keywords={t("meta.keywords")}
      />
      <main>
        <Hero />
        <Navigation />
        <WhyChooseUs />
        <Collections />
        <Products />
        <About />
        <AboutFactory />
        <Sustainability />
        <TeamSection />
        <BlogSection />
        <Contact />
      </main>      
      <Footer />      
      <WhatsAppButton />
    </div>
  );
};

export default Index;