import ContactPage from "@/screens/ContactPage";
import JsonLd from "@/components/JsonLd";
import { buildBreadcrumbSchema, buildMetadata, localizedUrl } from "@/lib/seo";
import { PREFIXED_LOCALES, SITE_URL } from "@/lib/site";
import { t } from "@/lib/i18n-utils";
import type { Metadata } from "next";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildMetadata({
    locale: params.locale,
    path: "/contact",
    title: `${t(params.locale, "nav.contact", "Contact")} | MagTexco`,
    description: t(
      params.locale,
      "contact.subtitle",
      "Get in touch with MagTexco for textile sourcing, custom production, and apparel manufacturing inquiries.",
    ),
  });
}

export async function generateStaticParams() {
  return PREFIXED_LOCALES.map((locale) => ({ locale }));
}

export default function Page({
  params,
}: {
  params: { locale: string };
}) {
  const pageUrl = localizedUrl(params.locale, "/contact");
  const contactPageSchema = {
    "@type": "ContactPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${t(params.locale, "nav.contact", "Contact")} | MagTexco`,
    description: t(params.locale, "contact.subtitle"),
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: params.locale,
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
    {
      name: t(params.locale, "nav.home", "Home"),
      url: localizedUrl(params.locale),
    },
    {
      name: t(params.locale, "nav.contact", "Contact"),
      url: pageUrl,
    },
  ]);

  return (
    <>
      <JsonLd data={[contactPageSchema, breadcrumbSchema]} />
      <ContactPage locale={params.locale} />
    </>
  );
}
