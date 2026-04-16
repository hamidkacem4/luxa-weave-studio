import BlogPage, {
  generateMetadata as generateBlogMetadata,
} from "../[locale]/blog/page";

export const generateMetadata = () =>
  generateBlogMetadata({ params: { locale: "en" } });

export default function BlogRootPage() {
  return <BlogPage params={{ locale: "en" }} />;
}
