import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import { normalizeLocale } from "@/lib/locale";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export { SITE_URL, SITE_NAME } from "@/lib/site";

export type AppLocale = "en" | "fr" | "ko" | "it";

type ImageSource = string | StaticImageData | null | undefined;

type MetadataOptions = {
  locale?: string;
  path?: string;
  title: string;
  description: string;
  keywords?: string;
  image?: ImageSource;
  type?: "website" | "article";
};

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function getLocale(locale?: string): AppLocale {
  return normalizeLocale(locale) as AppLocale;
}

export function localizedPath(locale?: string, path = "") {
  const normalizedLocale = getLocale(locale);
  const normalizedPath = path
    ? path.startsWith("/")
      ? path
      : `/${path}`
    : "";

  // English (default) has no prefix
  if (normalizedLocale === "en") {
    return normalizedPath || "/";
  }

  // Other locales keep their prefix
  return `/${normalizedLocale}${normalizedPath}`;
}

export function localizedUrl(locale?: string, path = "") {
  return `${SITE_URL}${localizedPath(locale, path)}`;
}

export function toAbsoluteUrl(value: ImageSource) {
  if (!value) {
    return `${SITE_URL}/og-image.jpg`;
  }

  const source = typeof value === "string" ? value : value.src;
  if (!source) {
    return `${SITE_URL}/og-image.jpg`;
  }

  return source.startsWith("http")
    ? source
    : `${SITE_URL}${source.startsWith("/") ? "" : "/"}${source}`;
}

export function buildMetadata({
  locale,
  path = "",
  title,
  description,
  keywords,
  image,
  type = "website",
}: MetadataOptions): Metadata {
  const canonical = localizedUrl(locale, path);
  const imageUrl = toAbsoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        "x-default": localizedUrl("en", path),
        en: localizedUrl("en", path),
        fr: localizedUrl("fr", path),
        ko: localizedUrl("ko", path),
        it: localizedUrl("it", path),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function buildLocaleAlternates(locale: string | undefined, path = "") {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      "x-default": localizedUrl("en", path),
      en: localizedUrl("en", path),
      fr: localizedUrl("fr", path),
      ko: localizedUrl("ko", path),
      it: localizedUrl("it", path),
    },
  };
}

export function buildBreadcrumbSchema(idBase: string, items: BreadcrumbItem[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${idBase}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
