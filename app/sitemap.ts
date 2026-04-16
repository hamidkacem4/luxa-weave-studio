/**
 * Dynamic Next.js sitemap — replaces public/sitemap.xml.
 *
 * Benefits over the static file:
 * - Auto-includes every new blog post the moment it is added here
 * - Generates correct hreflang alternate links for all four locales
 * - Served via the Next.js response pipeline so CDN/cache headers apply
 * - x-default hreflang points to https://www.magtexco.com/ (root)
 *
 * ⚠️  We intentionally do NOT import from @/data/blogPosts here.
 *     That module imports static image files (webpack client modules) which
 *     crash the server-only sitemap route.
 */
import type { MetadataRoute } from "next";
import { localizedUrl } from "@/lib/seo";

const LOCALES = ["en", "fr", "ko", "it"] as const;
type Locale = (typeof LOCALES)[number];

// ---------------------------------------------------------------------------
// Blog post routing metadata — keep in sync with @/data/blogPosts.ts slugs.
// ---------------------------------------------------------------------------
const BLOG_POSTS_META = [
  { slug: "textile-innovations-2026-outlook",           date: "2026-03-27", featured: true  },
  { slug: "why-fashion-brands-choose-tunisia",          date: "2026-03-24", featured: false },
  { slug: "textile-manufacturing-tunisia-strategic-advantage", date: "2026-03-20", featured: false },
  { slug: "silk-scarf-production-tunisia-heritage",     date: "2026-03-15", featured: false },
  { slug: "textile-export-tunisie-europe-guide",        date: "2026-03-10", featured: false },
] as const;

// Pages that exist for every locale
const STATIC_PATHS = [
  { path: "/",                       priority: 1.0, changeFrequency: "daily"  as const },
  { path: "/contact",                priority: 0.8, changeFrequency: "daily"  as const },
  { path: "/recruitment",            priority: 0.8, changeFrequency: "daily"  as const },
  { path: "/blog",                   priority: 0.9, changeFrequency: "daily"  as const },
  { path: "/textile-tunisie",        priority: 0.9, changeFrequency: "daily"  as const },
  { path: "/collections/shirts",     priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/collections/t-shirts-tops",   priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/collections/shorts-skirts",   priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/collections/dresses",    priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/collections/jackets-coats",   priority: 0.8, changeFrequency: "weekly" as const },
];

function buildAlternates(path: string) {
  const languages: Record<string, string> = {
    "x-default": localizedUrl("en", path),
  };
  
  LOCALES.forEach(locale => {
    languages[locale] = localizedUrl(locale, path);
  });

  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(
    ({ path, priority, changeFrequency }) =>
      LOCALES.map((locale) => ({
        url: localizedUrl(locale, path),
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: buildAlternates(path),
      }))
  );

  const blogEntries: MetadataRoute.Sitemap = BLOG_POSTS_META.flatMap((post) =>
    LOCALES.map((locale) => ({
      url: localizedUrl(locale, `/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "weekly" as const,
      priority: post.featured ? 0.9 : 0.8,
      alternates: buildAlternates(`/blog/${post.slug}`),
    }))
  );

  return [...staticEntries, ...blogEntries];
}
