import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/index.css"; // Ensure index.css is updated later to be at global scope

// Initialize Google Fonts with Next.js optimization
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: "MagTexco – Textile Manufacturer Tunisia | Textile Tunisie",
  description: "MagTexco – Tunisia's leading textile manufacturer. Premium fabrics, custom production & global delivery. Quality craftsmanship for clothing manufacturers in Tunisia.",
  keywords: "textile Tunisie, textile manufacturing Tunisia, clothing manufacturers Tunisia, manufacture Tunisie, high quality clothing manufacturers, Tunisian garment factory, apparel sourcing Tunisia, fashion manufacturing Tunisia, premium clothing production Tunisia, textile supplier Tunisia, bulk clothing manufacturers Tunisia, custom garment manufacturing Tunisia, private label clothing Tunisia, wholesale clothing manufacturer Tunisia, contract manufacturing Tunisia apparel, EU clothing supplier Tunisia, sustainable textile Tunisia, ethical clothing manufacturer Tunisia, eco-friendly garment factory Tunisia, made in Tunisia clothing",
  authors: [{ name: "MagTexco" }],
  alternates: {
    canonical: "https://magtexco.com",
  },
  openGraph: {
    title: "MagTexco – Premium Textile Manufacturing in Tunisia",
    description: "MagTexco – Tunisia's leading textile manufacturer. Premium fabrics, custom production & global delivery. Quality craftsmanship for brands worldwide.",
    siteName: "MagTexco",
    type: "website",
    url: "https://www.magtexco.com",
    images: [{ url: "/og-image.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@MagTexco",
    title: "MagTexco – Textile Manufacturer Tunisia | Textile Tunisie & Premium Fabrics",
    description: "Leading clothing manufacturers in Tunisia offering high-quality textile production, private label services, and sustainable garment manufacturing for EU and global brands.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://magtexco.com/#organization",
                  "name": "MagTexco",
                  "url": "https://magtexco.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://magtexco.com/og-image.jpg"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+216 95 518 870",
                    "contactType": "customer service"
                  }
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://magtexco.com/#localbusiness",
                  "name": "MagTexco Textile Manufacturing",
                  "url": "https://magtexco.com",
                  "image": "https://magtexco.com/og-image.jpg",
                  "telephone": "+216 95 518 870",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Zone Industrielle Route de Sousse",
                    "addressLocality": "Sahline",
                    "postalCode": "5012",
                    "addressCountry": "TN"
                  }
                }
              ]
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
