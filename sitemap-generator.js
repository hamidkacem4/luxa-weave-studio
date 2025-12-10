import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';

const languages = ['en', 'fr', 'ko'];
const base = 'https://luxa-weave-studio.vercel.app';
const urls = languages.map(lang => ({
  url: `/${lang}/`,
  changefreq: 'daily',
  priority: 1,
  links: languages.map(l => ({ lang: l, url: `/${l}/` })),
}));

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
