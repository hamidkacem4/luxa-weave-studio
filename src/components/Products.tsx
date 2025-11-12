import { useState } from "react";
import { Button } from "@/components/ui/button";
import productMenViscose from "@/assets/product-men-viscose.jpg";
import productMenSilk from "@/assets/product-men-silk.jpg";
import productMenCotton from "@/assets/product-men-cotton.jpg";
import productWomenViscose from "@/assets/product-women-viscose.jpg";
import productWomenSilk from "@/assets/product-women-silk.jpg";
import productWomenCotton from "@/assets/product-women-cotton.jpg";
import fashionTexture1 from "@/assets/fashion-texture-1.jpg";
import fashionTexture2 from "@/assets/fashion-texture-2.jpg";

const menProducts = [
  {
    id: 1,
    title: "Viscose Shirt",
    fabric: "Premium Viscose",
    description: "Luxurious drape with natural breathability",
    image: productMenViscose,
  },
  {
    id: 2,
    title: "Silk Shirt",
    fabric: "Pure Silk",
    description: "Ultimate elegance and smooth texture",
    image: productMenSilk,
  },
  {
    id: 3,
    title: "Cotton Shirt",
    fabric: "Egyptian Cotton",
    description: "Classic comfort with crisp finish",
    image: productMenCotton,
  },
];

const womenProducts = [
  {
    id: 4,
    title: "Viscose Dress",
    fabric: "Premium Viscose",
    description: "Flowing silhouette with elegant movement",
    image: productWomenViscose,
  },
  {
    id: 5,
    title: "Silk Dress",
    fabric: "Pure Silk",
    description: "Timeless sophistication and luxury",
    image: productWomenSilk,
  },
  {
    id: 6,
    title: "Cotton Dress",
    fabric: "Premium Cotton",
    description: "Refined simplicity and comfort",
    image: productWomenCotton,
  },
];

const Products = () => {
  const [activeTab, setActiveTab] = useState<"men" | "women">("women");

  const currentProducts = activeTab === "men" ? menProducts : womenProducts;

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Fashion texture backgrounds */}
      <div className="absolute inset-0 opacity-10">
        <img 
          src={activeTab === "women" ? fashionTexture1 : fashionTexture2} 
          alt="" 
          className="absolute top-0 right-0 w-1/2 h-96 object-cover animate-fade-in"
        />
        <img 
          src={activeTab === "women" ? fashionTexture2 : fashionTexture1} 
          alt="" 
          className="absolute bottom-0 left-0 w-1/2 h-96 object-cover animate-fade-in"
        />
      </div>
      
      {/* Decorative fashion elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-40 left-0 w-px h-64 bg-gradient-to-b from-transparent via-gold-dark to-transparent opacity-20" />
        <div className="absolute top-40 right-0 w-px h-64 bg-gradient-to-b from-transparent via-gold-dark to-transparent opacity-20" />
        <div className="absolute top-20 left-10 w-32 h-32 border border-gold-dark/20 rotate-45" />
        <div className="absolute bottom-20 right-10 w-40 h-40 border border-gold-dark/20 rounded-full" />
      </div>
      
      <div className="container relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center fade-in-up relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold-dark to-transparent mb-8" />
          <h2 className="mb-4 text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground via-gold-dark to-foreground bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground italic">
            Explore our curated collections of fashion pieces crafted from the finest fabrics
          </p>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold-dark to-transparent mt-8" />
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-4 mb-12 fade-in-up">
          <Button
            variant={activeTab === "women" ? "default" : "outline"}
            size="lg"
            onClick={() => setActiveTab("women")}
            className="min-w-[140px]"
          >
            Women
          </Button>
          <Button
            variant={activeTab === "men" ? "default" : "outline"}
            size="lg"
            onClick={() => setActiveTab("men")}
            className="min-w-[140px]"
          >
            Men
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {currentProducts.map((product, index) => (
            <div
              key={product.id}
              className="group fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-muted rounded-sm border border-border/50 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:border-gold-dark/30">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                
                {/* Fashion tag overlay */}
                <div className="absolute top-4 right-4 bg-gold-dark/90 backdrop-blur-sm text-white px-3 py-1 text-xs font-medium tracking-wider opacity-0 transition-all duration-300 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
                  {product.fabric}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-2xl font-semibold tracking-tight group-hover:text-gold-dark transition-colors duration-300">{product.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                <div className="pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm text-gold-dark font-medium tracking-wide">Explore Collection →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
