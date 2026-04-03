import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Factory, 
  Globe, 
  Zap, 
  ShieldCheck, 
  ChevronRight, 
  Search,
  Users,
  Layers,
  Award
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Meta from "@/components/Meta";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import Footer from "@/components/Footer";

const TextileTunisiePage: React.FC = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language || "fr";

  // SEO Content (French for targeting specific keywords)
  const seoData = {
    title: "Usine Textile Tunisie : Fabricant & Production de Qualité | MagTexco",
    description: "Vous cherchez une usine textile en Tunisie ? MagTexco, fabricant textile de référence, offre des solutions de production innovantes, durables et rapides pour les marques internationales.",
    keywords: "usine textile Tunisie, textile Tunisie, fabricant textile Tunisie, confection textile, production textile méditerranée",
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const slideInLeft = {
    initial: { opacity: 0, x: -50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, type: "spring" }
  };

  const slideInRight = {
    initial: { opacity: 0, x: 50 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, type: "spring" }
  };

  return (
    <div className="min-h-screen bg-white">
      <Meta 
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
      />

      <Navigation />

      <main>
        {/* HERO SECTION */}
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://res.cloudinary.com/duqbe1hoq/image/upload/v1773751221/hero-textile_lq8f9n.jpg" 
              alt="Usine textile Tunisie production haute technologie"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-[2px]" />
          </div>
          
          <div className="container relative z-10 px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Badge className="mb-6 bg-gold text-charcoal font-bold px-6 py-2 uppercase tracking-[0.2em]">
                Expertise Méditerranéenne
              </Badge>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tighter">
                Votre <span className="text-gold">Usine Textile</span> <br />en Tunisie
              </h1>
              <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                Leader de la confection et partenaire stratégique des plus grandes marques mondiales. Qualité, agilité et durabilité au cœur du <strong>textile Tunisie</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button size="lg" className="bg-gold hover:bg-white text-charcoal font-bold px-10 py-8 rounded-full transition-all text-lg shadow-xl" asChild>
                  <Link to={`/${lang}/contact#contact-form`}>Démarrer votre production</Link>
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 font-bold px-10 py-8 rounded-full transition-all text-lg" asChild>
                  <a href="#avantages">Découvrir nos atouts</a>
                </Button>
              </div>
            </motion.div>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-1 h-12 rounded-full bg-gradient-to-t from-gold to-transparent" />
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="py-24 bg-neutral-50">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2 {...fadeIn} className="text-3xl md:text-5xl font-bold text-charcoal mb-8">
                Le hub stratégique du textile mondial
              </motion.h2>
              <motion.p {...fadeIn} className="text-lg text-muted-foreground leading-relaxed mb-12">
                Choisir un <strong>fabricant textile en Tunisie</strong>, c'est opter pour un savoir-faire ancestral allié aux technologies de pointe. La Tunisie s'est imposée comme le partenaire privilégié de l'Europe grâce à sa proximité géographique, sa main-d'œuvre hautement qualifiée et son respect rigoureux des normes environnementales et sociales.
              </motion.p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                  { label: "Proximité Europe", value: "2-3 jours" },
                  { label: "Part de marché UE", value: "Top 5" },
                  { label: "Main d'œuvre", value: "150k+ experts" },
                  { label: "Exportations", value: "90% UE" }
                ].map((stat, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white rounded-2xl shadow-soft border border-cream"
                  >
                    <div className="text-2xl font-bold text-gold-dark mb-1">{stat.value}</div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground font-bold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ALTERNATING SECTIONS */}
        
        {/* Section 1: Pourquoi choisir (Slide Left) */}
        <section id="avantages" className="py-24 overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div {...slideInLeft} className="lg:w-1/2">
                <Badge variant="outline" className="mb-6 border-gold text-gold-dark px-4 py-1">POURQUOI NOUS ?</Badge>
                <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-8 leading-tight">
                  Plus qu'une simple <span className="text-gold-dark">usine textile en Tunisie</span>
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Nous ne nous contentons pas de fabriquer ; nous co-créons. Notre approche intègre le design, le sourcing responsable et une logistique optimisée pour garantir le succès de vos collections.
                </p>
                <ul className="space-y-4">
                  {[
                    "Réduction drastique des délais de mise sur le marché (Time-to-market).",
                    "Certifications internationales (OEKO-TEX, GOTS, BSCI).",
                    "Flexibilité des volumes de production.",
                    "Transparence totale de la supply chain."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
                      <span className="text-charcoal font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div {...slideInRight} className="lg:w-1/2 relative">
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                  <img 
                    src="https://res.cloudinary.com/duqbe1hoq/image/upload/v1773753214/Gemini_Generated_Image_1052q81052q81052_omjuuc.png" 
                    alt="Processus de qualité fabricant textile Tunisie"
                    className="w-full h-auto"
                  />
                </div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-gold/10 rounded-full blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section 2: Avantages (Slide Right) */}
        <section className="py-24 bg-charcoal text-white overflow-hidden">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <motion.div {...slideInLeft} className="lg:w-1/2 lg:order-last">
                <Badge className="mb-6 bg-gold text-charcoal px-4 py-1">AVANTAGES COMPÉTITIFS</Badge>
                <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                  Une agilité inégalée au cœur de la Méditerranée
                </h2>
                <div className="grid gap-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Zap className="text-gold w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Nearshoring Rapide</h3>
                      <p className="text-white/60">Livraison en Europe en moins de 72h par voie routière ou maritime, réduisant vos stocks et vos risques.</p>
                    </div>
                  </div>
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Award className="text-gold w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">Excellence Technique</h3>
                      <p className="text-white/60">Maîtrise complète des matières complexes : soie, coton bio, tissus techniques et ennoblissement haut de gamme.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div {...slideInRight} className="lg:w-1/2">
                <div className="grid grid-cols-2 gap-4">
                  <img src="https://res.cloudinary.com/duqbe1hoq/image/upload/v1773750088/Gemini_Generated_Image_bzbqqabzbqqabzbq_fcw2vs.png" alt="Textile Tunisie détail" className="rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500" />
                  <img src="https://res.cloudinary.com/duqbe1hoq/image/upload/v1773750750/ChatGPT_Image_Mar_17_2026_01_32_10_PM_h6vofq.png" alt="Confection textile Tunisie" className="rounded-3xl shadow-xl mt-12 hover:scale-105 transition-transform duration-500" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* TYPES DE PRODUITS */}
        <section className="py-24">
          <div className="container px-4 mx-auto text-center mb-16">
            <motion.h2 {...fadeIn} className="text-4xl md:text-5xl font-bold text-charcoal mb-6">Nos expertises produits</motion.h2>
            <motion.p {...fadeIn} className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une offre diversifiée pour répondre aux exigences du prêt-à-porter, du luxe et du textile professionnel.
            </motion.p>
          </div>
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Mode & Prêt-à-porter", desc: "Collections saisonnières homme, femme et enfant avec une finition impeccable.", icon: <Users className="w-8 h-8" /> },
                { title: "Luxe & Accessoires", desc: "Spécialiste du foulard en soie et des pièces d'exception nécessitant une main d'œuvre experte.", icon: <Award className="w-8 h-8" /> },
                { title: "Textile Technique", desc: "Vêtements de protection et tissus intelligents pour des applications industrielles.", icon: <Layers className="w-8 h-8" /> }
              ].map((type, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="p-10 rounded-[2.5rem] bg-neutral-50 border border-cream hover:bg-white hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center text-gold-dark mb-8 group-hover:bg-gold group-hover:text-charcoal transition-colors">
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-charcoal">{type.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{type.desc}</p>
                  <Link to={`/${lang}/contact`} className="inline-flex items-center text-gold-dark font-bold hover:gap-3 transition-all">
                    En savoir plus <ChevronRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESSUS SECTION */}
        <section className="py-24 bg-cream/20 border-y border-cream">
          <div className="container px-4 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <h2 className="text-4xl font-bold mb-6">Notre Processus de Fabrication</h2>
              <p className="text-muted-foreground italic">De la conception à la livraison, une rigueur absolue.</p>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gold/20 -translate-y-1/2 z-0" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
                {[
                  { step: "01", title: "Développement", icon: <Search /> },
                  { step: "02", title: "Sourcing", icon: <Globe /> },
                  { step: "03", title: "Production", icon: <Factory /> },
                  { step: "04", title: "Contrôle Qualité", icon: <ShieldCheck /> }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="flex flex-col items-center text-center bg-white p-8 rounded-3xl shadow-soft"
                  >
                    <div className="w-16 h-16 bg-charcoal text-gold rounded-full flex items-center justify-center mb-6 shadow-lg">
                      {item.icon}
                    </div>
                    <span className="text-gold font-bold text-sm mb-2">{item.step}</span>
                    <h4 className="text-xl font-bold text-charcoal">{item.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 bg-white">
          <div className="container px-4 mx-auto max-w-4xl">
            <h2 className="text-4xl font-bold text-center mb-16">Questions Fréquentes sur le <span className="text-gold">Textile en Tunisie</span></h2>
            <Accordion type="single" collapsible className="w-full">
              {[
                { 
                  q: "Pourquoi choisir une usine textile en Tunisie plutôt qu'en Asie ?", 
                  a: "La Tunisie offre des délais de livraison 5 à 10 fois plus courts (nearshoring), une flexibilité sur les petites et moyennes séries, et une empreinte carbone réduite grâce à la proximité géographique avec l'Europe. De plus, les standards sociaux sont généralement plus élevés." 
                },
                { 
                  q: "Quelles sont les certifications de vos fabricants textile en Tunisie ?", 
                  a: "La majorité de nos partenaires sont certifiés OEKO-TEX Standard 100, GOTS pour le coton biologique, et BSCI ou SMETA pour l'audit social et éthique." 
                },
                { 
                  q: "Quel est le minimum de commande (MOQ) moyen ?", 
                  a: "Contrairement aux usines asiatiques, le textile Tunisie permet une grande flexibilité. Les MOQ varient selon le type de produit, mais nous pouvons souvent démarrer des productions à partir de 200-500 pièces par modèle." 
                },
                { 
                  q: "Comment assurez-vous le contrôle qualité ?", 
                  a: "Nous effectuons des contrôles à chaque étape : inspection des tissus à l'arrivée, contrôles en ligne pendant la confection, et inspection finale AQL avant expédition." 
                }
              ].map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-cream py-2">
                  <AccordionTrigger className="text-left text-lg font-bold hover:text-gold-dark transition-colors">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-base leading-relaxed">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          {/* JSON-LD for FAQ SEO */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Pourquoi choisir une usine textile en Tunisie plutôt qu'en Asie ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La Tunisie offre des délais de livraison 5 à 10 fois plus courts (nearshoring), une flexibilité sur les petites et moyennes séries, et une empreinte carbone réduite grâce à la proximité géographique avec l'Europe. De plus, les standards sociaux sont généralement plus élevés."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quelles sont les certifications de vos fabricants textile en Tunisie ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "La majorité de nos partenaires sont certifiés OEKO-TEX Standard 100, GOTS pour le coton biologique, et BSCI ou SMETA pour l'audit social et éthique."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Quel est le minimum de commande (MOQ) moyen ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Contrairement aux usines asiatiques, le textile Tunisie permet une grande flexibilité. Les MOQ varient selon le type de produit, mais nous pouvons souvent démarrer des productions à partir de 200-500 pièces par modèle."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Comment assurez-vous le contrôle qualité ?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Nous effectuons des contrôles à chaque étape : inspection des tissus à l'arrivée, contrôles en ligne pendant la confection, et inspection finale AQL avant expédition."
                  }
                }
              ]
            })}
          </script>
        </section>

        {/* CTA SECTION */}
        <section className="py-24">
          <div className="container px-4 mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-charcoal rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-10 blur-3xl -mr-32 -mt-32" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold opacity-10 blur-3xl -ml-32 -mb-32" />
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                Prêt à lancer votre production <br />en <span className="text-gold">Tunisie</span> ?
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12">
                Contactez nos experts aujourd'hui pour une étude gratuite de votre projet et découvrez la puissance du textile tunisien.
              </p>
              <Button size="lg" className="bg-gold hover:bg-white text-charcoal font-bold px-12 py-8 rounded-full text-xl shadow-xl transition-all" asChild>
                <Link to={`/${lang}/contact`}>Obtenir un devis gratuit</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default TextileTunisiePage;
