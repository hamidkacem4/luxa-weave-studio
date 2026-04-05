import { useTranslation } from "react-i18next";
import heroVideo from "@/assets/hero-video.mp4";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const { t, i18n } = useTranslation();

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
        <div className="text-center fade-in-up w-full">
          <div className="overflow-hidden px-4 md:px-0">
            <h1
              className="mb-6 text-4xl md:text-6xl font-bold leading-[1.15] tracking-tight lg:text-7xl"
            >
              {t('hero.title')}
            </h1>
          </div>
          <p className="mb-6 md:mb-8 px-4 md:px-0 text-lg md:text-xl text-muted-foreground font-light">
            {t('hero.subtitle')}
          </p>
          <p className="mb-8 px-4 md:px-0 text-base md:text-lg text-muted-foreground/80 font-light max-w-2xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-6 md:px-0 w-full max-w-md mx-auto sm:max-w-none">
            <Button variant="gold" size="lg" className="w-full sm:w-auto" onClick={() => document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('hero.explore_collections')}
            </Button>
            <Link href={`/${i18n.language}/contact#contact-form`} className="w-full sm:w-auto block">
              <Button variant="outline" size="lg" className="w-full bg-background/80 backdrop-blur-sm">
                {t('hero.contact_us')}
              </Button>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;