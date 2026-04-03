import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import Navigation from "@/components/Navigation";
import Meta from "@/components/Meta";
import { Calendar, ArrowRight, Tag, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FeaturedBlogCarousel from "@/components/FeaturedBlogCarousel";

const BlogListPage = () => {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();
  const baseUrl = "https://magtexco.com";
  const blogUrl = `${baseUrl}/${lang}/blog`;

  const blogSchema = {
    "@type": "Blog",
    "@id": `${blogUrl}#blog`,
    "url": blogUrl,
    "name": "MagTexco Journal",
    "description": t("blog.meta_description"),
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": lang,
    "blogPost": blogPosts.map((post) => {
      const content = post.translations[lang as 'en'|'fr'|'ko'] || post.translations["en"];
      return {
        "@type": "BlogPosting",
        "headline": content.title,
        "url": `${baseUrl}/${lang}/blog/${post.slug}`,
        "datePublished": post.date,
        "description": content.excerpt,
        "image": post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`
      };
    })
  };

  const featuredPosts = blogPosts.filter(p => p.featured);
  const regularPosts = blogPosts.filter(p => !p.featured);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Meta 
        title={t("blog.meta_title", "Industry Insights | MagTexco Blog")}
        description={t("blog.meta_description", "Read the latest articles about textile manufacturing and global fashion trends.")}
        keywords={t("blog.meta_keywords", "textile blog, tunisia manufacturing news")}
        customSchema={blogSchema}
      />
      
      <Navigation />

      <main className="flex-grow py-24">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mb-16"
          >
            <Badge variant="outline" className="mb-6 border-gold text-gold-dark uppercase tracking-[0.2em] px-4 py-1 font-bold">
              {t("blog.badge", "Knowledge Hub")}
            </Badge>
            <h1 className="text-5xl md:text-8xl font-bold mb-8 text-charcoal tracking-tighter">
              The MagTexco <span className="text-gold-dark">Journal</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl font-light">
              Expert insights into Mediterranean craftsmanship and global supply chain innovation.
            </p>
          </motion.header>

          {/* Featured Section */}
          {featuredPosts.length > 0 && (
            <FeaturedBlogCarousel posts={featuredPosts} />
          )}

          {/* Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {regularPosts.map((post, index) => {
              const content = post.translations[lang as 'en'|'fr'|'ko'] || post.translations["en"];
              
              return (
                <motion.article 
                  key={post.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 border border-cream/50"
                >
                  <Link to={`/${lang}/blog/${post.slug}`} className="relative h-72 overflow-hidden">
                    <img
                      src={post.image}
                      alt={content.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-6 left-6">
                      <Badge className="bg-white/90 backdrop-blur-md text-charcoal font-bold border-none shadow-sm px-4 py-1.5">
                        {t(`blog.categories.${post.category}`, post.category)}
                      </Badge>
                    </div>
                  </Link>
                  
                  <div className="p-10 flex flex-col flex-grow">
                    <div className="flex items-center gap-4 text-xs font-bold text-gold-dark uppercase tracking-widest mb-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(post.date).toLocaleDateString(lang, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1.5 text-muted-foreground/60">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-6 leading-tight group-hover:text-gold-dark transition-colors line-clamp-2">
                      <Link to={`/${lang}/blog/${post.slug}`}>
                        {content.title}
                      </Link>
                    </h2>
                    
                    <p className="text-muted-foreground mb-8 line-clamp-3 font-light leading-relaxed">
                      {content.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      <Link 
                        to={`/${lang}/blog/${post.slug}`} 
                        className="inline-flex items-center font-bold text-charcoal group/link hover:text-gold-dark transition-colors"
                      >
                        Read Article
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/link:translate-x-2" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogListPage;
