"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  appendManagedLink,
  appendManagedMeta,
  appendManagedScript,
  clearManagedHead,
  setDocumentTitle,
} from "@/lib/managedHead";
import { SITE_URL } from "@/lib/site";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  type?: 'website' | 'article';
  image?: string;
  jsonLd?: string | object;
}

const HEAD_MANAGER = "magtexco-seo";

const SEO = ({
  title,
  description,
  canonicalUrl,
  keywords,
  type = 'website',
  image = `${SITE_URL}/og-image.jpg`,
  jsonLd,
}) => {
  const pathname = usePathname() ?? "";
  const currentUrl = canonicalUrl || `${SITE_URL}${pathname}`;
  const jsonLdContent = jsonLd ? (typeof jsonLd === "string" ? jsonLd : JSON.stringify(jsonLd)) : null;

  useEffect(() => {
    clearManagedHead(HEAD_MANAGER);
    setDocumentTitle(title);

    appendManagedMeta(HEAD_MANAGER, { name: "description", content: description });

    if (keywords) {
      appendManagedMeta(HEAD_MANAGER, { name: "keywords", content: keywords });
    }

    appendManagedLink(HEAD_MANAGER, { rel: "canonical", href: currentUrl });

    appendManagedMeta(HEAD_MANAGER, { property: "og:type", content: type });
    appendManagedMeta(HEAD_MANAGER, { property: "og:url", content: currentUrl });
    appendManagedMeta(HEAD_MANAGER, { property: "og:title", content: title });
    appendManagedMeta(HEAD_MANAGER, { property: "og:description", content: description });
    appendManagedMeta(HEAD_MANAGER, { property: "og:image", content: image });

    appendManagedMeta(HEAD_MANAGER, { name: "twitter:card", content: "summary_large_image" });
    appendManagedMeta(HEAD_MANAGER, { name: "twitter:url", content: currentUrl });
    appendManagedMeta(HEAD_MANAGER, { name: "twitter:title", content: title });
    appendManagedMeta(HEAD_MANAGER, { name: "twitter:description", content: description });
    appendManagedMeta(HEAD_MANAGER, { name: "twitter:image", content: image });

    if (jsonLdContent) {
      appendManagedScript(HEAD_MANAGER, { content: jsonLdContent });
    }

    return () => {
      clearManagedHead(HEAD_MANAGER);
    };
  }, [currentUrl, description, image, jsonLdContent, keywords, title, type]);

  return null;
};

export default SEO;
