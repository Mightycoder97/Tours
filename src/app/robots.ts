import { MetadataRoute } from 'next';
import { getBrandConfig } from '@/lib/brand';

export default function robots(): MetadataRoute.Robots {
  const brand = getBrandConfig();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/checkout', '/cart', '/success'],
    },
    sitemap: `${brand.domain}/sitemap.xml`,
  };
}
