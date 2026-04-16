import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import WhatsAppButton from "@/components/WhatsAppButton";
import WhatsAppContactForm from "@/components/WhatsAppContactForm";
import JsonLd from "@/components/JsonLd";
import heroTextileImage from "@/assets/hero-textile.jpg";
import factoryCloseupImage from "@/assets/textile-tunisie-factory-closeup.png";
import {
  buildBreadcrumbSchema,
  buildLocaleAlternates,
  getLocale,
  localizedPath,
  localizedUrl,
} from "@/lib/seo";
import { normalizeLocale } from "@/lib/locale";
import { PREFIXED_LOCALES, SITE_URL } from "@/lib/site";
import { getTranslationValue, t, type AppLocale } from "@/lib/i18n-utils";
import { blogPosts } from "@/data/blogPosts";

const PAGE_PATH = "/textile-tunisie";

export async function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export const dynamic = 'force-static';

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  const locale = getLocale(params.locale);
  const pageUrl = localizedUrl(locale, PAGE_PATH);
  const title = t(locale, "textile_tunisie.meta.title", "Fabricant textile en Tunisie | MAGTEXCO");
  const description = t(
    locale,
    "textile_tunisie.meta.description",
    "MagTexco est un fabricant textile en Tunisie spécialisé dans la confection, la qualité certifiée et l'export vers l'Europe.",
  );

  return {
    title,
    description,
    keywords: getTranslationValue<string[]>(locale, "textile_tunisie.meta.keywords", []),
    alternates: buildLocaleAlternates(locale, PAGE_PATH),
    openGraph: {
      title,
      description,
      url: pageUrl,
      siteName: "MAGTEXCO",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/textile-tunisie-factory-closeup.png`,
          width: 1200,
          height: 630,
          alt: t(locale, "textile_tunisie.hero.title", "MAGTEXCO Textile Tunisia"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/textile-tunisie-factory-closeup.png`],
    },
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  const locale = getLocale(params.locale);
  const pageUrl = localizedUrl(locale, PAGE_PATH);
  const hero = {
    title: t(locale, "textile_tunisie.hero.title"),
    subtitle: t(locale, "textile_tunisie.hero.subtitle"),
    description: t(locale, "textile_tunisie.hero.description"),
    quote: t(locale, "textile_tunisie.hero.cta_quote"),
    homeCta: t(locale, "textile_tunisie.hero.cta_home"),
  };
  const intro = {
    title: t(locale, "textile_tunisie.intro.title"),
    p1: t(locale, "textile_tunisie.intro.p1"),
    p2: t(locale, "textile_tunisie.intro.p2"),
  };
  const capacities = {
    title: t(locale, "textile_tunisie.capacities.title"),
    description: t(locale, "textile_tunisie.capacities.description"),
    bullets: getTranslationValue<string[]>(locale, "textile_tunisie.capacities.bullets", []),
  };
  const services = getTranslationValue<
    Array<{ title: string; description: string }>
  >(locale, "textile_tunisie.services.items", []);
  const servicesHeader = {
    title: t(locale, "textile_tunisie.services.title"),
    description: t(locale, "textile_tunisie.services.description"),
  };
  const exportSection = {
    title: t(locale, "textile_tunisie.export.title"),
    description: t(locale, "textile_tunisie.export.description"),
    countries: getTranslationValue<Array<{ title: string; description: string }>>(locale, "textile_tunisie.export.countries", []),
  };
  const quality = {
    title: t(locale, "textile_tunisie.quality.title"),
    description: t(locale, "textile_tunisie.quality.description"),
    certifications: getTranslationValue<string[]>(locale, "textile_tunisie.quality.certifications", []),
  };
  const why = {
    title: t(locale, "textile_tunisie.why.title"),
    description: t(locale, "textile_tunisie.why.description"),
    items: getTranslationValue<Array<{ title: string; description: string }>>(locale, "textile_tunisie.why.items", []),
  };
  const contactSection = {
    title: t(locale, "textile_tunisie.contact.title"),
    description: t(locale, "textile_tunisie.contact.description"),
    phoneLabel: t(locale, "textile_tunisie.contact.phone_label"),
    button: t(locale, "textile_tunisie.contact.button"),
    phoneNumber: t(locale, "textile_tunisie.contact.phone_number"),
  };
  const faqItems = getTranslationValue<Array<{ question: string; answer: string }>>(locale, "textile_tunisie.faq.items", []);

  const structuredData = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MAGTEXCO",
      url: SITE_URL,
      logo: `${SITE_URL}/logo.png`,
      description: t(
        locale,
        "textile_tunisie.meta.description",
        "MagTexco est un fabricant textile en Tunisie spécialisé dans la confection, la qualité certifiée et l'export vers l'Europe.",
      ),
      sameAs: [
        "https://www.facebook.com/profile.php?id=61570008207516",
        "https://www.linkedin.com/company/magtexco-the-factory",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+216-955-188-70",
        contactType: "customer service",
        availableLanguage: ["French", "English"],
      },
    },
    {
      "@type": "ManufacturingBusiness",
      "@id": `${SITE_URL}/#manufacturer`,
      name: "MAGTEXCO",
      description: t(
        locale,
        "textile_tunisie.meta.description",
        "Usine textile en Tunisie spécialisée dans la coupe, la confection, la finition et l'export textile vers l'Europe.",
      ),
      url: pageUrl,
      telephone: "+216-955-188-70",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sahline",
        addressLocality: "Sousse",
        addressCountry: "TN",
      },
      areaServed: ["FR", "IT", "DE"],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
          ],
          opens: "08:00",
          closes: "18:00",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
    buildBreadcrumbSchema(pageUrl, [
      { name: t(locale, "nav.home", "Home"), url: localizedUrl(locale) },
      { name: hero.title, url: pageUrl },
    ]),
  ];

  return (
    <>
      <JsonLd data={structuredData} />
      <Navigation locale={locale} />

      <main className="bg-white text-gray-900">
        <section className="relative overflow-hidden">
          <div className="relative">
            <Image
              src={heroTextileImage}
              alt={`${hero.title} - Tunisian Textile Factory`}
              className="h-[520px] w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="max-w-3xl text-center text-white">
                <p className="mb-4 text-sm uppercase tracking-[0.24em] text-gray-200">{hero.subtitle}</p>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">{hero.title}</h1>
                <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-200">{hero.description}</p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row justify-center">
                  <Link
                    href={localizedPath(locale, "/contact")}
                    className="inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-white transition hover:bg-gold-dark hover:text-charcoal"
                  >
                    {hero.quote}
                  </Link>
                  <Link
                    href={localizedPath(locale)}
                    className="inline-flex items-center justify-center rounded-full border border-white/80 bg-white/10 px-8 py-3 text-sm font-semibold text-white transition hover:bg-gold-dark hover:text-charcoal"
                  >
                    {hero.homeCta}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <article className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">{intro.title}</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">{intro.p1}</p>
            <p className="text-lg leading-8 text-gray-700">{intro.p2}</p>
          </section>

          <section className="mb-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-start">
              <div>
                <h2 className="text-3xl font-semibold text-gray-900 mb-6">{capacities.title}</h2>
                <p className="text-lg leading-8 text-gray-700 mb-6">{capacities.description}</p>
                <ul className="space-y-4 text-gray-700">
                  {capacities.bullets.map((bullet, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-gold-dark" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden rounded-3xl border border-gray-200 bg-gray-50">
                <Image
                  src={factoryCloseupImage}
                  alt={hero.title}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">{servicesHeader.title}</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">{servicesHeader.description}</p>
            <div className="grid gap-8 lg:grid-cols-3">
              {services.map((service) => (
                <div key={service.title}>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-700 leading-7">{service.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">{exportSection.title}</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">{exportSection.description}</p>
            <div className="grid gap-6 lg:grid-cols-3">
              {exportSection.countries.map((country) => (
                <div key={country.title} className="rounded-3xl border border-gray-200 p-6 bg-white">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{country.title}</h3>
                  <p className="text-gray-700 leading-7">{country.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">{quality.title}</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">{quality.description}</p>
            <ul className="grid gap-4 md:grid-cols-2 text-gray-700">
              {quality.certifications.map((item) => (
                <li key={item} className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                  <strong>{item.split(" - ")[0]}</strong>
                  <span className="block mt-1">{item.split(" - ")[1]}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">{why.title}</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">{why.description}</p>
            <div className="grid gap-6 lg:grid-cols-3 text-gray-700">
              {why.items.map((item) => (
                <div key={item.title} className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <h3 className="font-semibold mb-3">{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">{contactSection.title}</h2>
            <p className="text-lg leading-8 text-gray-700 mb-6">{contactSection.description}</p>
            <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div>
                <WhatsAppContactForm locale={locale} />
              </div>
              <div className="space-y-6">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-gray-700">{contactSection.phoneLabel}</p>
                  <a href={`tel:${contactSection.phoneNumber.replace(/\s+/g, "")}`} className="text-gold-dark font-semibold">
                    {contactSection.phoneNumber}
                  </a>
                </div>
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6">
                  <p className="text-gray-700">{t(locale, "textile_tunisie.contact.send_request", "Ou envoyez une demande en ligne :")}</p>
                  <Link
                    href={localizedPath(locale, "/contact")}
                    className="inline-flex items-center justify-center rounded-full bg-charcoal px-8 py-3 text-sm font-semibold text-white transition hover:bg-gold-dark hover:text-charcoal"
                  >
                    {contactSection.button}
                  </Link>
                </div>
                {/* Internal link to collections for SEO siloing */}
                <div className="rounded-3xl border border-gold/20 bg-gold/5 p-6">
                  <p className="text-gray-700 font-medium mb-3">{t(locale, "textile_tunisie.see_collections", "Découvrez nos produits finis :")}</p>
                  <Link
                    href={localizedPath(locale, "/#collections")}
                    className="text-gold-dark font-bold hover:underline flex items-center gap-2"
                  >
                    {t(locale, "textile_tunisie.collections_link", "Le Nostre Collezioni")} →
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-gray-50 rounded-3xl border border-gray-200 p-8">
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">{t(locale, "textile_tunisie.faq.title", "Questions fréquentes")}</h2>
            <div className="space-y-8">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3">{item.question}</h3>
                  <p className="text-gray-700 leading-7">{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Recent Blog Posts for fresh content signals and internal linking */}
          <section className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-900 mb-8">{t(locale, "textile_tunisie.recent_insights", "Dernières actualités textile")}</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {blogPosts.slice(0, 3).map((post) => {
                const pContent = post.translations[locale as AppLocale] || post.translations["en"];
                if (!pContent) return null;
                return (
                  <Link 
                    key={post.id} 
                    href={localizedPath(locale, `/blog/${post.slug}`)}
                    className="group block"
                  >
                    <div className="relative aspect-video mb-4 overflow-hidden rounded-2xl">
                      <Image 
                        src={post.image} 
                        alt={pContent.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-gold-dark transition-colors line-clamp-2">
                      {pContent.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          </section>
        </article>
      </main>
      <WhatsAppButton />
    </>
  );
}
