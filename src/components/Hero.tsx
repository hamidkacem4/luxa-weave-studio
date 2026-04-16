"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLocale, localizedPath } from "@/lib/seo";
import { t } from "@/lib/i18n-utils";

// Both paths point to public/ so they have stable, predictable URLs.
// The preload link in layout.tsx references hero-textile.jpg by the same path.
const HERO_POSTER_SRC = "/assets/textile-tunisie-factory-closeup.webp";
const HERO_VIDEO_SRC  = "/assets/hero-video.mp4";

type HeroProps = {
  locale: string;
};

const Hero = ({ locale }: HeroProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Inject source after mount so the video never blocks initial paint.
    const source = document.createElement("source");
    source.src = HERO_VIDEO_SRC;
    source.type = "video/mp4";
    video.appendChild(source);

    // Once enough data is loaded, fade in the video over the poster.
    const handleCanPlay = () => {
      video.play().catch(() => {/* Autoplay blocked – poster stays visible, no error */});
      setVideoReady(true);
    };

    video.addEventListener("canplaythrough", handleCanPlay, { once: true });
    video.load();

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
    };
  }, []);

  const currentLocale = getLocale(locale);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-charcoal text-white">
      {/*
       * LCP element: the poster image is a static <img> that renders instantly.
       * It fades out smoothly once the video is ready to play.
       * Using next/image here would add unnecessary JS overhead for a full-bleed
       * decorative background; a plain <img> with explicit dimensions is more
       * appropriate and avoids layout shift.
       */}
      <div className="absolute inset-0 h-full w-full">
        {/* Poster image – becomes the LCP element, visible immediately */}
        <img
          src={HERO_POSTER_SRC}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          className="absolute left-0 top-0 h-full w-full object-cover"
          style={{
            transition: "opacity 0.6s ease",
            opacity: videoReady ? 0 : 1,
            zIndex: 1,
          }}
        />

        {/*
         * Video: preload="none" means zero network cost on initial load.
         * The <source> is appended by useEffect after mount.
         * autoPlay / loop / muted / playsInline are set as attributes so they
         * are honoured once play() is called.
         */}
        <video
          ref={videoRef}
          preload="none"
          loop
          muted
          playsInline
          className="absolute left-0 top-0 h-full w-full object-cover"
          style={{
            transition: "opacity 0.6s ease",
            opacity: videoReady ? 1 : 0,
            zIndex: 2,
          }}
        />

        {/* Gradient overlays – unchanged */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            background:
              "linear-gradient(112deg, rgba(10, 10, 10, 0.9) 0%, rgba(10, 10, 10, 0.62) 42%, rgba(10, 10, 10, 0.28) 72%, rgba(10, 10, 10, 0.72) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            background:
              "radial-gradient(circle at 22% 22%, rgba(212, 181, 109, 0.22) 0%, rgba(212, 181, 109, 0) 32%), linear-gradient(180deg, rgba(10, 10, 10, 0.05) 0%, rgba(10, 10, 10, 0.45) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-charcoal/40 to-background" style={{ zIndex: 3 }} />
      </div>

      {/* Content sits above all media layers */}
      <div className="container relative flex min-h-[100svh] items-center justify-center py-20" style={{ zIndex: 10 }}>
        <div className="fade-in-up w-full text-center">
          <div className="overflow-hidden px-2 sm:px-4 md:px-0">
            <h1 className="mb-5 text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl">
              {t(currentLocale, "hero.title")}
            </h1>
          </div>
          <p className="mb-5 px-2 text-base font-light text-white/80 sm:px-4 sm:text-lg md:mb-8 md:px-0 md:text-xl">
            {t(currentLocale, "hero.subtitle")}
          </p>
          <p className="mx-auto mb-8 max-w-2xl px-2 text-sm font-light leading-relaxed text-white/70 sm:px-4 sm:text-base md:px-0 md:text-lg">
            {t(currentLocale, "hero.description")}
          </p>
          <div className="mx-auto flex w-full max-w-md flex-col justify-center gap-3 px-2 sm:max-w-none sm:flex-row sm:px-4 md:px-0">
            <Button variant="gold" size="lg" className="w-full sm:w-auto" asChild>
              <a href="#collections">{t(currentLocale, "hero.explore_collections")}</a>
            </Button>
            <Link href={localizedPath(currentLocale, "/contact#contact-form")} className="block w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
              >
                {t(currentLocale, "hero.contact_us")}
              </Button>
            </Link>
          </div>
          <div className="mt-5">
            <Link
              href={localizedPath(currentLocale, "/textile-tunisie")}
              className="text-sm font-medium text-white/80 underline decoration-white/40 underline-offset-4 transition hover:text-white"
            >
              {t(currentLocale, "footer.textile_tunisie", "Textile Tunisia")}
            </Link>
          </div>
        </div>
      </div>

      <a
        href="#why-choose-us"
        aria-label="Scroll to next section"
        className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white transition-opacity hover:opacity-80 sm:bottom-8"
      >
        <span className="text-xs uppercase tracking-[0.28em] text-white/70">Scroll</span>
        <span className="flex h-12 w-12 animate-bounce items-center justify-center rounded-full border border-white/30 bg-background/10 backdrop-blur-sm">
          <ArrowDown className="h-5 w-5" />
        </span>
      </a>
    </section>
  );
};

export default Hero;
