"use client";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import Navigation from "@/components/Navigation";
import { Calendar, ArrowLeft, User, Clock, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BlogRenderer from "@/components/BlogRenderer";
import { motion } from "framer-motion";
import { normalizeLocale } from "@/lib/locale";
import { formatDate } from "@/lib/formatDate";
import { t } from "@/lib/i18n-utils";
import { localizedPath, localizedUrl } from "@/lib/seo";

type BlogPostPageProps = {
  locale?: string;
  slug?: string;
};

const BlogPostPage = ({ locale = "en", slug = "" }: BlogPostPageProps) => {
  const safeLocale = normalizeLocale(locale);

  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
    return null;
  }

  const translations = post.translations || {};
  const content = translations[safeLocale as 'en'|'fr'|'ko'|'it'] || translations["en"];

  // Related posts (excluding current)
  const relatedPosts = blogPosts.filter(p => p.id !== post.id).slice(0, 2);

  const postUrl = localizedUrl(safeLocale, `/blog/${slug}`);

  const handleShare = (platform: string) => {
    const shareUrl = encodeURIComponent(postUrl);
    
    let url = '';
    if (platform === 'Facebook') {
      url = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    } else if (platform === 'LinkedIn') {
      url = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
    }
    
    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation locale={safeLocale} />

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
          <header className="relative overflow-hidden bg-charcoal pb-14 pt-24 text-white sm:pb-20 sm:pt-32">
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <Image 
                src={post.image} 
                className="object-cover blur-sm" 
                alt={content.title} 
                fill
                priority
              />
            </div>
            
            <div className="container relative z-10 px-4 mx-auto">
              <Link href={localizedPath(safeLocale, "/blog")} 
                className="group mb-8 inline-flex items-center text-sm font-bold uppercase tracking-widest text-gold transition-colors hover:text-white sm:mb-12"
              >
                <ArrowLeft className="mr-3 w-5 h-5 transition-transform group-hover:-translate-x-2" />
                {t(safeLocale, "blog.back_to_list", "Back to Insights")}
              </Link>
 
              <div className="max-w-5xl">
                <div className="mb-8 flex flex-wrap items-start gap-4 sm:items-center sm:gap-6">
                  <Badge className="bg-gold text-charcoal font-bold px-4 py-1 uppercase tracking-widest border-none">
                    {t(safeLocale, `blog.categories.${post.category}`, post.category)}
                  </Badge>
                  <div className="flex flex-wrap items-center gap-3 font-medium text-white/60 sm:gap-4">
                    <time dateTime={post.date} suppressHydrationWarning className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {formatDate(post.date, safeLocale)}
                    </time>
                    <span className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </div>

                <h1 className="mb-8 text-4xl font-bold leading-[1.05] tracking-tighter sm:text-5xl md:mb-12 md:text-8xl">
                  {content.title}
                </h1>

                <div className="flex items-center gap-4 border-t border-white/10 pt-8 mt-8">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gold">{t(safeLocale, "blog.author_label", "Authored By")}</p>
                    <p className="text-lg font-medium">{t(safeLocale, `blog.authors.${post.author}`, post.author)}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="container px-4 mx-auto py-16 sm:py-24">
            <div className="flex flex-col gap-12 lg:flex-row lg:gap-20">
              {/* Main Content */}
              <div className="lg:w-2/3">
                <BlogRenderer blocks={content.blocks} />
                
                {/* Share Section */}
                <div className="mt-20 flex flex-col items-start gap-4 border-t border-cream pt-12 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <Share2 className="w-5 h-5 text-gold-dark" />
                    <span className="font-bold uppercase tracking-widest text-sm text-charcoal">{t(safeLocale, "blog.share", "Share This Insight")}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {['LinkedIn', 'Facebook'].map(plat => (
                      <Button 
                        key={plat} 
                        variant="outline" 
                        className="rounded-full hover:bg-gold hover:text-charcoal transition-all font-bold"
                        onClick={() => handleShare(plat)}
                      >
                        {plat}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar / Related */}
              <aside className="lg:w-1/3">
                <div className="sticky top-32 space-y-12">
                  <div className="rounded-[2.5rem] border border-cream bg-neutral-50 p-6 sm:p-10">
                    <h2 className="mb-8 text-2xl font-bold text-charcoal">{t(safeLocale, "blog.related_articles", "Related Articles")}</h2>
                    <div className="space-y-10">
                      {relatedPosts.map(p => {
                        const pContent = p.translations[safeLocale as 'en'|'fr'|'ko'|'it'] || p.translations["en"];
                        return (
                          <Link key={p.id} href={localizedPath(safeLocale, `/blog/${p.slug}`)} className="group block">
                            <Badge variant="secondary" className="mb-3 bg-cream text-gold-dark font-bold border-none uppercase tracking-widest text-[10px]">
                              {t(safeLocale, `blog.categories.${p.category}`, p.category)}
                            </Badge>
                            <h4 className="font-bold text-lg leading-snug group-hover:text-gold-dark transition-colors line-clamp-2">
                              {pContent.title}
                            </h4>
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="rounded-[2.5rem] bg-gold p-6 text-charcoal sm:p-10">
                    <h3 className="mb-4 text-xl font-bold sm:text-2xl">{t(safeLocale, "blog.cta_title", "Start Your Production")}</h3>
                    <p className="mb-8 text-base font-medium leading-relaxed opacity-80 sm:text-lg">
                      {t(safeLocale, "blog.cta_subtitle", "Leverage our 30+ years of expertise in the Tunisian textile industry.")}
                    </p>
                    <Button asChild className="w-full bg-charcoal hover:bg-white hover:text-charcoal text-white font-bold py-6 rounded-xl transition-all">
                      <Link href={localizedPath(safeLocale, "/contact#contact-form")}>{t(safeLocale, "blog.cta_contact", "Get in Touch")}</Link>
                    </Button>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>

      <Footer locale={safeLocale} />
      <WhatsAppButton />
    </div>
  );
};

export default BlogPostPage;
