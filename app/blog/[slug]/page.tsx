import { blogPosts } from "@/data/blogPosts";
import BlogPostPage, {
  generateMetadata as generateBlogPostMetadata,
} from "../../[locale]/blog/[slug]/page";

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  return generateBlogPostMetadata({ params: { locale: "en", slug: params.slug } });
}

export default function BlogPostRootPage({
  params,
}: {
  params: { slug: string };
}) {
  return <BlogPostPage params={{ locale: "en", slug: params.slug }} />;
}
