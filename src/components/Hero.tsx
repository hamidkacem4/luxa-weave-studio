import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [currentSlide] = useState(0);

  return (
    <section className="relative h-screen w-full overflow-hidden -mt-16">
      {/* Hero Video */}
      <div className="absolute inset-0 w-screen h-screen z-10">
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
      <div className="container relative z-20 flex h-full items-center justify-center">
        <div className="text-center fade-in-up">
          <h1 className="mb-6 text-6xl font-bold leading-tight tracking-tight lg:text-7xl">
            MagTexco
          </h1>
          <p className="mb-8 text-xl text-muted-foreground font-light">
            Crafting Excellence in Every Thread
          </p>
          <p className="mb-8 text-lg text-muted-foreground/80 font-light max-w-2xl mx-auto">
            Premium textile sourcing and garment production for fashion brands worldwide. 
            Where tradition meets innovation, quality meets sustainability.
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="gold" size="lg">
              Explore Collections
            </Button>
            <Button variant="outline" size="lg" className="bg-background/80 backdrop-blur-sm">
              Contact Us
            </Button>
          </div>
        </div>
      </div>

      {/* Carousel Controls (for future implementation) */}
      <div className="absolute bottom-8 right-8 z-30 flex gap-2">
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button className="flex h-12 w-12 items-center justify-center rounded-full bg-background/80 backdrop-blur-sm transition-all hover:bg-background">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
