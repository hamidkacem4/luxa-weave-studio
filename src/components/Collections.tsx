import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { collectionsData } from "@/data/collectionsData";

const Collections = () => {
  const { t, i18n } = useTranslation();
  const collections = t('collections.items', { returnObjects: true }) as Array<{ slug: string; title: string; description: string }>;

  return (
    <section id="collections" className="py-24 bg-cream">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 text-center fade-in-up">
          <h2 className="mb-4 text-5xl font-bold tracking-tight">{t('collections.title')}</h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('collections.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {Array.isArray(collections) && collections.map((item, index) => {
            // Pull the banner image directly from our easy-to-edit data file
            const bannerImage = collectionsData[item.slug]?.bannerImage;

            return (
              <Link
                key={item.slug}
                href={`/${i18n.language}/collections/${item.slug}`}
                className="group fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="relative mb-6 aspect-[3/4] overflow-hidden bg-muted shadow-sm transition-all duration-500 group-hover:shadow-xl">
                  {bannerImage && (
                    <Image
                      src={bannerImage}
                      alt={`A model wearing ${item.title} from our collection`}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full transition-transform duration-500 group-hover:translate-y-0 bg-gradient-to-t from-charcoal/80 to-transparent">
                    <span className="text-white text-sm font-medium tracking-wider uppercase">{t('hero.explore_collections')}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-serif font-semibold tracking-tight">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed line-clamp-2">{item.description}</p>
                  <div className="pt-2">
                    <span className="inline-block text-sm font-semibold text-gold-dark uppercase tracking-widest border-b border-transparent group-hover:border-gold-dark transition-all duration-300">
                      {t('blog.read_more', 'Discover More')}
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Collections;