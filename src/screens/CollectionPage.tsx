"use client";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
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
import WhatsAppButton from "@/components/WhatsAppButton";
import { fromCollectionRouteSlug } from "@/lib/collectionSlugs";
import { getLocale, localizedPath } from "@/lib/seo";
import { t as translate } from "@/lib/i18n-utils";

type CollectionPageProps = {
  slug?: string;
  locale?: string;
};

const CollectionPage = ({ slug = "", locale = "en" }: CollectionPageProps) => {
  const safeLocale = getLocale(locale);
  const collectionKey = fromCollectionRouteSlug(slug);
  const homePath = localizedPath(safeLocale);
  const collectionsPath = localizedPath(safeLocale, "/#collections");
  const contactPath = localizedPath(safeLocale, "/contact");

  // Get static data (images) from our new data file
  const staticData = collectionsData[collectionKey || ""];

  // Get text data from translations (for multi-language support)
  const t = (key: string, fallback = "") => translate(safeLocale, key, fallback);
  const title = t(`collection_details.${collectionKey}.title`);
  const description = t(`collection_details.${collectionKey}.description`);

  if (!staticData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Collection Not Found</h1>
          <Link href={homePath}>
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

  return (
    <div className="min-h-screen bg-background">
      <Navigation locale={locale} />

      <main>
        {/* Hero Section with Background Image */}
        <section className="relative flex h-[38vh] items-center justify-center overflow-hidden sm:h-[45vh] md:h-[55vh]">
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

          <Link
            href={collectionsPath}
            className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/35 px-4 py-2 text-sm font-medium text-white/95 backdrop-blur-md transition-colors hover:bg-black/50 md:hidden"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Link>

          <div className="container relative z-10 pt-10 text-center text-white fade-in-up md:pt-0">
              <div className="mb-6 hidden md:flex justify-center">
              <Link
                href={collectionsPath}
                className="inline-flex items-center text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                <ChevronLeft className="mr-1 h-4 w-4" />
                {t("nav.home")} / {t("collections.title")}
              </Link>
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-7xl">
              {title}
            </h1>
            <p className="mx-auto max-w-3xl px-4 text-base font-light leading-relaxed text-white/90 sm:text-lg md:text-2xl">
              {description}
            </p>
          </div>
        </section>

        <div className="container py-12 sm:py-16 md:py-24">
          {/* Product Section */}
          <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Tabs defaultValue="women" className="w-full">
              <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                <h2 className="text-2xl font-serif font-semibold sm:text-3xl">Our Pieces</h2>
                <TabsList className="grid h-auto w-full max-w-sm grid-cols-2 bg-cream/50 p-1 sm:w-auto">
                  <TabsTrigger value="women" className="h-10 px-4 data-[state=active]:bg-white sm:px-8">
                    {t('products.women_tab')}
                  </TabsTrigger>
                  <TabsTrigger value="men" className="h-10 px-4 data-[state=active]:bg-white sm:px-8">
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
            <Link href={contactPath}>
              <Button variant="gold" size="lg" className="w-full sm:w-auto sm:min-w-[200px]">
                {t('blog.cta_contact')}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
      <WhatsAppButton />
    </div>
  );
};

export default CollectionPage;
