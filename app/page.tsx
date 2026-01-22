import { Metadata } from 'next';
import {
  ArrowRight,
  Code,
  Zap,
  Shield,
  Users,
  Award,
  Clock,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SEOService, defaultSEOConfigs } from '@/lib/seo';

export const metadata: Metadata = SEOService.generateMetadata(defaultSEOConfigs.home);

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          {/* Badge */}
          <div className="mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              Professional Web Development Agency
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6">
            Web Buddies –{' '}
            <span className="bg-gradient-to-r from-[#C645F9] to-[#5E6CE7] bg-clip-text text-transparent">
              Modern Websites
            </span>{' '}
            &{' '}
            <span className="bg-gradient-to-r from-[#5E6CE7] to-[#C645F9] bg-clip-text text-transparent">
              Scalable Web Applications
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            We specialize in MERN stack development, Next.js websites, and cutting-edge web applications.
            Transform your digital presence with our expert team of developers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild size="lg" className="wb-bg-primary hover:opacity-90 text-white px-8 py-4 text-lg">
              <Link href="/projects" className="flex items-center space-x-2">
                <span>View Our Work</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="wb-border-secondary wb-text-secondary hover:wb-bg-secondary hover:text-white px-8 py-4 text-lg">
              <Link href="/contact" className="flex items-center space-x-2">
                <span>Get a Free Quote</span>
                <ExternalLink className="h-5 w-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 wb-text-primary" />
              <span>40+ Happy Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 wb-text-primary" />
              <span>50+ Projects Completed</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 wb-text-primary" />
              <span>24h Response Time</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Services Section Component
function ServicesSection() {
  const services = [
    {
      icon: Code,
      title: 'Website Development',
      description: 'Modern, responsive websites built with the latest technologies and best practices.',
      features: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Mobile-First'],
      href: '/services/website-development'
    },
    {
      icon: Zap,
      title: 'MERN Stack Applications',
      description: 'Full-stack web applications using MongoDB, Express.js, React, and Node.js.',
      features: ['Scalable Architecture', 'Real-time Features', 'API Integration', 'Database Design'],
      href: '/services/mern-stack'
    },
    {
      icon: Shield,
      title: 'Next.js Websites',
      description: 'High-performance websites with server-side rendering and optimal SEO.',
      features: ['SSR/SSG', 'SEO Friendly', 'Performance Optimized', 'TypeScript'],
      href: '/services/nextjs'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 wb-border-primary wb-text-primary px-4 py-1">
            Our Expertise
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Specialized Development Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We deliver high-performance solutions using cutting-edge technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
              {/* Stylized Header */}
              <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-[#C645F9]/10 to-[#5E6CE7]/10 h-48 flex items-center justify-center">
                <div className="p-4 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white/20">
                  <service.icon className="h-10 w-10 wb-text-primary" />
                </div>
                <div className="absolute top-3 right-3">
                  <Badge variant="secondary" className="bg-white/50 backdrop-blur-sm">
                    Service
                  </Badge>
                </div>
              </div>

              <CardHeader className="flex-grow">
                <CardTitle className="text-xl group-hover:wb-text-primary transition-colors">
                  <Link href={service.href}>{service.title}</Link>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features as Tech Badges */}
                <div className="flex flex-wrap gap-1 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <Badge key={fIndex} variant="outline" className="text-[10px] py-0 px-2 uppercase tracking-wider font-semibold bg-gray-50 dark:bg-white/5">
                      {feature}
                    </Badge>
                  ))}
                </div>

                <Button asChild className="w-full wb-bg-primary text-white hover:opacity-90 group/btn">
                  <Link href={service.href} className="flex items-center justify-center gap-2">
                    Explore Service <ArrowRight className="h-4 w-4 transform group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Why Choose Us Section
function WhyChooseUsSection() {
  const reasons = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized for speed and performance with 90+ Lighthouse scores.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Built with security best practices and reliable hosting solutions.'
    },
    {
      icon: Users,
      title: 'Client-Focused',
      description: 'We prioritize your needs and maintain clear communication throughout.'
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: '50+ successful projects delivered on time and within budget.'
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Choose Web Buddies?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We combine technical expertise with creative design to deliver exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10 rounded-full">
                  <reason.icon className="h-8 w-8 wb-text-primary" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {reason.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-20 wb-gradient-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Your Project?
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Let's discuss your web development needs and create something amazing together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" variant="secondary" className="bg-white text-[#C645F9] hover:bg-gray-100">
            <Link href="/contact">
              Get Free Consultation
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#C645F9]">
            <Link href="/projects">
              View Our Portfolio
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CTASection />
      <Footer />

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            SEOService.generateStructuredData('WebSite', {
              description: 'Professional web development agency specializing in modern websites and scalable web applications',
            })
          ),
        }}
      />
    </main>
  );
}