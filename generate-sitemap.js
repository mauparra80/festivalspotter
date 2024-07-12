import { SitemapStream } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/festival-search', changefreq: 'weekly', priority: 0.1 },
  { url: '/festiva-results', changefreq: 'weekly', priority: 0.8 },
  { url: '/FAQS', changefreq: 'weekly', priority: 0.8 },
  // Add more URLs as needed
];

const sitemap = new SitemapStream({ hostname: 'https://festivalspotter.com' });
const writeStream = createWriteStream(resolve('./public/sitemap.xml'));

const asyncPipeline = promisify(pipeline);

(async () => {
  try {
    await asyncPipeline(
      sitemap,
      writeStream
    );
    console.log('Sitemap created!');
  } catch (err) {
    console.error('Error creating sitemap:', err);
  }
})();

links.forEach((link) => sitemap.write(link));
sitemap.end();