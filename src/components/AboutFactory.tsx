import { useTranslation } from "react-i18next";

const AboutFactory = () => {
  const { t } = useTranslation();

  return (
    <section className="py-24">
      <div className="container mx-auto">
        <div className="text-center">
          <h2 className="mb-12 text-5xl font-bold tracking-tight">
            🏭 About Our Factory
          </h2>
        </div>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="text-left">
            <p className="text-lg text-gray-600 mb-8">
            Our factory is proud to be certified with ISO 9001, ISO 14001, GOTS, and GRS, reflecting our commitment to quality, environmental responsibility, and sustainable production.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our production process is divided into two main stages: Collection Phase and Production Phase, each carefully managed to ensure quality and precision.
            </p>
            <div className="grid gap-8 md:grid-cols-1">
              <div>
                <h3 className="mb-4 text-3xl font-bold tracking-tight">🧵 Collection Phase</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>PHASE 1 — Receipt of the technical file and creation of the pattern.</li>
                  <li>PHASE 2 — Sourcing of fabrics and accessories, prototype making.</li>
                  <li>PHASE 3 — Technical adjustments and repetitions (SMS) before production.</li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-3xl font-bold tracking-tight">⚙️ Production Phase</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>PHASE 1 — Technical preparation and seeded players (TDS).</li>
                  <li>PHASE 2 — Cutting, sewing, washing and finishing.</li>
                  <li>PHASE 3 — Export and delivery of finished products.</li>
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