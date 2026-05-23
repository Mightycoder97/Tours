import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/checkout', '/cart', '/success'],
    },
    sitemap: 'https://machupicchutravel.com/sitemap.xml',
  };
}
