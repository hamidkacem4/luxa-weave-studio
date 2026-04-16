"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { normalizeLocale } from "@/lib/locale";
import { formatDate } from "@/lib/formatDate";
import { localizedPath } from "@/lib/seo";

type BlogSectionProps = {
  locale?: string;
};

const BlogSection = ({ locale: propLocale }: BlogSectionProps) => {
  const { t } = useTranslation();
  const params = (useParams() ?? {}) as { locale?: string };
  const locale = normalizeLocale(propLocale || params.locale);

  // Get the 3 most recent posts
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="overflow-hidden bg-cream/30 py-16 sm:py-20 lg:py-24">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 flex flex-col items-start justify-between gap-6 sm:mb-16 md:flex-row md:items-end"
        >
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-gold text-gold-dark uppercase tracking-widest px-4 py-1">
              {t("blog.badge", "Knowledge Hub")}
            </Badge>
            <h2 className="mb-4 text-3xl font-bold text-charcoal sm:text-4xl md:text-5xl">
              {t("blog.section_title", "Industry Insights & News")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("blog.section_subtitle", "Stay updated with the latest trends in Tunisian textile manufacturing and global fashion logistics.")}
            </p>
          </div>
          <Button asChild variant="link" size="lg" className="group text-gold-dark hover:text-gold transition-colors p-0 h-auto font-bold text-lg">
            <Link href={localizedPath(locale, "/blog")} className="flex items-center gap-2">
              {t("blog.view_all", "View All Articles")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </motion.div>

        <div className="flex flex-col gap-12">
          {recentPosts.map((post, index) => {
            // Added safety check to prevent crash if translations is missing
            const translations = post.translations || {};
            const content = translations[locale as 'en'|'fr'|'ko'|'it'] || translations["en"] || { title: "Article", excerpt: "", content: "" };
            const isEven = index % 2 === 0;
            
            return (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                className="group flex min-h-[400px] flex-col overflow-hidden rounded-3xl bg-white shadow-soft hover-lift md:flex-row"
              >
                <Link href={localizedPath(locale, `/blog/${post.slug}`)} 
                   className={`relative block min-h-[260px] w-full overflow-hidden md:min-h-0 md:w-1/2 ${!isEven ? 'md:order-last' : ''}`}
                >
                  <Image
                    src={post.image}
                    alt={content.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute top-6 left-6 z-10">
                    <Badge className="bg-charcoal/80 backdrop-blur-md text-white border-none px-4 py-1.5 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" />
                      {t(`blog.categories.${post.category}`, post.category)}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                <div className="flex w-full flex-col justify-center p-6 sm:p-8 md:w-1/2 md:p-12">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gold-dark mb-6">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date} suppressHydrationWarning>
                      {formatDate(post.date, locale)}
                    </time>
                  </div>
                  
                  <h3 className="mb-6 text-2xl font-bold leading-tight transition-colors duration-300 group-hover:text-gold-dark sm:text-3xl md:text-4xl">
                    <Link href={localizedPath(locale, `/blog/${post.slug}`)}>
                      {content.title}
                    </Link>
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 line-clamp-4 leading-relaxed">
                    {content.excerpt}
                  </p>
                  
                  <Link href={localizedPath(locale, `/blog/${post.slug}`)} 
                    className="inline-flex items-center font-bold text-charcoal group/link hover:text-gold-dark transition-colors text-lg"
                  >
                    <span className="relative">
                      {t("blog.read_more", "Read More")}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover/link:w-full" />
                    </span>
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover/link:translate-x-2" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
