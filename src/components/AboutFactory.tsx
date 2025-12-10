import { useTranslation } from "react-i18next";

const AboutFactory = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="mb-12 text-5xl font-bold tracking-tight">
            {t('about_factory.title')}
          </h2>
        </div>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="text-left">
            <p className="text-lg text-gray-600 mb-8">
              {t('about_factory.certifications')}
            </p>
            <p className="text-lg text-gray-600 mb-8">
              {t('about_factory.intro')}
            </p>
            <div className="grid gap-8 md:grid-cols-1">
              <div>
                <h3 className="mb-4 text-3xl font-bold tracking-tight">{t('about_factory.collection_phase_title')}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t('about_factory.collection_phase.phase1')}</li>
                  <li>{t('about_factory.collection_phase.phase2')}</li>
                  <li>{t('about_factory.collection_phase.phase3')}</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-3xl font-bold tracking-tight">{t('about_factory.production_phase_title')}</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>{t('about_factory.production_phase.phase1')}</li>
                  <li>{t('about_factory.production_phase.phase2')}</li>
                  <li>{t('about_factory.production_phase.phase3')}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-sm shadow-lg">
            <iframe
              src="https://player.cloudinary.com/embed/?cloud_name=duqbe1hoq&public_id=WhatsApp_Video_2025-11-06_at_11.20.21_AM_nc7fgl&profile=cld-default"
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
      </div>
    </section>
  );
};

export default AboutFactory;