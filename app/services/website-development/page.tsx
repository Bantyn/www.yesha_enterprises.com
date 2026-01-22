import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { 
  CheckCircle, 
  Code, 
  Smartphone, 
  Search, 
  Zap, 
  Shield,
  ArrowRight
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Website Development Services - Web Buddies',
  description: 'Professional website development services in Surat. Modern, responsive websites built with latest technologies. Starting from ₹15,000.',
};

const features = [
  { icon: Smartphone, title: 'Responsive Design', description: 'Works perfectly on all devices' },
  { icon: Search, title: 'SEO Optimized', description: 'Built for search engine visibility' },
  { icon: Zap, title: 'Fast Loading', description: '90+ Lighthouse performance scores' },
  { icon: Shield, title: 'Secure', description: 'Built with security best practices' },
];

const technologies = ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Tailwind CSS'];

const packages = [
  {
    name: 'Basic Website',
    price: '₹15,000',
    features: [
      'Up to 5 pages',
      'Responsive design',
      'Basic SEO setup',
      'Contact form',
      '1 month support'
    ]
  },
  {
    name: 'Business Website',
    price: '₹35,000',
    features: [
      'Up to 10 pages',
      'Advanced design',
      'SEO optimization',
      'CMS integration',
      'Analytics setup',
      '3 months support'
    ]
  },
  {
    name: 'Enterprise Website',
    price: '₹75,000',
    features: [
      'Unlimited pages',
      'Custom functionality',
      'Advanced SEO',
      'Performance optimization',
      'Security features',
      '6 months support'
    ]
  }
];

export default function WebsiteDevelopmentPage() {
  return (
    <main>
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center pt-24 pb-12 wb-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              💻 Website Development
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Professional Website Development
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Create a stunning online presence with our modern, responsive websites. 
              Built with the latest technologies and optimized for performance.
            </p>
            <Button asChild size="lg" className="wb-bg-primary hover:opacity-90 text-white">
              <Link href="/contact">
                Get Started - From ₹15,000
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
              Why Choose Our Website Development?
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
              Technologies We Use
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We use the latest and most reliable technologies
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
              Website Development Packages
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Choose the perfect package for your needs
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
            Ready to Build Your Website?
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