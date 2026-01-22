import { Metadata } from 'next';
import { SEOSettings } from './db-schemas';

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || 'Web Buddies';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://webbuddies.com';

export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: any;
}

export class SEOService {
  static generateMetadata(config: SEOConfig): Metadata {
    const {
      title,
      description,
      keywords = [],
      ogImage,
      canonicalUrl,
      noIndex = false
    } = config;

    const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
    const imageUrl = ogImage || `${SITE_URL}/og-image.jpg`;
    const url = canonicalUrl || SITE_URL;

    return {
      title: fullTitle,
      description,
      keywords: keywords.join(', '),
      robots: noIndex ? 'noindex,nofollow' : 'index,follow',
      openGraph: {
        title: fullTitle,
        description,
        url,
        siteName: SITE_NAME,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: fullTitle,
        description,
        images: [imageUrl],
        creator: '@webbuddies',
      },
      alternates: {
        canonical: url,
      },
    };
  }

  static generateStructuredData(type: 'Organization' | 'WebSite' | 'Service' | 'Article', data: any) {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    switch (type) {
      case 'Organization':
        return {
          ...baseData,
          name: SITE_NAME,
          url: SITE_URL,
          logo: `${SITE_URL}/logo.png`,
          description: 'Professional web development agency specializing in modern websites and scalable web applications',
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: data.phone || '+1-555-123-4567',
            contactType: 'customer service',
            email: data.email || 'hello@webbuddies.com',
          },
          address: data.address ? {
            '@type': 'PostalAddress',
            addressLocality: data.address.city,
            addressRegion: data.address.state,
            addressCountry: data.address.country,
          } : undefined,
          sameAs: data.socialLinks ? Object.values(data.socialLinks).filter(Boolean) : [],
        };

      case 'WebSite':
        return {
          ...baseData,
          name: SITE_NAME,
          url: SITE_URL,
          description: data.description,
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE_URL}/search?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        };

      case 'Service':
        return {
          ...baseData,
          name: data.title,
          description: data.description,
          provider: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
          },
          serviceType: data.category,
          offers: {
            '@type': 'Offer',
            price: data.startingPrice,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        };

      case 'Article':
        return {
          ...baseData,
          headline: data.title,
          description: data.description,
          image: data.image,
          author: {
            '@type': 'Organization',
            name: SITE_NAME,
          },
          publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            logo: {
              '@type': 'ImageObject',
              url: `${SITE_URL}/logo.png`,
            },
          },
          datePublished: data.publishedDate,
          dateModified: data.modifiedDate,
        };

      default:
        return baseData;
    }
  }

  static generateBreadcrumbStructuredData(breadcrumbs: Array<{ name: string; url: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };
  }

  static generateFAQStructuredData(faqs: Array<{ question: string; answer: string }>) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(faq => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    };
  }

  static generateLocalBusinessStructuredData(business: any) {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': SITE_URL,
      name: SITE_NAME,
      image: `${SITE_URL}/logo.png`,
      url: SITE_URL,
      telephone: business.phone,
      email: business.email,
      address: business.address ? {
        '@type': 'PostalAddress',
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.zip,
        addressCountry: business.address.country,
      } : undefined,
      geo: business.coordinates ? {
        '@type': 'GeoCoordinates',
        latitude: business.coordinates.lat,
        longitude: business.coordinates.lng,
      } : undefined,
      openingHoursSpecification: business.hours ? {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      } : undefined,
      sameAs: business.socialLinks ? Object.values(business.socialLinks).filter(Boolean) : [],
    };
  }

  static optimizeImageForSEO(src: string, alt: string, width?: number, height?: number) {
    return {
      src,
      alt,
      width,
      height,
      loading: 'lazy' as const,
      decoding: 'async' as const,
    };
  }

  static generateCanonicalUrl(path: string): string {
    return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
  }

  static generateSitemap(pages: Array<{ url: string; lastModified?: Date; priority?: number }>) {
    const urls = pages.map(page => ({
      url: this.generateCanonicalUrl(page.url),
      lastModified: page.lastModified || new Date(),
      changeFrequency: 'weekly' as const,
      priority: page.priority || 0.8,
    }));

    return urls;
  }

  static generateRobotsTxt(): string {
    return `User-agent: *
Allow: /

# Sitemaps
Sitemap: ${SITE_URL}/sitemap.xml

# Disallow admin and API routes
Disallow: /admin/
Disallow: /api/

# Allow important pages
Allow: /
Allow: /services/
Allow: /projects/
Allow: /about/
Allow: /contact/`;
  }
}

// Default SEO configurations for different page types
export const defaultSEOConfigs = {
  home: {
    title: 'Web Buddies – Modern Websites & Scalable Web Applications',
    description: 'Professional web development agency specializing in MERN stack, Next.js, and modern web applications. Get your dream website built by experts.',
    keywords: ['web development', 'MERN stack', 'Next.js', 'web applications', 'website design', 'React development'],
  },
  about: {
    title: 'About Web Buddies - Expert Web Development Team',
    description: 'Learn about Web Buddies, a professional web development agency with years of experience in creating modern websites and scalable web applications.',
    keywords: ['web development team', 'about web buddies', 'web development agency', 'professional developers'],
  },
  services: {
    title: 'Web Development Services - MERN Stack, Next.js & More',
    description: 'Comprehensive web development services including MERN stack applications, Next.js websites, admin dashboards, and API development.',
    keywords: ['web development services', 'MERN stack development', 'Next.js development', 'API development', 'admin dashboard'],
  },
  projects: {
    title: 'Our Projects - Web Development Portfolio',
    description: 'Explore our portfolio of successful web development projects including modern websites, web applications, and MERN stack solutions.',
    keywords: ['web development portfolio', 'project showcase', 'website examples', 'web application examples'],
  },
  contact: {
    title: 'Contact Web Buddies - Get Your Free Quote',
    description: 'Ready to start your web development project? Contact Web Buddies for a free consultation and quote. We respond within 24 hours.',
    keywords: ['contact web developer', 'free quote', 'web development consultation', 'hire web developer'],
  },
};