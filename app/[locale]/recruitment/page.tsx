import RecruitmentPage from "@/screens/RecruitmentPage";
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
    path: "/recruitment",
    title: `${t(params.locale, "nav.recruitment", "Careers")} | MagTexco`,
    description: t(
      params.locale,
      "recruitment.message",
      "Explore textile and apparel career opportunities at MagTexco in Tunisia.",
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
  const pageUrl = localizedUrl(params.locale, "/recruitment");
  const recruitmentPageSchema = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: `${t(params.locale, "nav.recruitment", "Careers")} | MagTexco`,
    description: t(params.locale, "recruitment.message"),
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
      name: t(params.locale, "nav.recruitment", "Careers"),
      url: pageUrl,
    },
  ]);

  return (
    <>
      <JsonLd data={[recruitmentPageSchema, breadcrumbSchema]} />
      <RecruitmentPage locale={params.locale} />
    </>
  );
}
