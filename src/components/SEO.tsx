"use client";
import Head from "next/head";
import { usePathname } from "next/navigation";

interface SEOProps {
  title: string;
  description: string;
  canonicalUrl?: string;
  keywords?: string;
  type?: 'website' | 'article';
  image?: string;
  jsonLd?: string | object;
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  keywords,
  type = 'website',
  image = 'https://thefactory-hamidkacem-hamids-projects-a9288d2a.vercel.app/og-image.jpg',
  jsonLd,
}) => {
  const pathname = usePathname();
  const currentUrl = canonicalUrl || `https://thefactory-hamidkacem-hamids-projects-a9288d2a.vercel.app${pathname}`;

  return (
    <Head>
      {/* Standard metadata tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      {/* JSON-LD Schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {typeof jsonLd === 'string' ? jsonLd : JSON.stringify(jsonLd)}
        </script>
      )}
    </Head>
  );
};

export default SEO;
