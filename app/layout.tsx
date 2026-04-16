import type { Metadata } from "next";
import { headers } from "next/headers";
import { Bodoni_Moda, Poppins } from "next/font/google";
import Script from "next/script";
import dynamic from "next/dynamic";
import Providers from "@/Providers";
import JsonLd from "@/components/JsonLd";
import { normalizeLocale } from "@/lib/locale";
import { localizedUrl } from "@/lib/seo";
import { DEFAULT_LOCALE, SITE_URL } from "@/lib/site";
import "@/index.css"; // Ensure index.css is updated later to be at global scope

// Initialize Google Fonts with Next.js optimization
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});
const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  adjustFontFallback: false,
});
const legacyMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MagTexco – Textile Manufacturer Tunisia",
    template: "%s | MagTexco"
  },
  description: "MagTexco – Tunisia's leading textile manufacturer. Premium fabrics, custom production & global delivery.",
  authors: [{ name: "MagTexco" }],
  alternates: {
    canonical: SITE_URL,
    languages: {
      "x-default": SITE_URL,
      en: SITE_URL,
      fr: `${SITE_URL}/fr`,
      ko: `${SITE_URL}/ko`,
      it: `${SITE_URL}/it`,
    },
  },
  openGraph: {
    title: "MagTexco – Premium Textile Manufacturing in Tunisia",
    description: "MagTexco – Tunisia's leading textile manufacturer. Premium fabrics, custom production & global delivery. Quality craftsmanship for brands worldwide.",
    siteName: "MagTexco",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MagTexco",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" }
    ],
    shortcut: ["/favicon.ico"]
  },
  manifest: "/manifest.json"
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MagTexco - Textile Manufacturer Tunisia",
    template: "%s | MagTexco",
  },
  description:
    "MagTexco - Tunisia's leading textile manufacturer. Premium fabrics, custom production & global delivery.",
  authors: [{ name: "MagTexco" }],
  alternates: {
    canonical: SITE_URL,
    languages: {
      "x-default": SITE_URL,
      en: SITE_URL,
      fr: `${SITE_URL}/fr`,
      ko: `${SITE_URL}/ko`,
      it: `${SITE_URL}/it`,
    },
  },
  openGraph: {
    title: "MagTexco - Premium Textile Manufacturing in Tunisia",
    description:
      "MagTexco - Tunisia's leading textile manufacturer. Premium fabrics, custom production & global delivery. Quality craftsmanship for brands worldwide.",
    siteName: "MagTexco",
    type: "website",
    url: SITE_URL,
    images: [{ url: "/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MagTexco",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.json",
};

function legacyGetRootStructuredData(locale: string) {
  return [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MagTexco",
      url: `${SITE_URL}/${locale}`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+216 95 518 870",
        contactType: "customer service",
        availableLanguage: ["English", "French", "Italian"]
      }
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "MagTexco Textile Manufacturing",
      url: `${SITE_URL}/${locale}`,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: "+216 95 518 870",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Zone Industrielle Route de Sousse",
        addressLocality: "Sahline",
        postalCode: "5012",
        addressCountry: "TN"
      }
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/${locale}`,
      name: "MagTexco",
      publisher: {
        "@id": `${SITE_URL}/#organization`
      },
      inLanguage: ["en", "fr", "ko", "it"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${SITE_URL}/${locale}/blog?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    }
  ];
}

function getRootStructuredData(locale: string) {
  const localeUrl = localizedUrl(locale);
  const blogSearchUrl = localizedUrl(locale, "/blog");

  return [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "MagTexco",
      url: localeUrl,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/og-image.jpg`,
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+216 95 518 870",
        contactType: "customer service",
        availableLanguage: ["English", "French", "Italian", "Korean"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#localbusiness`,
      name: "MagTexco Textile Manufacturing",
      url: localeUrl,
      image: `${SITE_URL}/og-image.jpg`,
      telephone: "+216 95 518 870",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Zone Industrielle Route de Sousse",
        addressLocality: "Sahline",
        postalCode: "5012",
        addressCountry: "TN",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: localeUrl,
      name: "MagTexco",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
      inLanguage: ["en", "fr", "ko", "it"],
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${blogSearchUrl}?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
  ];
}

const LanguageSuggestionBar = dynamic(() => import("@/components/LanguageSuggestionBar"), { ssr: false });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestLocale = normalizeLocale(
    headers().get("x-magtexco-locale") ?? DEFAULT_LOCALE,
  );

  return (
    <html lang={requestLocale} suppressHydrationWarning>
      <head>
        <meta
          name="ahrefs-site-verification"
          content="a0a147dfff2b18c1d94c0134b868da83729c07e9ab46288566c4b677bd109d35"
        />
        {/*
          Preload the hero poster image so it fetches at the highest priority.
          This is the LCP element on the homepage and must load before anything else.
        */}
        <link
          rel="preload"
          as="image"
          href="/assets/textile-tunisie-factory-closeup.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W3DFJ2XG');`}
        </Script>
        <Script
          src="https://t.contentsquare.net/uxa/441d1b4370906.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="WiRl+mSRfpH9JHkTjCve1g"
          strategy="afterInteractive"
        />
      </head>
      <body className={`${poppins.variable} ${bodoni.variable} antialiased`}>
        <Providers locale={requestLocale}>
          <LanguageSuggestionBar />
          <JsonLd data={getRootStructuredData(requestLocale)} />
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-W3DFJ2XG"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {children}
        </Providers>
      </body>
    </html>
  );
}
