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

interface FeaturedBlogCarouselProps {
  posts: BlogPost[];
}

const FeaturedBlogCarousel: React.FC<FeaturedBlogCarouselProps> = ({ posts }) => {
  const { locale = "en" } = useParams();
  const { t } = useTranslation();

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <div className="relative mb-24 group/carousel">
      <Carousel 
        opts={{ loop: true, align: "start" }} 
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        className="w-full"
      >
        <CarouselContent>
          {posts.map((post) => {
            const content = post.translations[locale as 'en'|'fr'|'ko'] || post.translations['en'];
            return (
              <CarouselItem key={post.id} className="basis-full">
                <div className="relative h-[500px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden group shadow-2xl mx-1 md:mx-2">
                  <Image 
                    src={post.image} 
                    alt={content.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="100vw"
                    priority={post.id === posts[0]?.id}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-20 text-white">
                    <div className="max-w-3xl">
                      <div className="flex items-center gap-4 mb-4 md:mb-6">
                        <Badge className="bg-gold text-charcoal font-bold px-3 py-0.5 md:px-4 md:py-1 uppercase tracking-widest border-none text-[10px] md:text-xs">
                          {t(`blog.categories.${post.category}`, post.category)}
                        </Badge>
                        <span className="flex items-center gap-2 text-xs md:text-sm font-medium text-white/80">
                          <Calendar className="w-3.5 h-3.5 md:w-4 h-4" />
                          {new Date(post.date).toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                      </div>
                      
                      <h2 className="text-3xl md:text-6xl font-bold mb-6 md:mb-8 leading-[1.1] tracking-tight">
                        {content.title}
                      </h2>
                      
                      <p className="text-lg md:text-xl text-white/70 mb-8 md:mb-10 line-clamp-2 font-light hidden sm:block">
                        {content.excerpt}
                      </p>
                      
                      <Button asChild size="lg" className="bg-white hover:bg-gold text-charcoal font-bold px-6 py-5 md:px-8 md:py-6 rounded-full transition-all group/btn text-sm md:text-base">
                        <Link href={`/${locale}/blog/${post.slug}`} className="flex items-center gap-2">
                          Read Featured Story
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
