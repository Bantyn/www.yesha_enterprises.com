import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  Database,
  Server,
  Layout,
  Zap,
  Shield,
  TrendingUp,
  Layers,
  Users,
  Workflow,
  CheckCircle
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'MERN Stack Development Services - Web Buddies',
  description:
    'Professional MERN Stack development services in Surat. Scalable web apps using MongoDB, Express, React & Node.js. Starting from ₹50,000.',
};

const features = [
  {
    icon: Database,
    title: 'MongoDB',
    description: 'Flexible NoSQL database designed for performance and scalability.',
  },
  {
    icon: Server,
    title: 'Express & Node.js',
    description: 'Fast backend APIs with clean architecture and async handling.',
  },
  {
    icon: Layout,
    title: 'React.js',
    description: 'Dynamic, component-driven UI with excellent user experience.',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Optimized builds, fast APIs, and SEO-friendly rendering.',
  },
  {
    icon: Shield,
    title: 'Secure Architecture',
    description: 'JWT auth, role-based access, and secure API practices.',
  },
  {
    icon: TrendingUp,
    title: 'Scalable Systems',
    description: 'Applications that grow with your users and data.',
  },
];

const useCases = [
  'Admin Dashboards & CRMs',
  'SaaS Platforms',
  'E-commerce Applications',
  'Booking & Management Systems',
  'Custom Business Tools',
  'Startup MVP Development',
];

const process = [
  {
    step: '01',
    title: 'Requirement Analysis',
    description: 'Understanding your business goals, features, and scalability needs.',
  },
  {
    step: '02',
    title: 'UI & Architecture Design',
    description: 'Designing UI flows, database schema, and API structure.',
  },
  {
    step: '03',
    title: 'Development',
    description: 'Building frontend, backend, and APIs using MERN stack.',
  },
  {
    step: '04',
    title: 'Testing & Optimization',
    description: 'Performance tuning, security testing, and bug fixing.',
  },
  {
    step: '05',
    title: 'Deployment & Support',
    description: 'Production deployment with post-launch support.',
  },
];

export default function MERNStackPage() {
  return (
    <main className="bg-white dark:bg-[#0D0425] text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center wb-gradient-soft overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">
            ⚡ Full-Stack Web Development
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            MERN Stack{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C645F9] to-[#5E6CE7]">
              Development
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            We build scalable, secure, and high-performance web applications using
            MongoDB, Express.js, React, and Node.js — from MVP to enterprise systems.
          </p>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="wb-bg-primary text-white px-8">
              <Link href="/contact">Talk to Experts</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="#pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose MERN Stack?
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              A modern, flexible stack trusted by startups and enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <Card
                key={i}
                className="border-gray-200 dark:border-white/10 dark:bg-[#140A35]/50 hover:shadow-xl transition-all"
              >
                <CardContent className="p-8">
                  <div className="mb-6 p-3 w-fit rounded-xl bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10">
                    <feature.icon className="h-6 w-6 text-[#C645F9]" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section className="py-24 bg-gray-50 dark:bg-[#140A35]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              What We Build Using MERN
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-5 rounded-xl bg-white dark:bg-[#0D0425] border border-gray-200 dark:border-white/10"
              >
                <CheckCircle className="h-5 w-5 text-[#C645F9]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Our Development Process
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Transparent, agile, and result-oriented workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {process.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-xl bg-white dark:bg-[#140A35] border border-gray-200 dark:border-white/10"
              >
                <div className="text-2xl font-bold text-[#C645F9] mb-2">
                  {step.step}
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING CTA */}
      <section id="pricing" className="py-24 wb-gradient-primary text-white">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            MERN Stack Pricing
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Packages start from <strong>₹50,000</strong>.
            Includes authentication, admin panel, APIs, and database setup.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-[#C645F9] hover:bg-gray-100 px-12"
          >
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
