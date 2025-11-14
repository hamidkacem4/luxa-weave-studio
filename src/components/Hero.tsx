import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Hero Video */}
      <div className="absolute inset-0 w-screen h-screen">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="min-h-full min-w-full object-cover absolute top-0 left-0"
        />
        <div className="absolute inset-0 bg-background/20" />
      </div>

      {/* Content */}
      <div className="container relative z-10 flex h-full items-center justify-center">
        <div className="text-center fade-in-up">
          <h1 className="mb-6 text-6xl font-bold leading-tight tracking-tight lg:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mb-8 text-xl text-muted-foreground font-light">
            {t('hero.subtitle')}
          </p>
          <p className="mb-8 text-lg text-muted-foreground/80 font-light max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="gold" size="lg" onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('hero.explore_collections')}
            </Button>
            <Button variant="outline" size="lg" className="bg-background/80 backdrop-blur-sm" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('hero.contact_us')}
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Controls (for future implementation) */}
      <div className="absolute bottom-8 right-8 z-20 flex gap-2">
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white transition-all hover:bg-white/10">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full border border-white text-white transition-all hover:bg-white/10">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;