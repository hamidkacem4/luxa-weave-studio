import CollectionPage from "@/pages/CollectionPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collection | MagTexco Tunisia",
  description: "Explore our latest collections of high-quality fabrics and garments manufactured in Tunisia.",
};

export default function Page() {
  return <CollectionPage />;
}
