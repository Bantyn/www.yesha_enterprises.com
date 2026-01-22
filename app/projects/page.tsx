import { Metadata } from 'next';
import { Suspense } from 'react';
import { ProjectsGrid } from './projects-grid';
import { ProjectsFilter } from './projects-filter';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SEOService, defaultSEOConfigs } from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Code, Zap, Users } from 'lucide-react';

export const metadata: Metadata = SEOService.generateMetadata(defaultSEOConfigs.projects);

const stats = [
  { icon: Code, label: 'Projects Completed', value: '50+' },
  { icon: Users, label: 'Happy Clients', value: '40+' },
  { icon: Zap, label: 'Technologies Used', value: '15+' },
];

export default function ProjectsPage() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              🚀 Our Portfolio
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Our Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Explore our portfolio of successful web development projects. From modern websites 
              to complex web applications, see how we've helped businesses achieve their digital goals.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                      <stat.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/contact" className="flex items-center space-x-2">
                <span>Start Your Project</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="mb-8">
            <Suspense fallback={<div>Loading filters...</div>}>
              <ProjectsFilter />
            </Suspense>
          </div>

          {/* Projects Grid */}
          <Suspense fallback={<div>Loading projects...</div>}>
            <ProjectsGrid />
          </Suspense>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your ideas and create something amazing together. 
            Get a free consultation and quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="/contact">
                Get Free Quote
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <Link href="/services">
                View Services
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Web Development Projects - Web Buddies Portfolio',
            description: 'Explore our portfolio of successful web development projects including modern websites, web applications, and MERN stack solutions.',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects`,
            mainEntity: {
              '@type': 'ItemList',
              name: 'Web Development Projects',
              description: 'Portfolio of web development projects by Web Buddies',
            },
          }),
        }}
      />
    </main>
  );
}