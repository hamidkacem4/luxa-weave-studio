import BlogPostPage from "@/pages/BlogPostPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Post – MagTexco Tunisia",
  description: "Read our latest blog posts about textile manufacturing and clothing production in Tunisia.",
};

export default function Page() {
  return <BlogPostPage />;
}
