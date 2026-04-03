import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const BlogSection = () => {
  const { t } = useTranslation();
  const { lang = "en" } = useParams();

  // Get the 3 most recent posts
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section id="blog" className="py-24 bg-cream/30 overflow-hidden">
      <div className="container px-4 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-gold text-gold-dark uppercase tracking-widest px-4 py-1">
              {t("blog.badge", "Knowledge Hub")}
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-charcoal">
              {t("blog.section_title", "Industry Insights & News")}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("blog.section_subtitle", "Stay updated with the latest trends in Tunisian textile manufacturing and global fashion logistics.")}
            </p>
          </div>
          <Button asChild variant="link" size="lg" className="group text-gold-dark hover:text-gold transition-colors p-0 h-auto font-bold text-lg">
            <Link to={`/${lang}/blog`} className="flex items-center gap-2">
              {t("blog.view_all", "View All Articles")}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            </Link>
          </Button>
        </motion.div>

        <div className="flex flex-col gap-12">
          {recentPosts.map((post, index) => {
            // Added safety check to prevent crash if translations is missing
            const translations = post.translations || {};
            const content = translations[lang as 'en'|'fr'|'ko'] || translations["en"] || { title: "Article", excerpt: "", content: "" };
            const isEven = index % 2 === 0;
            
            return (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
                className="group flex flex-col md:flex-row bg-white rounded-3xl overflow-hidden shadow-soft hover-lift min-h-[400px]"
              >
                <Link 
                  to={`/${lang}/blog/${post.slug}`} 
                  className={`relative block w-full md:w-1/2 overflow-hidden ${!isEven ? 'md:order-last' : ''}`}
                >
                  <img
                    src={post.image}
                    alt={content.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-charcoal/80 backdrop-blur-md text-white border-none px-4 py-1.5 flex items-center gap-2">
                      <Tag className="w-3.5 h-3.5" />
                      {t(`blog.categories.${post.category}`, post.category)}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                <div className="w-full md:w-1/2 p-10 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gold-dark mb-6">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString(lang, { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </time>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold mb-6 leading-tight group-hover:text-gold-dark transition-colors duration-300">
                    <Link to={`/${lang}/blog/${post.slug}`}>
                      {content.title}
                    </Link>
                  </h3>
                  
                  <p className="text-lg text-muted-foreground mb-8 line-clamp-4 leading-relaxed">
                    {content.excerpt}
                  </p>
                  
                  <Link 
                    to={`/${lang}/blog/${post.slug}`} 
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
