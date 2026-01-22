import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SEOService, defaultSEOConfigs } from '@/lib/seo';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Award,
  Clock,
  Target,
  Heart,
  Zap,
  Shield,
  Code
} from 'lucide-react';

export const metadata: Metadata = SEOService.generateMetadata(defaultSEOConfigs.about);

const stats = [
  { icon: Users, label: 'Happy Clients', value: '40+' },
  { icon: Award, label: 'Projects Completed', value: '50+' },
  { icon: Clock, label: 'Years Experience', value: '5+' },
  { icon: Target, label: 'Success Rate', value: '98%' },
];

const values = [
  {
    icon: Heart,
    title: 'Client-Focused',
    description: 'We prioritize your needs and maintain clear communication throughout the entire development process.'
  },
  {
    icon: Zap,
    title: 'Innovation',
    description: 'We stay updated with the latest technologies and best practices to deliver cutting-edge solutions.'
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'Every project undergoes rigorous testing to ensure optimal performance, security, and reliability.'
  },
  {
    icon: Code,
    title: 'Clean Code',
    description: 'We write maintainable, scalable code that follows industry standards and best practices.'
  }
];

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-[#0D0425] dark:via-gray-900 dark:to-[#0D0425] overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium mb-6">
              🚀 About Web Buddies
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              About Web Buddies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We are passionate web developers dedicated to creating exceptional digital experiences
              that help businesses thrive in the modern world.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10 rounded-full">
                    <stat.icon className="h-6 w-6 wb-text-primary" />
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
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  Founded by <strong className="wb-text-primary">Banty Patel</strong>, Web Buddies started with a simple mission:
                  to help businesses establish a strong digital presence through innovative web solutions.
                </p>
                <p>
                  Based in <strong>Sagrampura, Surat</strong>, we have grown from a small startup to a trusted
                  web development agency, serving clients across India and beyond. Our expertise spans from
                  simple websites to complex web applications.
                </p>
                <p>
                  We believe in building long-term partnerships with our clients, providing ongoing support
                  and maintenance to ensure their digital success continues to grow.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10 rounded-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Contact Information
              </h3>
              <div className="space-y-3 text-gray-600 dark:text-gray-300">
                <p><strong>Owner:</strong> Banty Patel</p>
                <p><strong>Email:</strong> patelbanty1260@gmail.com</p>
                <p><strong>Phone:</strong> +91 9016576612</p>
                <p><strong>Address:</strong> Sagrampura, Surat, 395002</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do and help us deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900/50">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10 rounded-xl">
                      <value.icon className="h-6 w-6 wb-text-primary" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 dark:text-gray-400">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 wb-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how we can help you achieve your digital goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#C645F9] font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="/projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-white text-white font-medium rounded-lg hover:bg-white hover:text-[#C645F9] transition-colors"
            >
              View Our Work
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}