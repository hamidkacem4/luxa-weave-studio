import { blogPosts } from "@/data/blogPosts";
import JsonLd from "@/components/JsonLd";
import BlogPostPage from "@/screens/BlogPostPage";
import type { Metadata } from "next";
import { buildBreadcrumbSchema, buildLocaleAlternates, getLocale, localizedUrl, toAbsoluteUrl } from "@/lib/seo";
import { PREFIXED_LOCALES, SITE_URL } from "@/lib/site";
import { t } from "@/lib/i18n-utils";
import { notFound } from "next/navigation";

export function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Metadata {
  const locale = getLocale(params.locale);
  const post = blogPosts.find((entry) => entry.slug === params.slug);

  if (!post) {
    return {
      title: "Blog | MagTexco",
      description:
        "Read the latest MagTexco insights on textile manufacturing and apparel production in Tunisia.",
      alternates: buildLocaleAlternates(locale, "/blog"),
    };
  }

  const content = post.translations[locale] ?? post.translations.en;

  return {
    title: `${content.title} | MagTexco`,
    description: content.metaDescription,
    keywords: content.keywords,
    alternates: buildLocaleAlternates(locale, `/blog/${post.slug}`),
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url: localizedUrl(locale, `/blog/${post.slug}`),
      type: "article",
      images: [{ url: toAbsoluteUrl(post.image) }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.title,
      description: content.metaDescription,
      images: [toAbsoluteUrl(post.image)],
    },
  };
}

export function generateStaticParams() {
  return blogPosts.flatMap((post) =>
    PREFIXED_LOCALES.map((locale) => ({
      locale,
      slug: post.slug,
    })),
  );
}

export default function Page({
  params,
}: {
  params: { locale: string; slug: string };
}) {
  const locale = getLocale(params.locale);
  const post = blogPosts.find((entry) => entry.slug === params.slug);

  if (!post) {
    notFound();
  }

  const content = post.translations[locale] ?? post.translations.en;
  const pageUrl = localizedUrl(locale, `/blog/${post.slug}`);
  const wordCount = content.blocks
    .filter((b) => b.type === "paragraph" || b.type === "heading")
    .reduce((sum, b) => sum + ((b as { text?: string }).text?.split(/\s+/).length ?? 0), 0);

  const blogPostingSchema = {
    "@type": "BlogPosting",
    "@id": `${pageUrl}#blogposting`,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    headline: content.title,
    description: content.metaDescription,
    image: toAbsoluteUrl(post.image),
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    wordCount,
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MagTexco",
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: locale,
    keywords: content.keywords,
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    potentialAction: {
      "@type": "ReadAction",
      target: pageUrl,
    },
  };
  const breadcrumbSchema = buildBreadcrumbSchema(pageUrl, [
    {
      name: t(locale, "nav.home", "Home"),
      url: localizedUrl(locale),
    },
    {
      name: t(locale, "nav.blog", "Blog"),
      url: localizedUrl(locale, "/blog"),
    },
    {
      name: content.title,
      url: pageUrl,
    },
  ]);

  return (
    <>
      <JsonLd data={[blogPostingSchema, breadcrumbSchema]} />
      <BlogPostPage locale={locale} slug={params.slug} />
    </>
  );
}
