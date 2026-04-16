import BlogListPage from "@/screens/BlogListPage";
import JsonLd from "@/components/JsonLd";
import { blogPosts } from "@/data/blogPosts";
import { buildBreadcrumbSchema, buildMetadata, localizedUrl, toAbsoluteUrl } from "@/lib/seo";
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
    path: "/blog",
    title: t(
      params.locale,
      "blog.meta_title",
      "Blog | MagTexco Textile Insights & News",
    ),
    description: t(
      params.locale,
      "blog.meta_description",
      "Read the latest insights on textile manufacturing and apparel sourcing in Tunisia.",
    ),
    keywords: t(params.locale, "blog.meta_keywords"),
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
  const blogUrl = localizedUrl(params.locale, "/blog");
  const postSchemas = blogPosts.map((post) => {
    const content =
      post.translations[params.locale as "en" | "fr" | "ko" | "it"] ??
      post.translations.en;
    const postUrl = localizedUrl(params.locale, `/blog/${post.slug}`);

    return {
      id: `${postUrl}#blogposting`,
      schema: {
        "@type": "BlogPosting",
        "@id": `${postUrl}#blogposting`,
        headline: content.title,
        url: postUrl,
        datePublished: post.date,
        description: content.excerpt,
        image: toAbsoluteUrl(post.image),
      },
    };
  });
  const blogSchema = {
    "@type": "Blog",
    "@id": `${blogUrl}#blog`,
    url: blogUrl,
    name: "MagTexco Journal",
    description: t(params.locale, "blog.meta_description"),
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: params.locale,
    blogPost: postSchemas.map(({ id }) => ({
      "@id": id,
    })),
    breadcrumb: {
      "@id": `${blogUrl}#breadcrumb`,
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema(blogUrl, [
    {
      name: t(params.locale, "nav.home", "Home"),
      url: localizedUrl(params.locale),
    },
    {
      name: t(params.locale, "nav.blog", "Blog"),
      url: blogUrl,
    },
  ]);

  return (
    <>
      <JsonLd
        data={[blogSchema, ...postSchemas.map(({ schema }) => schema), breadcrumbSchema]}
      />
      <BlogListPage locale={params.locale} />
    </>
  );
}
