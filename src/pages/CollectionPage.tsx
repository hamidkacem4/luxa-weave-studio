import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsAppButton";

import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";

import linenDetail1 from "@/assets/linen-detail-1.jpg";
import linenDetail2 from "@/assets/linen-detail-2.jpg";
import linenDetail3 from "@/assets/linen-detail-3.jpg";

import silkDetail1 from "@/assets/silk-detail-1.jpg";
import silkDetail2 from "@/assets/silk-detail-2.jpg";
import silkDetail3 from "@/assets/silk-detail-3.jpg";

import cottonDetail1 from "@/assets/cotton-detail-1.jpg";
import cottonDetail2 from "@/assets/cotton-detail-2.jpg";
import cottonDetail3 from "@/assets/cotton-detail-3.jpg";

import woolDetail1 from "@/assets/wool-detail-1.jpg";
import woolDetail2 from "@/assets/wool-detail-2.jpg";
import woolDetail3 from "@/assets/wool-detail-3.jpg";

const collectionsData: Record<string, {
  title: string;
  subtitle: string;
  description: string;
  hero: string;
  images: { src: string; caption: string }[];
  details: string[];
}> = {
  "premium-linen": {
    title: "Premium Linen",
    subtitle: "Natural, breathable excellence",
    description: "Our Premium Linen collection showcases the finest European flax fibers, woven into fabrics that embody natural elegance. Each piece is crafted to deliver exceptional breathability, a luxurious hand feel, and a timeless aesthetic that improves with every wash.",
    hero: collection1,
    images: [
      { src: linenDetail1, caption: "Close-up of our signature linen weave" },
      { src: linenDetail2, caption: "Natural linen in various earth tones" },
      { src: linenDetail3, caption: "Premium linen rolls ready for production" },
    ],
    details: [
      "100% European flax fiber",
      "Pre-washed for softness",
      "Available in 24 natural colorways",
      "Weight range: 120–280 GSM",
    ],
  },
  "silk-collection": {
    title: "Silk Collection",
    subtitle: "Luxurious softness",
    description: "Indulge in the unparalleled luxury of our Silk Collection. Sourced from the finest mulberry silk, our fabrics offer a luminous sheen, incredible drape, and a sensuous touch that defines true opulence. Perfect for evening wear, bridal, and haute couture.",
    hero: collection2,
    images: [
      { src: silkDetail1, caption: "Rich jewel-toned silk with luminous sheen" },
      { src: silkDetail2, caption: "Our silk range in vibrant colors" },
      { src: silkDetail3, caption: "Silk swatches in gradient tones" },
    ],
    details: [
      "Grade 6A mulberry silk",
      "Momme weight: 12–30mm",
      "Available in 40+ colors",
      "Charmeuse, chiffon & dupioni weaves",
    ],
  },
  "cotton-essentials": {
    title: "Cotton Essentials",
    subtitle: "Comfort redefined",
    description: "Our Cotton Essentials collection brings together the world's finest long-staple cottons. From crisp poplins to soft jerseys, each fabric is selected for its superior hand feel, durability, and versatility. The foundation of any great wardrobe.",
    hero: collection3,
    images: [
      { src: cottonDetail1, caption: "Premium cotton weave close-up" },
      { src: cottonDetail2, caption: "Cotton clothing essentials display" },
      { src: cottonDetail3, caption: "Our full cotton color palette" },
    ],
    details: [
      "Egyptian & Supima cotton",
      "Thread count: 200–1000",
      "Organic options available",
      "Poplin, twill, jersey & sateen",
    ],
  },
  "wool-blends": {
    title: "Wool Blends",
    subtitle: "Warmth meets elegance",
    description: "Our Wool Blends collection merges traditional craftsmanship with modern textile innovation. Featuring premium merino, cashmere blends, and heritage tweeds, these fabrics deliver exceptional warmth, structure, and sophistication for outerwear and tailoring.",
    hero: collection4,
    images: [
      { src: woolDetail1, caption: "Herringbone wool weave detail" },
      { src: woolDetail2, caption: "Elegant wool outerwear on display" },
      { src: woolDetail3, caption: "Premium wool swatches in rich tones" },
    ],
    details: [
      "Merino & cashmere blends",
      "Weight: 200–500 GSM",
      "Heritage tweed patterns",
      "Moth-resistant treatment available",
    ],
  },
};

const CollectionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const collection = slug ? collectionsData[slug] : null;

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Collection Not Found</h1>
          <Link to="/" className="text-gold-dark hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={collection.hero}
          alt={collection.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            {collection.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/80 italic">
            {collection.subtitle}
          </p>
        </div>
      </div>

      <Navigation />

      {/* Back link */}
      <div className="container pt-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Collections
        </Link>
      </div>

      {/* Description */}
      <section className="py-16 bg-cream">
        <div className="container max-w-4xl text-center">
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
            {collection.description}
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Gallery
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collection.images.map((img, index) => (
              <div
                key={index}
                className="group fade-in-up overflow-hidden rounded-sm"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={img.src}
                    alt={img.caption}
                    loading="lazy"
                    width={800}
                    height={1024}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center italic">
                  {img.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 bg-cream">
        <div className="container max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
            Fabric Details
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {collection.details.map((detail, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 bg-background rounded-sm border border-border/50"
              >
                <div className="w-2 h-2 rounded-full bg-gold-dark shrink-0" />
                <span className="text-foreground">{detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-cream py-12">
        <div className="container">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © 2024 MagTexco. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">Privacy Policy</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      <WhatsAppButton />
    </div>
  );
};

export default CollectionPage;
