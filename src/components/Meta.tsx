"use client";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { usePathname } from "next/navigation";

type MetaProps = {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  customSchema?: object | object[];
};

const Meta = ({ title, description, keywords, image, customSchema }: MetaProps) => {
  const { i18n } = useTranslation();
  const pathname = usePathname() ?? "/";

  const languages = ["en", "fr", "ko"];
  const baseUrl = "https://magtexco.com";
  const canonicalUrl = `${baseUrl}${pathname}`;
  
  // Handle Next.js static asset object or string URL
  const imageUrl = typeof image === 'string' 
    ? image 
    : (image && (image as any).src ? (image as any).src : null);
    
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
        "item": `${baseUrl}/${i18n.language}`
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

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="MagTexco" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={displayImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={displayImage} />

      {languages.map((lang) => {
        // Construct the localized URL for the current path
        const pathParts = pathname.split('/').filter(Boolean);
        if (pathParts.length > 0 && languages.includes(pathParts[0])) {
          pathParts[0] = lang;
        } else {
          pathParts.unshift(lang);
        }
        const localizedPath = `/${pathParts.join('/')}`;
        
        return (
          <link
            key={lang}
            rel="alternate"
            hrefLang={lang}
            href={`${baseUrl}${localizedPath}`}
          />
        );
      })}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/en${pathname === '/' || pathname === '/en' ? '' : (pathname.startsWith('/en') ? pathname.slice(3) : pathname)}`}
      />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Head>
  );
};

export default Meta;
