import TextileTunisiePage from "@/pages/TextileTunisiePage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Textile Tunisie – Premium Textile Manufacturing & Fabric Production | MagTexco",
  description: "Discover MagTexco's Textile Tunisie services. Premium fabric manufacturing, sustainable garment production, and high-quality textile solutions made in Tunisia for global brands.",
  alternates: { canonical: "https://magtexco.com/en/textile-tunisie" },
};

export default function Page() {
  return <TextileTunisiePage />;
}
