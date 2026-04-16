import { CheckCircle, Award, Leaf, HeartHandshake } from "lucide-react";
import { getLocale } from "@/lib/seo";
import { getTranslationValue, t } from "@/lib/i18n-utils";
import JsonLd from "@/components/JsonLd";

const featureIcons = [CheckCircle, Award, Leaf, HeartHandshake];

type WhyChooseUsFeature = {
  title: string;
  description: string;
};

type WhyChooseUsProps = {
  locale: string;
};

const WhyChooseUs = ({ locale }: WhyChooseUsProps) => {
  const currentLocale = getLocale(locale);
  const features = getTranslationValue<WhyChooseUsFeature[]>(currentLocale, "why_choose_us.features", []);

  // Generate FAQ Schema based on features
  const faqSchema = {
    "@type": "FAQPage",
    "mainEntity": Array.isArray(features) ? features.map(feature => ({
      "@type": "Question",
      "name": feature.title,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": feature.description
      }
    })) : []
  };

  return (
    <section id="why-choose-us" className="scroll-mt-24 bg-cream py-16 sm:py-20 lg:py-24">
      <JsonLd data={faqSchema} />
      <div className="container">
        <div className="mx-auto mb-10 max-w-4xl text-center sm:mb-16">
          <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t(currentLocale, "why_choose_us.title")}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t(currentLocale, "why_choose_us.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.isArray(features) && features.map((feature, index) => {
            const Icon = featureIcons[index];
            return (
              <div
                key={feature.title}
                className="fade-in-up flex flex-col items-center rounded-sm bg-background p-5 text-center shadow-sm sm:p-6"
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
