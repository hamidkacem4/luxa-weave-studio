import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { Button } from '@/components/ui/button';
import { ContentBlock } from '@/data/blogPosts';
import { motion } from 'framer-motion';

interface BlogRendererProps {
  blocks: ContentBlock[];
}

const BlogRenderer: React.FC<BlogRendererProps> = ({ blocks }) => {
  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <motion.h2 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-charcoal mt-8 mb-2 tracking-tight"
              >
                {block.text}
              </motion.h2>
            );
          
          case 'paragraph':
            return (
              <motion.p 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light"
              >
                {block.text}
              </motion.p>
            );

          case 'image':
            return (
              <motion.figure 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="my-12 rounded-[2rem] overflow-hidden shadow-2xl border border-cream bg-neutral-50 p-4 md:p-8"
              >
                <div className="relative w-full h-auto">
                   {/* If it's a string (URL), we use standard img or Image with fill. 
                       If it's a static image object (from imports), next/image handles width/height automatically. */}
                   {typeof block.src === 'string' ? (
                     <img 
                       src={block.src} 
                       alt={block.alt} 
                       loading="lazy"
                       className="w-full h-auto rounded-2xl shadow-sm" 
                     />
                   ) : (
                     <Image 
                       src={block.src} 
                       alt={block.alt} 
                       className="w-full h-auto rounded-2xl shadow-sm" 
                     />
                   )}
                </div>
                {block.caption && (
                  <figcaption className="mt-4 text-center text-sm text-muted-foreground italic font-medium">
                    {block.caption}
                  </figcaption>
                )}
              </motion.figure>
            );

          case 'cta':
            const ctaBody = block.subtitle ?? block.text;
            return (
              <motion.section 
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="my-16 p-10 md:p-16 rounded-[3rem] bg-charcoal text-white relative overflow-hidden shadow-2xl group"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-gold opacity-10 blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
                <div className="relative z-10 text-center">
                  {block.title ? (
                    <h3 className="mb-4 text-3xl font-bold md:text-4xl">{block.title}</h3>
                  ) : null}
                  {ctaBody ? (
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-white/60">{ctaBody}</p>
                  ) : null}
                  <Button asChild size="lg" className="bg-gold hover:bg-white text-charcoal font-bold px-12 py-8 rounded-full text-xl shadow-xl transition-all">
                    {block.link ? (
                      <Link href={block.link}>{block.buttonText}</Link>
                    ) : (
                      <span>{block.buttonText}</span>
                    )}
                  </Button>
                </div>
              </motion.section>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default BlogRenderer;
