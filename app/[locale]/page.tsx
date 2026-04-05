import type { Metadata } from "next";
import IndexPage from "@/pages/Index";

export const metadata: Metadata = {
  title: "MagTexco – Textile Manufacturer Tunisia | Clothing Manufacturers Tunisia",
  description: "MagTexco – Tunisia's leading textile manufacturer. Premium fabrics, custom production & global delivery. Quality craftsmanship for clothing manufacturers in Tunisia.",
  alternates: {
    canonical: "https://magtexco.com/en",
  },
};

export default function HomePage() {
  return <IndexPage />;
}
