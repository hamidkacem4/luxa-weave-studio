import { useTranslation } from "react-i18next";
import aboutImage from "@/assets/about-craftsmanship.jpg";

const About = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image */}
          <div className="fade-in order-2 lg:order-1">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
              <img
                src={aboutImage}
                alt={t('about.image_alt')}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="fade-in-up order-1 lg:order-2">
            <h2 className="mb-6 text-5xl font-bold tracking-tight">
              {t('about.title')}
            </h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                {t('about.paragraph1')}
              </p>
              <p>
                {t('about.paragraph2')}
              </p>
              <p>
                {t('about.paragraph3')}
              </p>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-gold">30+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.experience')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold">500+</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.partners')}</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-gold">100%</div>
                <div className="text-sm text-muted-foreground">{t('about.stats.quality')}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;