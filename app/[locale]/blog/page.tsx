import BlogListPage from "@/pages/BlogListPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog – MagTexco Textile Insights & News Tunisia",
  description: "Read the latest insights on textile manufacturing, apparel sourcing in Tunisia, sustainable fashion, and industry trends from MagTexco experts.",
  alternates: { canonical: "https://magtexco.com/en/blog" },
};

export default function Page() {
  return <BlogListPage />;
}
