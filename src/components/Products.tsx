"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import productMenViscose from "@/assets/product-men-viscose.jpg";
import productMenSilk from "@/assets/product-men-silk.jpg";
import productMenCotton from "@/assets/product-men-cotton.jpg";
import productWomenViscose from "@/assets/product-women-viscose.jpg";
import productWomenSilk from "@/assets/product-women-silk.jpg";
import productWomenCotton from "@/assets/product-women-cotton.jpg";

const menProductImages = [productMenViscose, productMenSilk, productMenCotton];
const womenProductImages = [productWomenViscose, productWomenSilk, productWomenCotton];

type ProductsProps = {
  locale?: string;
};

const Products = ({ locale }: ProductsProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"men" | "women">("women");

  const menProducts = t('products.men', { returnObjects: true }) as Array<{ title: string; material: string; description: string }>;
  const womenProducts = t('products.women', { returnObjects: true }) as Array<{ title: string; material: string; description: string }>;

  const currentProducts = activeTab === "men" ? menProducts : womenProducts;
  const currentProductImages = activeTab === "men" ? menProductImages : womenProductImages;

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="container">
        {/* Section Header */}
        <div className="mb-10 text-center fade-in-up sm:mb-16">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">{t('products.title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('products.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="mb-10 flex flex-col justify-center gap-3 fade-in-up sm:mb-12 sm:flex-row sm:gap-4">
          <Button
            variant={activeTab === "women" ? "default" : "outline"}
            size="lg"
            onClick={() => setActiveTab("women")}
            className="w-full sm:w-auto sm:min-w-[140px]"
          >
            {t('products.women_tab')}
          </Button>
          <Button
            variant={activeTab === "men" ? "default" : "outline"}
            size="lg"
            onClick={() => setActiveTab("men")}
            className="w-full sm:w-auto sm:min-w-[140px]"
          >
            {t('products.men_tab')}
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {Array.isArray(currentProducts) && currentProducts.map((product, index) => (
            <div
              key={index}
              className="group fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
      <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-muted rounded-sm">
        <Image
          src={currentProductImages[index]}
          alt={`A model wearing a ${product.title}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
              <div className="space-y-2">
                <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="text-xl font-semibold sm:text-2xl">{product.title}</h3>
                  <span className="text-sm font-medium text-gold-dark">{product.material}</span>
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
