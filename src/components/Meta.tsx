"use client";
import type { StaticImageData } from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  appendManagedLink,
  appendManagedMeta,
  appendManagedScript,
  clearManagedHead,
  setDocumentTitle,
} from "@/lib/managedHead";
import { SITE_URL } from "@/lib/site";

type MetaProps = {
  title: string;
  description: string;
  keywords: string;
  image?: string | StaticImageData;
  customSchema?: object | object[];
};

const HEAD_MANAGER = "magtexco-meta";

const Meta = ({ title, description, keywords, image, customSchema }: MetaProps) => {
  const { i18n } = useTranslation();
  const pathname = usePathname() ?? "/";

  const languages = ["en", "fr", "ko", "it"];
  const baseUrl = SITE_URL;
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  // Handle Next.js static asset object or string URL
  const imageUrl = typeof image === "string" ? image : image?.src ?? null;
    
  let displayImage = imageUrl || `${baseUrl}/og-image.jpg`;
  if (displayImage && !displayImage.startsWith('http')) {
    displayImage = `${baseUrl}${displayImage.startsWith('/') ? '' : '/'}${displayImage}`;
  }

  // Breadcrumb Schema
  const pathnames = pathname.split("/").filter((x) => x);
  const breadcrumbList = {
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}#breadcrumb`,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${baseUrl}${i18n.language === "en" ? "/" : `/${i18n.language}`}`
      },
      ...pathnames.map((name, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, " "),
        "item": `${baseUrl}/${pathnames.slice(0, index + 1).join("/")}`
      }))
    ]
  };

  const isContactPage = pathname.includes("contact");
  const isAboutPage = pathname.includes("about") || pathname.includes("factory");

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "MagTexco",
        "description": "Premium Textile Manufacturing in Tunisia",
        "publisher": { "@id": `${baseUrl}/#organization` },
        "inLanguage": i18n.language
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "MagTexco",
        "url": baseUrl,
        "logo": {
          "@type": "ImageObject",
          "inLanguage": i18n.language,
          "@id": `${baseUrl}/#logo`,
          "url": `${baseUrl}/og-image.jpg`,
          "contentUrl": `${baseUrl}/og-image.jpg`,
          "width": 1200,
          "height": 630,
          "caption": "MagTexco Logo"
        },
        "image": { "@id": `${baseUrl}/#logo` },
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61570008207516",
          "https://www.linkedin.com/company/magtexco-the-factory"
        ],
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+216 95 518 870",
            "contactType": "customer service",
            "areaServed": "Global",
            "availableLanguage": ["English", "French", "Arabic"]
          }
        ]
      },
      {
        "@type": isContactPage ? "ContactPage" : (isAboutPage ? "AboutPage" : "WebPage"),
        "@id": `${canonicalUrl}#webpage`,
        "url": canonicalUrl,
        "name": title,
        "isPartOf": { "@id": `${baseUrl}/#website` },
        "primaryImageOfPage": { "@id": `${canonicalUrl}#primaryimage` },
        "description": description,
        "breadcrumb": { "@id": `${canonicalUrl}#breadcrumb` },
        "inLanguage": i18n.language,
        "potentialAction": [
          {
            "@type": "ReadAction",
            "target": [canonicalUrl]
          }
        ]
      },
      {
        "@type": "ImageObject",
        "inLanguage": i18n.language,
        "@id": `${canonicalUrl}#primaryimage`,
        "url": displayImage,
        "contentUrl": displayImage,
        "width": 1200,
        "height": 630
      },
      {
        "@type": "Service",
        "@id": `${baseUrl}/#service`,
        "name": "Textile Manufacturing",
        "serviceType": "Textile Manufacturing",
        "provider": { "@id": `${baseUrl}/#organization` },
        "areaServed": "Global",
        "description": "High-end garment production and textile manufacturing services in Tunisia."
      },
      {
        "@type": "LocalBusiness",
        "name": "MagTexco Garment Factory",
        "image": { "@id": `${baseUrl}/#logo` },
        "@id": `${baseUrl}/#factory`,
        "url": baseUrl,
        "telephone": "+216 95 518 870",
        "priceRange": "$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Technological and industrial pole",
          "addressLocality": "Sahline",
          "addressRegion": "Monastir",
          "postalCode": "5012",
          "addressCountry": "TN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 35.72344296183206,
          "longitude": 10.744451113821503
        }
      },
      breadcrumbList,
      ...(customSchema ? (Array.isArray(customSchema) ? customSchema : [customSchema]) : [])
    ]
  };

  const xDefaultPath =
    pathname === "/" || pathname === "/en"
      ? ""
      : pathname.startsWith("/en")
        ? pathname.slice(3)
        : pathname;
  const schemaJson = JSON.stringify(schemaData);

  useEffect(() => {
    clearManagedHead(HEAD_MANAGER);
    setDocumentTitle(title);

    appendManagedMeta(HEAD_MANAGER, { name: "description", content: description });
    appendManagedMeta(HEAD_MANAGER, { name: "keywords", content: keywords });
    appendManagedLink(HEAD_MANAGER, { rel: "canonical", href: canonicalUrl });

    appendManagedMeta(HEAD_MANAGER, { property: "og:type", content: "website" });
    appendManagedMeta(HEAD_MANAGER, { property: "og:url", content: canonicalUrl });
    appendManagedMeta(HEAD_MANAGER, { property: "og:site_name", content: "MagTexco" });
    appendManagedMeta(HEAD_MANAGER, { property: "og:title", content: title });
    appendManagedMeta(HEAD_MANAGER, { property: "og:description", content: description });
    appendManagedMeta(HEAD_MANAGER, { property: "og:image", content: displayImage });

    appendManagedMeta(HEAD_MANAGER, { name: "twitter:card", content: "summary_large_image" });
    appendManagedMeta(HEAD_MANAGER, { name: "twitter:url", content: canonicalUrl });
    appendManagedMeta(HEAD_MANAGER, { name: "twitter:title", content: title });
    appendManagedMeta(HEAD_MANAGER, { name: "twitter:description", content: description });
    appendManagedMeta(HEAD_MANAGER, { name: "twitter:image", content: displayImage });

    languages.forEach((lang) => {
      const cleanPath = pathname.replace(/^\/(en|fr|ko|it)(?:\/|$)/, "/").replace(/\/+$/, "");
      const finalPath = lang === "en" ? (cleanPath || "/") : `/${lang}${cleanPath}`;
      
      appendManagedLink(HEAD_MANAGER, {
        rel: "alternate",
        hrefLang: lang,
        href: `${baseUrl}${finalPath.startsWith("/") ? "" : "/"}${finalPath}`,
      });
    });

    const cleanPathForXDefault = pathname.replace(/^\/(en|fr|ko|it)(?:\/|$)/, "/").replace(/\/+$/, "");
    appendManagedLink(HEAD_MANAGER, {
      rel: "alternate",
      hrefLang: "x-default",
      href: `${baseUrl}${cleanPathForXDefault || "/"}`,
    });

    appendManagedScript(HEAD_MANAGER, { content: schemaJson });

    return () => {
      clearManagedHead(HEAD_MANAGER);
    };
  }, [
    canonicalUrl,
    description,
    displayImage,
    keywords,
    pathname,
    schemaJson,
    title,
    xDefaultPath,
  ]);

  return null;
};

export default Meta;
