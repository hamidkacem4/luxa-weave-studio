import { useState } from "react";
import { Button } from "@/components/ui/button";
import productMenViscose from "@/assets/product-men-viscose.jpg";
import productMenSilk from "@/assets/product-men-silk.jpg";
import productMenCotton from "@/assets/product-men-cotton.jpg";
import productWomenViscose from "@/assets/product-women-viscose.jpg";
import productWomenSilk from "@/assets/product-women-silk.jpg";
import productWomenCotton from "@/assets/product-women-cotton.jpg";

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
    <section className="py-24 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 text-center fade-in-up">
          <h2 className="mb-4 text-5xl font-bold tracking-tight">Our Products</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Explore our curated collections of fashion pieces crafted from the finest fabrics
          </p>
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
              <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-muted rounded-sm">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">{product.title}</h3>
                  <span className="text-sm text-gold-dark font-medium">{product.fabric}</span>
                </div>
                <p className="text-muted-foreground">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
