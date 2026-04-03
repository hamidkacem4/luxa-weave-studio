import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

type MetaProps = {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  customSchema?: any;
};

const Meta = ({ title, description, keywords, image, customSchema }: MetaProps) => {
  const { i18n } = useTranslation();
  const location = useLocation();

  const languages = ["en", "fr", "ko"];
  const baseUrl = "https://magtexco.com";
  const canonicalUrl = `${baseUrl}${location.pathname}`;
  const displayImage = image || `${baseUrl}/og-image.jpg`;

  // Breadcrumb Schema
  const pathnames = location.pathname.split("/").filter((x) => x);
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

  const isContactPage = location.pathname.includes("contact");
  const isAboutPage = location.pathname.includes("about") || location.pathname.includes("factory");

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
          "https://www.facebook.com/profile.php?id=61570008207516"
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
      ...(customSchema ? [customSchema] : [])
    ]
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={displayImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={displayImage} />

      {languages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${baseUrl}/${lang}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${baseUrl}/en`}
      />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData)}
      </script>
    </Helmet>
  );
};

export default Meta;
