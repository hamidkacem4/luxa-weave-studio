import { useTranslation } from "react-i18next";
import { CheckCircle, Award, Leaf, HeartHandshake } from "lucide-react";

const featureIcons = [CheckCircle, Award, Leaf, HeartHandshake];

const WhyChooseUs = () => {
  const { t } = useTranslation();
  const features = t('why_choose_us.features', { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <section className="py-24 bg-cream">
      <div className="container">
        <div className="mx-auto max-w-4xl text-center mb-16">
          <h2 className="mb-6 text-5xl font-bold tracking-tight">
            {t('why_choose_us.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('why_choose_us.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.isArray(features) && features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <div
                key={feature.title}
                className="flex flex-col items-center text-center p-6 bg-background rounded-sm shadow-sm fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold-light">
                  {Icon && <Icon className="h-6 w-6 text-gold-dark" />}
                </div>
                <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;