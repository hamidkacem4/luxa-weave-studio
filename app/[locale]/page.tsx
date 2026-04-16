import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import IndexPage from "@/screens/Index";
import { buildBreadcrumbSchema, buildMetadata, localizedUrl } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { t } from "@/lib/i18n-utils";

export function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Metadata {
  return buildMetadata({
    locale: params.locale,
    title: t(
      params.locale,
      "meta.title",
      "MagTexco - Textile Manufacturer Tunisia | Clothing Manufacturers Tunisia",
    ),
    description: t(
      params.locale,
      "meta.description",
      "MagTexco is Tunisia's leading textile manufacturer. Premium fabrics, custom production, and global delivery.",
    ),
    keywords: t(params.locale, "meta.keywords"),
  });
}

export default function HomePage({
  params,
}: {
  params: { locale: string };
}) {
  const pageUrl = localizedUrl(params.locale);
  const webPageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: t(params.locale, "meta.title", "MagTexco"),
    description: t(params.locale, "meta.description"),
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
      url: pageUrl,
    },
  ]);

  return (
    <>
      <JsonLd data={[webPageSchema, breadcrumbSchema]} />
      <IndexPage locale={params.locale} />
    </>
  );
}
