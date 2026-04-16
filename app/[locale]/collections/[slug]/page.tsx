import { collectionsData } from "@/data/collectionsData";
import JsonLd from "@/components/JsonLd";
import CollectionPage from "@/screens/CollectionPage";
import type { Metadata } from "next";
import {
  fromCollectionRouteSlug,
  toCollectionRouteSlug,
} from "@/lib/collectionSlugs";
import {
  buildBreadcrumbSchema,
  buildLocaleAlternates,
  getLocale,
  localizedPath,
  localizedUrl,
  toAbsoluteUrl,
} from "@/lib/seo";
import { PREFIXED_LOCALES, SITE_URL } from "@/lib/site";
import { t } from "@/lib/i18n-utils";
import { notFound, permanentRedirect } from "next/navigation";

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = getLocale(params.locale);
  const collectionSlug = fromCollectionRouteSlug(params.slug);
  const canonicalSlug = toCollectionRouteSlug(collectionSlug);
  const collection = collectionsData[collectionSlug];

  if (!collection) {
    return {
      title: "Collections | MagTexco",
      description:
        "Explore high-quality textile and apparel collections manufactured in Tunisia.",
      alternates: buildLocaleAlternates(locale, "/collections"),
    };
  }

  const title = t(locale, `collection_details.${collectionSlug}.title`, collectionSlug);
  const description = t(
    locale,
    `collection_details.${collectionSlug}.description`,
    "Explore this MagTexco collection of high-quality garments manufactured in Tunisia.",
  );

  return {
    title: `${title} | MagTexco`,
    description,
    alternates: buildLocaleAlternates(locale, `/collections/${canonicalSlug}`),
    openGraph: {
      title,
      description,
      url: localizedUrl(locale, `/collections/${canonicalSlug}`),
      type: "website",
      images: [{ url: toAbsoluteUrl(collection.bannerImage) }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [toAbsoluteUrl(collection.bannerImage)],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(collectionsData).flatMap((slug) =>
    PREFIXED_LOCALES.map((locale) => ({
      locale,
      slug: toCollectionRouteSlug(slug),
    })),
  );
}

export default function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = getLocale(params.locale);
  const collectionSlug = fromCollectionRouteSlug(params.slug);
  const canonicalSlug = toCollectionRouteSlug(collectionSlug);
  const collection = collectionsData[collectionSlug];

  if (!collection) {
    notFound();
  }

  if (params.slug !== canonicalSlug) {
    permanentRedirect(localizedPath(locale, `/collections/${canonicalSlug}`));
  }

  const pageUrl = localizedUrl(locale, `/collections/${canonicalSlug}`);
  const title = t(locale, `collection_details.${collectionSlug}.title`, collectionSlug);
  const description = t(
    locale,
    `collection_details.${collectionSlug}.description`,
    "",
  );
  const products = [...collection.women, ...collection.men];
  const itemListId = `${pageUrl}#itemlist`;
  const productSchemas = products.map((product, index) => {
    const productId = `${pageUrl}#product-${index + 1}`;

    return {
      id: productId,
      schema: {
        "@type": "Product",
        "@id": productId,
        name: t(locale, product.nameKey),
        description: t(locale, product.descriptionKey),
        image: toAbsoluteUrl(product.image),
        brand: {
          "@id": `${SITE_URL}/#organization`,
        },
        offers: {
          "@type": "AggregateOffer",
          availability: "https://schema.org/InStock",
          seller: {
            "@id": `${SITE_URL}/#organization`,
          },
        },
      },
    };
  });
  const collectionPageSchema = {
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collectionpage`,
    url: pageUrl,
    name: title,
    description,
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    mainEntity: {
      "@id": itemListId,
    },
  };
  const itemListSchema = {
    "@type": "ItemList",
    "@id": itemListId,
    name: title,
    numberOfItems: products.length,
    itemListElement: productSchemas.map(({ id }, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@id": id,
      },
    })),
  };
  const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
    {
      name: t(locale, "nav.home", "Home"),
      url: localizedUrl(locale),
    },
    {
      name: t(locale, "collections.title", "Collections"),
      url: `${localizedUrl(locale)}#collections`,
    },
    {
      name: title,
      url: pageUrl,
    },
  ]);

  return (
    <>
      <JsonLd
        data={[
          collectionPageSchema,
          itemListSchema,
          ...productSchemas.map(({ schema }) => schema),
          breadcrumbSchema,
        ]}
      />
      <CollectionPage locale={locale} slug={collectionSlug} />
    </>
  );
}
