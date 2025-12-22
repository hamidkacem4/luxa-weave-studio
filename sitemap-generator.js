import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';

const languages = ['en', 'fr', 'ko'];
const base = 'https://luxa-weave-studio.vercel.app';
const pages = ['', 'contact', 'recruitment']; // Add other pages here

const urls = languages.flatMap(lang => 
  pages.map(page => ({
    url: `/${lang}/${page}`,
    changefreq: 'daily',
    priority: page === '' ? 1 : 0.8,
    links: languages.map(l => ({ lang: l, url: `/${l}/${page}` })),
  }))
);

(async () => {
  try {
    const stream = new SitemapStream({ hostname: base });
    const data = await streamToPromise(Readable.from(urls).pipe(stream));
    fs.writeFileSync('public/sitemap.xml', data.toString());
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
})();
