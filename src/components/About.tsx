import { useTranslation } from "react-i18next";
import Image from "next/image";
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
              <Image
                src={aboutImage}
                alt={t('about.image_alt')}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
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
              <p>
  {t('about.stats.experience')}
           
              </p>
              
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4'">
           
              <div>
                <div className="text-4xl font-bold text-gold">50+</div>
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