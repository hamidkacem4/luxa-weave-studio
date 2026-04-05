import { useTranslation } from "react-i18next";
import { Leaf, Recycle, Heart, Award } from "lucide-react";
import Image from "next/image";
import sustainabilityImage from "@/assets/sustainability.jpg";

const featureIcons = [Leaf, Recycle, Heart, Award];

const Sustainability = () => {
  const { t } = useTranslation();
  const features = t('sustainability.features', { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <section className="py-24 bg-cream">
      <div className="container">
        {/* Header */}
        <div className="mb-16 text-center fade-in-up">
          <h2 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight">
            {t('sustainability.title')}
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('sustainability.subtitle')}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16 fade-in">
          <div className="relative aspect-[21/9] overflow-hidden rounded-sm">
            <Image
              src={sustainabilityImage}
              alt="A view of a sustainable cotton field, which is one of the organic materials we use in our Tunisian textile factory."
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {Array.isArray(features) && features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <div
                key={feature.title}
                className="fade-in-up text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
                  {Icon && <Icon className="h-8 w-8 text-gold-dark" />}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sustainability;