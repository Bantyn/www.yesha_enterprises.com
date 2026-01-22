import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  CheckCircle, 
  Zap, 
  Search, 
  Shield, 
  Code,
  ArrowRight,
  Server,
  Smartphone
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Next.js Development Services - Web Buddies',
  description: 'Professional Next.js development services in Surat. High-performance websites with SSR, SSG, and optimal SEO. Starting from ₹25,000.',
};

const features = [
  { icon: Server, title: 'Server-Side Rendering', description: 'Fast initial page loads with SSR' },
  { icon: Search, title: 'SEO Optimized', description: 'Built-in SEO optimization features' },
  { icon: Zap, title: 'Performance', description: 'Automatic code splitting and optimization' },
  { icon: Shield, title: 'Production Ready', description: 'Enterprise-grade security and reliability' },
];

const technologies = ['Next.js 14', 'React 18', 'TypeScript', 'Tailwind CSS', 'Vercel', 'API Routes'];

const packages = [
  {
    name: 'Static Website',
    price: '₹25,000',
    features: [
      'Static Site Generation (SSG)',
      'Up to 10 pages',
      'SEO optimization',
      'Responsive design',
      'Fast loading',
      '2 months support'
    ]
  },
  {
    name: 'Dynamic Website',
    price: '₹45,000',
    features: [
      'Server-Side Rendering (SSR)',
      'Dynamic content',
      'API integration',
      'Advanced SEO',
      'Performance optimization',
      '4 months support'
    ]
  },
  {
    name: 'Full-Stack App',
    price: '₹85,000',
    features: [
      'Full-stack Next.js app',
      'Database integration',
      'Authentication system',
      'Admin dashboard',
      'Custom functionality',
      '6 months support'
    ]
  }
];

export default function NextJSPage() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 wb-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              ⚡ Next.js Development
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Next.js Development Services
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Build lightning-fast, SEO-optimized websites with Next.js. Server-side rendering, 
              static generation, and optimal performance out of the box.
            </p>
            <Button asChild size="lg" className="wb-bg-primary hover:opacity-90 text-white">
              <Link href="/contact">
                Get Started - From ₹25,000
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Next.js?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10 rounded-full">
                      <feature.icon className="h-8 w-8 wb-text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Next.js Tech Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Modern technologies for optimal performance
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="px-4 py-2 text-lg wb-border-primary wb-text-primary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Next.js Development Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the perfect package for your project
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`hover:shadow-lg transition-shadow ${index === 1 ? 'ring-2 ring-[#C645F9]' : ''}`}>
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold wb-text-primary">{pkg.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full mt-6 wb-bg-primary hover:opacity-90 text-white">
                    <Link href="/contact">
                      Choose This Package
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 wb-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Build with Next.js?
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Contact us today for a free consultation and quote
          </p>
          <Button asChild size="lg" variant="secondary" className="bg-white text-[#C645F9] hover:bg-gray-100">
            <Link href="/contact" className="flex items-center space-x-2">
              <span>Get Free Quote</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}