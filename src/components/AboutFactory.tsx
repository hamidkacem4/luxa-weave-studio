import { getLocale } from "@/lib/seo";
import { t } from "@/lib/i18n-utils";

type AboutFactoryProps = {
  locale: string;
};

const AboutFactory = ({ locale }: AboutFactoryProps) => {
  const currentLocale = getLocale(locale);

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="mb-10 text-3xl font-bold tracking-tight sm:mb-12 sm:text-4xl lg:text-5xl">
            {t(currentLocale, "about_factory.title")}
          </h2>
        </div>
        <div className="grid items-center gap-10 sm:gap-12 md:grid-cols-2">
          <div className="text-left">
            <p className="mb-6 text-base text-gray-600 sm:mb-8 sm:text-lg">
              {t(currentLocale, "about_factory.certifications")}
            </p>
            <p className="mb-6 text-base text-gray-600 sm:mb-8 sm:text-lg">
              {t(currentLocale, "about_factory.intro")}
            </p>
            <div className="grid gap-8 md:grid-cols-1">
              <div>
                <h3 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">{t(currentLocale, "about_factory.collection_phase_title")}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t(currentLocale, "about_factory.collection_phase.phase1")}</li>
                  <li>{t(currentLocale, "about_factory.collection_phase.phase2")}</li>
                  <li>{t(currentLocale, "about_factory.collection_phase.phase3")}</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">{t(currentLocale, "about_factory.production_phase_title")}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t(currentLocale, "about_factory.production_phase.phase1")}</li>
                  <li>{t(currentLocale, "about_factory.production_phase.phase2")}</li>
                  <li>{t(currentLocale, "about_factory.production_phase.phase3")}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-sm shadow-lg">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=duqbe1hoq&public_id=WhatsApp_Video_2025-11-06_at_11.20.21_AM_wvds8y"
              width="640"
              height="360"
              style={{ height: 'auto', width: '100%', aspectRatio: '640 / 360' }}
              allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
              allowFullScreen
              frameBorder="0"
              title="Factory Tour Video"
            />
          </div>
        </div>

        {/* Detailed Expertise Section (Added for SEO and Information Depth) */}
        <div className="mt-16 border-t border-cream pt-16 sm:mt-24 sm:pt-24">
          <div className="max-w-5xl mx-auto">
            <h3 className="mb-8 text-center text-3xl font-bold text-charcoal sm:mb-10 sm:text-4xl">
              {t(currentLocale, "about_factory.detailed_expertise.title")}
            </h3>
            <div className="grid gap-8 sm:gap-10 md:grid-cols-3 md:gap-12">
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {t(currentLocale, "about_factory.detailed_expertise.p1")}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {t(currentLocale, "about_factory.detailed_expertise.p2")}
                </p>
              </div>
              <div className="space-y-4">
                <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {t(currentLocale, "about_factory.detailed_expertise.p3")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutFactory;
