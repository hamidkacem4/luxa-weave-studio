import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';
import { blogPosts } from './src/data/blogPosts.ts'; 
import { collectionsData } from './src/data/collectionsData.ts';

// Note: Using vite-node to handle TypeScript and asset imports during sitemap generation.

const languages = ['en', 'fr', 'ko'];
const base = 'https://magtexco.com';

const staticPages = ['', 'contact', 'recruitment', 'blog', 'textile-tunisie'];

const blogSlugs = Object.values(blogPosts).map(post => post.slug);
const collectionSlugs = Object.keys(collectionsData);

const pages = [
  ...staticPages, 
  ...blogSlugs.map(slug => `blog/${slug}`),
  ...collectionSlugs.map(slug => `collections/${slug}`)
];

const urls = languages.flatMap(lang => 
  pages.map(page => ({
    url: `/${lang}/${page}`,
    changefreq: page.startsWith('blog/') ? 'weekly' : 'daily',
    priority: page === '' ? 1 : 0.8,
    links: languages.map(l => ({ lang: l, url: `/${l}/${page}` })),
  }))
);

(async () => {
  try {
    const stream = new SitemapStream({ hostname: base });
    const data = await streamToPromise(Readable.from(urls).pipe(stream));
    
    // Ensure dist directory exists
    if (!fs.existsSync('dist')) {
      fs.mkdirSync('dist', { recursive: true });
    }
    
    fs.writeFileSync('dist/sitemap.xml', data.toString());
    console.log(`Sitemap generated with ${urls.length} URLs in dist/sitemap.xml!`);
    
    // Also write to public/ for future local builds if desired, but dist is what matters for current deploy
    try {
      if (fs.existsSync('public')) {
        fs.writeFileSync('public/sitemap.xml', data.toString());
      }
    } catch (e) {
      // Ignore errors writing to public during build
    }
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1); // Explicitly exit with 1 on error so the build fails if sitemap fails
  }
})();
