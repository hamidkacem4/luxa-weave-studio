import Image from "next/image";
import aboutImage from "@/assets/about-craftsmanship.jpg";
import { getLocale } from "@/lib/seo";
import { t } from "@/lib/i18n-utils";

type AboutProps = {
  locale: string;
};

const About = ({ locale }: AboutProps) => {
  const currentLocale = getLocale(locale);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="fade-in order-2 lg:order-1">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
              <Image
                src={aboutImage}
                alt={t(currentLocale, "about.image_alt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content */}
          <div className="fade-in-up order-1 lg:order-2">
            <h2 className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              {t(currentLocale, "about.title")}
            </h2>
            <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              <p>
                {t(currentLocale, "about.paragraph1")}
              </p>
              <p>
                {t(currentLocale, "about.paragraph2")}
              </p>
              <p>
                {t(currentLocale, "about.paragraph3")}
              </p>
              <p>
  {t(currentLocale, "about.stats.experience")}
           
              </p>
              
            </div>
            
            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-6">
           
              <div>
                <div className="text-3xl font-bold text-gold sm:text-4xl">50+</div>
                <div className="text-sm text-muted-foreground">{t(currentLocale, "about.stats.partners")}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold sm:text-4xl">100%</div>
                <div className="text-sm text-muted-foreground">{t(currentLocale, "about.stats.quality")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
