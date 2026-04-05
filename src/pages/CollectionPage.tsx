"use client";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Navigation from "@/components/Navigation";
import Meta from "@/components/Meta";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { collectionsData, Product } from "@/data/collectionsData";
import Footer from "@/components/Footer";

const CollectionPage = () => {
  const { slug, locale } = useParams<{ slug: string; locale: string }>();
  const { t } = useTranslation();
  
  // Get static data (images) from our new data file
  const staticData = collectionsData[slug || ""];
  
  // Get text data from translations (for multi-language support)
  const title = t(`collection_details.${slug}.title`);
  const description = t(`collection_details.${slug}.description`);

  if (!staticData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Collection Not Found</h1>
          <Link href={`/${locale}/`}>
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const renderProductCarousel = (products: Product[]) => (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-5xl mx-auto"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {products.map((product, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
            <div className="group overflow-hidden rounded-lg bg-background border border-border/40 shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="aspect-[3/4] overflow-hidden bg-muted relative">
                <Image
                  src={product.image}
                  alt={t(product.descriptionKey)}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold mb-2">{t(product.nameKey)}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {t(product.descriptionKey)}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="hidden md:block">
        <CarouselPrevious className="-left-12 border-gold/20 hover:bg-gold/10" />
        <CarouselNext className="-right-12 border-gold/20 hover:bg-gold/10" />
      </div>
      {/* Mobile Controls */}
      <div className="flex justify-center gap-4 mt-8 md:hidden">
        <CarouselPrevious className="static translate-y-0" />
        <CarouselNext className="static translate-y-0" />
      </div>
    </Carousel>
  );

  const baseUrl = "https://magtexco.com";
  const collectionUrl = `${baseUrl}/${locale}/collections/${slug}`;

  const collectionSchema = {
    "@type": "CollectionPage",
    "@id": `${collectionUrl}#collectionpage`,
    "url": collectionUrl,
    "name": title,
    "description": description,
    "isPartOf": { "@id": `${baseUrl}/#website` },
    "breadcrumb": { "@id": `${collectionUrl}#breadcrumb` },
    "mainEntity": {
      "@type": "ItemList",
      "name": title,
      "numberOfItems": staticData.women.length + staticData.men.length,
      "itemListElement": [
        ...staticData.women.map((p, i) => ({
          "@type": "ListItem",
          "position": i + 1,
          "item": {
            "@type": "Product",
            "name": t(p.nameKey),
            "description": t(p.descriptionKey),
            "image": (typeof p.image === 'string' ? p.image : p.image.src).startsWith('http') ? (typeof p.image === 'string' ? p.image : p.image.src) : `${baseUrl}${typeof p.image === 'string' ? p.image : p.image.src}`,
            "brand": {
              "@id": `${baseUrl}/#organization`
            },
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@id": `${baseUrl}/#organization`
              }
            }
          }
        })),
        ...staticData.men.map((p, i) => ({
          "@type": "ListItem",
          "position": staticData.women.length + i + 1,
          "item": {
            "@type": "Product",
            "name": t(p.nameKey),
            "description": t(p.descriptionKey),
            "image": (typeof p.image === 'string' ? p.image : p.image.src).startsWith('http') ? (typeof p.image === 'string' ? p.image : p.image.src) : `${baseUrl}${typeof p.image === 'string' ? p.image : p.image.src}`,
            "brand": {
              "@id": `${baseUrl}/#organization`
            },
            "offers": {
              "@type": "AggregateOffer",
              "availability": "https://schema.org/InStock",
              "seller": {
                "@id": `${baseUrl}/#organization`
              }
            }
          }
        }))
      ]
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Meta 
        title={`${title} | MagTexco`}
        description={description}
        keywords={`textile production, ${title}, MagTexco, Tunisian garment factory`}
        image={staticData.bannerImage}
        customSchema={collectionSchema}
      />
      <Navigation />
      
      <main>
        {/* Hero Section with Background Image */}
        <section className="relative h-[45vh] md:h-[55vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image 
              src={staticData.bannerImage} 
              alt={title}
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          
          <div className="container relative z-10 text-center text-white fade-in-up">
             <Link href={`/${locale}/#collections`}
              className="inline-flex items-center text-sm font-medium text-white/80 hover:text-white transition-colors mb-6"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              {t('nav.home')} / {t('collections.title')}
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto px-4">
              {description}
            </p>
          </div>
        </section>

        <div className="container py-16 md:py-24">
          {/* Product Section */}
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Tabs defaultValue="women" className="w-full">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <h2 className="text-3xl font-serif font-semibold">Our Pieces</h2>
                <TabsList className="bg-cream/50 h-12 p-1">
                  <TabsTrigger value="women" className="px-8 h-10 data-[state=active]:bg-white">
                    {t('products.women_tab')}
                  </TabsTrigger>
                  <TabsTrigger value="men" className="px-8 h-10 data-[state=active]:bg-white">
                    {t('products.men_tab')}
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="women" className="mt-0 outline-none">
                {renderProductCarousel(staticData.women)}
              </TabsContent>
              <TabsContent value="men" className="mt-0 outline-none">
                {renderProductCarousel(staticData.men)}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* CTA Section */}
        <section className="bg-charcoal text-white py-20">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('blog.cta_title')}
            </h2>
            <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t('blog.cta_subtitle')}
            </p>
            <Link href={`/${locale}/contact`}>
              <Button variant="gold" size="lg" className="min-w-[200px]">
                {t('blog.cta_contact')}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionPage;
