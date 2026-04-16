import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { BlogPost } from '@/data/blogPosts';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Autoplay from 'embla-carousel-autoplay';
import { normalizeLocale } from "@/lib/locale";
import { formatDate } from "@/lib/formatDate";
import { localizedPath } from "@/lib/seo";

interface FeaturedBlogCarouselProps {
  posts: BlogPost[];
}

const FeaturedBlogCarousel: React.FC<FeaturedBlogCarouselProps> = ({ posts }) => {
  const params = (useParams() ?? {}) as { locale?: string };
  const locale = normalizeLocale(params.locale);
  const { t } = useTranslation();

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="group/carousel relative mb-16 sm:mb-24">
      <Carousel 
        opts={{ loop: true, align: "start" }} 
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
      >
        <CarouselContent>
          {posts.map((post) => {
            const content = post.translations[locale as 'en'|'fr'|'ko'|'it'] || post.translations['en'];
            const postPath = localizedPath(locale, `/blog/${post.slug}`);
            return (
              <CarouselItem key={post.id} className="basis-full">
                <div className="group relative mx-1 h-[420px] overflow-hidden rounded-[2rem] shadow-2xl sm:h-[500px] md:mx-2 md:h-[600px] md:rounded-[3rem]">
                  <Image 
                    src={post.image} 
                    alt={content.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="100vw"
                    priority={post.id === posts[0]?.id}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white sm:p-8 md:p-20">
                    <div className="max-w-3xl">
                      <div className="mb-4 flex flex-wrap items-center gap-3 md:mb-6 md:gap-4">
                        <Badge className="bg-gold text-charcoal font-bold px-3 py-0.5 md:px-4 md:py-1 uppercase tracking-widest border-none text-[10px] md:text-xs">
                          {t(`blog.categories.${post.category}`, post.category)}
                        </Badge>
                          <Calendar className="w-3.5 h-3.5 md:w-4 h-4" />
                          <time dateTime={post.date} suppressHydrationWarning>
                            {formatDate(post.date, locale)}
                          </time>
                      </div>
                      
                      <h2 className="mb-5 text-2xl font-bold leading-[1.1] tracking-tight sm:text-3xl md:mb-8 md:text-6xl">
                        {content.title}
                      </h2>
                      
                      <p className="text-lg md:text-xl text-white/70 mb-8 md:mb-10 line-clamp-2 font-light hidden sm:block">
                        {content.excerpt}
                      </p>
                      
                      <Button asChild size="lg" className="group/btn w-full rounded-full bg-white px-6 py-5 text-sm font-bold text-charcoal transition-all hover:bg-gold sm:w-auto md:px-8 md:py-6 md:text-base">
                        <Link href={postPath} className="flex items-center gap-2">
                          {t("blog.read_featured", "Read Featured Story")}
                          <ArrowRight className="w-4 h-4 md:w-5 h-5 transition-transform group-hover/btn:translate-x-2" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <div className="hidden md:block opacity-0 group-hover/carousel:opacity-100 transition-opacity">
          <CarouselPrevious className="left-8 bg-white/10 hover:bg-white/20 border-white/20 text-white h-12 w-12" />
          <CarouselNext className="right-8 bg-white/10 hover:bg-white/20 border-white/20 text-white h-12 w-12" />
        </div>
      </Carousel>
    </div>
  );
};

export default FeaturedBlogCarousel;
