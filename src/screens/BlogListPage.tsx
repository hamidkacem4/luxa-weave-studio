"use client";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import Navigation from "@/components/Navigation";
import { Calendar, ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import FeaturedBlogCarousel from "@/components/FeaturedBlogCarousel";
import WhatsAppButton from "@/components/WhatsAppButton";
import { normalizeLocale } from "@/lib/locale";
import { formatDate } from "@/lib/formatDate";
import { localizedPath } from "@/lib/seo";

type BlogListPageProps = {
  locale?: string;
};

const BlogListPage = ({ locale: localeProp }: BlogListPageProps) => {
  const { t } = useTranslation();
  const params = (useParams() ?? {}) as { locale?: string };
  const locale = normalizeLocale(localeProp ?? params.locale);

  const featuredPosts = blogPosts.filter(p => p.featured);

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Navigation locale={locale} />

      <main className="flex-grow py-16 sm:py-24">
        <div className="container px-4 mx-auto">
          {/* Header */}
          <motion.header 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 max-w-4xl sm:mb-16"
          >
            <Badge variant="outline" className="mb-6 border-gold text-gold-dark uppercase tracking-[0.2em] px-4 py-1 font-bold">
              {t("blog.badge", "Knowledge Hub")}
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tighter text-charcoal sm:text-5xl md:mb-8 md:text-8xl">
              The MagTexco <span className="text-gold-dark">Journal</span>
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
              Expert insights into Mediterranean craftsmanship and global supply chain innovation.
            </p>
          </motion.header>

          {/* Featured Section */}
          {featuredPosts.length > 0 && (
            <FeaturedBlogCarousel posts={featuredPosts} />
          )}

          {/* Grid Section */}
          <div className="grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            {blogPosts.map((post, index) => {
              const content = post.translations[locale as 'en'|'fr'|'ko'|'it'] || post.translations["en"];
              const postPath = localizedPath(locale, `/blog/${post.slug}`);
               
              return (
                <motion.article 
                  key={post.id} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-soft hover:shadow-xl transition-all duration-500 border border-cream/50"
                >
                  <Link href={postPath} className="relative h-72 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={content.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-6 left-6 z-10">
                      <Badge className="bg-white/90 backdrop-blur-md text-charcoal font-bold border-none shadow-sm px-4 py-1.5">
                        {t(`blog.categories.${post.category}`, post.category)}
                      </Badge>
                    </div>
                  </Link>
                  
                  <div className="flex flex-grow flex-col p-6 sm:p-8 lg:p-10">
                    <div className="mb-6 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-widest text-gold-dark sm:gap-4">
                      <time dateTime={post.date} suppressHydrationWarning className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(post.date, locale, "short")}
                      </time>
                      <span className="flex items-center gap-1.5 text-muted-foreground/60">
                        <Clock className="w-3.5 h-3.5" />
                        {post.readTime}
                      </span>
                    </div>
                    
                    <h2 className="text-2xl font-bold mb-6 leading-tight group-hover:text-gold-dark transition-colors line-clamp-2">
                      <Link href={postPath}>
                        {content.title}
                      </Link>
                    </h2>
                    
                    <p className="text-muted-foreground mb-8 line-clamp-3 font-light leading-relaxed">
                      {content.excerpt}
                    </p>
                    
                    <div className="mt-auto">
                      <Link href={postPath}
                         className="inline-flex items-center font-bold text-charcoal group/link hover:text-gold-dark transition-colors"
                      >
                        {t("blog.read_article", "Read Article")}
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

      <Footer locale={locale} />
      <WhatsAppButton />
    </div>
  );
};

export default BlogListPage;
