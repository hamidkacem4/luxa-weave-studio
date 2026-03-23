import { Link } from "react-router-dom";
import collection1 from "@/assets/collection-1.jpg";
import collection2 from "@/assets/collection-2.jpg";
import collection3 from "@/assets/collection-3.jpg";
import collection4 from "@/assets/collection-4.jpg";

const collections = [
  {
    id: 1,
    title: "Premium Linen",
    description: "Natural, breathable excellence",
    image: collection1,
    slug: "premium-linen",
  },
  {
    id: 2,
    title: "Silk Collection",
    description: "Luxurious softness",
    image: collection2,
    slug: "silk-collection",
  },
  {
    id: 3,
    title: "Cotton Essentials",
    description: "Comfort redefined",
    image: collection3,
  },
  {
    id: 4,
    title: "Wool Blends",
    description: "Warmth meets elegance",
    image: collection4,
  },
];

const Collections = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 text-center fade-in-up">
          <h2 className="mb-4 text-5xl font-bold tracking-tight">Our Collections</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Discover our curated selection of premium fabrics, sourced with meticulous attention to detail
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {collections.map((item, index) => (
            <div
              key={item.id}
              className="group fade-in-up cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-4 aspect-square overflow-hidden bg-muted">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <h3 className="mb-2 text-2xl font-semibold">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collections;
