import { useTranslation } from "react-i18next";
import { Link, useParams, Navigate } from "react-router-dom";
import { blogPosts } from "@/data/blogPosts";
import Navigation from "@/components/Navigation";
import Meta from "@/components/Meta";
import { Calendar, ArrowLeft, User, Tag, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import BlogRenderer from "@/components/BlogRenderer";
import { motion } from "framer-motion";

const BlogPostPage = () => {
  const { t } = useTranslation();
  const { lang = "en", slug } = useParams<{ lang: string; slug: string }>();

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to={`/${lang}/404`} replace />;
  }

  const translations = post.translations || {};
  const content = translations[lang as 'en'|'fr'|'ko'] || translations["en"];

  // Related posts (excluding current)
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  const baseUrl = "https://magtexco.com";
  const postUrl = `${baseUrl}/${lang}/blog/${slug}`;
  const postImage = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image}`;

  const blogSchema = {
    "@type": "BlogPosting",
    "@id": `${postUrl}#blogposting`,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": postUrl
    },
    "headline": content.title,
    "description": content.metaDescription,
    "image": postImage,
    "datePublished": post.date,
    "dateModified": post.date, // Ideally would have a modified date
    "author": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
      "name": "MagTexco"
    },
    "publisher": {
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": lang,
    "keywords": content.keywords
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Meta 
        title={content.seoTitle}
        description={content.metaDescription}
        keywords={content.keywords}
        image={post.image.startsWith('http') ? post.image : `https://magtexco.com${post.image}`}
        customSchema={blogSchema}
      />
      
      <Navigation />

      <main className="flex-grow">
        {/* Progress Bar */}
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1.5 bg-gold z-[60] origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5 }}
        />

        <article>
          {/* Hero Header */}
          <header className="relative pt-32 pb-20 bg-charcoal text-white overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <img src={post.image} className="w-full h-full object-cover blur-sm" alt="" />
            </div>
            
            <div className="container px-4 mx-auto relative z-10">
              <Link 
                to={`/${lang}/blog`} 
                className="inline-flex items-center text-gold hover:text-white transition-colors mb-12 group font-bold uppercase tracking-widest text-sm"
              >
                <ArrowLeft className="mr-3 w-5 h-5 transition-transform group-hover:-translate-x-2" />
                Back to Journal
              </Link>

              <div className="max-w-5xl">
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <Badge className="bg-gold text-charcoal font-bold px-4 py-1 uppercase tracking-widest border-none">
                    {t(`blog.categories.${post.category}`, post.category)}
                  </Badge>
                  <div className="flex items-center gap-4 text-white/60 font-medium">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(post.date).toLocaleDateString(lang, { year: 'numeric', month: 'long', day: 'numeric' })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <h1 className="text-5xl md:text-8xl font-bold mb-12 leading-[1.05] tracking-tighter">
                  {content.title}
                </h1>

                <div className="flex items-center gap-4 border-t border-white/10 pt-8 mt-8">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gold">{t("blog.author_label", "Authored By")}</p>
                    <p className="text-lg font-medium">{t(`blog.authors.${post.author}`, post.author)}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="container px-4 mx-auto py-24">
            <div className="flex flex-col lg:flex-row gap-20">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <BlogRenderer blocks={content.blocks} />
                
                {/* Share Section */}
                <div className="mt-20 pt-12 border-t border-cream flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Share2 className="w-5 h-5 text-gold-dark" />
                    <span className="font-bold uppercase tracking-widest text-sm text-charcoal">Share this insight</span>
                  </div>
                  <div className="flex gap-3">
                    {['LinkedIn', 'Twitter', 'Facebook'].map(plat => (
                      <Button key={plat} variant="outline" className="rounded-full hover:bg-gold hover:text-charcoal transition-all font-bold">
                        {plat}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar / Related */}
              <aside className="lg:w-1/3">
                <div className="sticky top-32 space-y-12">
                  <div className="bg-neutral-50 p-10 rounded-[2.5rem] border border-cream">
                    <h2 className="text-2xl font-bold mb-8 text-charcoal">Related Articles</h2>
                    <div className="space-y-10">
                      {relatedPosts.map(p => {
                        const pContent = p.translations[lang as 'en'|'fr'|'ko'] || p.translations["en"];
                        return (
                          <Link key={p.id} to={`/${lang}/blog/${p.slug}`} className="group block">
                            <Badge variant="secondary" className="mb-3 bg-cream text-gold-dark font-bold border-none uppercase tracking-widest text-[10px]">
                              {p.category}
                            </Badge>
                            <h4 className="font-bold text-lg leading-snug group-hover:text-gold-dark transition-colors line-clamp-2">
                              {pContent.title}
                            </h4>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="bg-gold p-10 rounded-[2.5rem] text-charcoal">
                    <h3 className="text-2xl font-bold mb-4">Start Your Production</h3>
                    <p className="mb-8 font-medium opacity-80 text-lg leading-relaxed">
                      Leverage our 30+ years of expertise in the Tunisian textile industry.
                    </p>
                    <Button asChild className="w-full bg-charcoal hover:bg-white hover:text-charcoal text-white font-bold py-6 rounded-xl transition-all">
                      <Link to={`/${lang}/contact#contact-form`}>Get in Touch</Link>
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostPage;
