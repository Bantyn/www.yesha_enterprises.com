import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { Analytics } from '@vercel/analytics/react';
import { SEOService, defaultSEOConfigs } from '@/lib/seo';
import { initializeServices } from '@/lib/db-utils'; // Import DB
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  ...SEOService.generateMetadata(defaultSEOConfigs.home),
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://webbuddies.com'),
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'google-site-verification': process.env.GOOGLE_SITE_VERIFICATION || '',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  // Maintenance Check
  try {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '';

    // Only check if not already on allowed paths
    if (
      !pathname.startsWith('/admin') &&
      !pathname.startsWith('/api') &&
      !pathname.startsWith('/_next') &&
      pathname !== '/maintenance'
    ) {
      const { companyInfo } = await initializeServices();
      const info = await companyInfo.getCompanyInfo();

      if (info?.maintenanceMode) {
        redirect('/maintenance');
      }
    }
  } catch (error) {
    // Fallback or log error, but don't crash the site if DB fails?
    // If DB fails, we probably can't serve content anyway, but let's be safe.
    // console.error("Maintenance check failed", error);
    // If it was a redirect error, rethrow
    if ((error as any).digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
  }

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}

        {/* Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              SEOService.generateStructuredData('Organization', {
                phone: '+1-555-123-4567',
                email: 'hello@webbuddies.com',
                socialLinks: {
                  linkedin: 'https://linkedin.com/company/webbuddies',
                  twitter: 'https://twitter.com/webbuddies',
                  github: 'https://github.com/webbuddies',
                },
              })
            ),
          }}
        />

        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              SEOService.generateStructuredData('WebSite', {
                description: 'Professional web development agency specializing in modern websites and scalable web applications',
              })
            ),
          }}
        />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google-analytics.com" />

        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Analytics />
      </body>
    </html>
  );
}