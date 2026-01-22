import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import {
  BarChart3,
  Users,
  ShieldCheck,
  Database,
  LineChart,
  Settings,
  Workflow,
  CheckCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard Development - Web Buddies',
  description:
    'Custom admin dashboard development services in Surat. Analytics, role management, reporting & scalable systems. Starting from ₹40,000.',
};

const features = [
  {
    icon: BarChart3,
    title: 'Real-Time Analytics',
    description:
      'Interactive charts, KPIs, and dashboards to monitor business performance.',
  },
  {
    icon: Users,
    title: 'User & Role Management',
    description:
      'Admin, staff, and user roles with secure permission-based access.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Authentication',
    description:
      'JWT, role-based access control, and data protection best practices.',
  },
  {
    icon: Database,
    title: 'Data Management',
    description:
      'CRUD operations, filters, exports, and advanced data handling.',
  },
  {
    icon: LineChart,
    title: 'Reports & Insights',
    description:
      'Automated reports and meaningful insights from your data.',
  },
  {
    icon: Settings,
    title: 'Custom Integrations',
    description:
      'APIs, payment gateways, third-party tools, and custom logic.',
  },
];

const useCases = [
  'Business Admin Panels',
  'SaaS Dashboards',
  'CRM & ERP Systems',
  'E-commerce Management Panels',
  'Analytics & Reporting Tools',
  'Booking & Operations Dashboards',
];

const process = [
  {
    step: '01',
    title: 'Requirements & Planning',
    description:
      'Understanding workflows, data structure, and admin needs.',
  },
  {
    step: '02',
    title: 'UI/UX & Architecture',
    description:
      'Designing clean interfaces and scalable backend architecture.',
  },
  {
    step: '03',
    title: 'Dashboard Development',
    description:
      'Building frontend, APIs, authentication, and data handling.',
  },
  {
    step: '04',
    title: 'Testing & Optimization',
    description:
      'Performance testing, security checks, and UX improvements.',
  },
  {
    step: '05',
    title: 'Deployment & Support',
    description:
      'Production launch with ongoing support and enhancements.',
  },
];

export default function DashboardsPage() {
  return (
    <main className="bg-white dark:bg-[#0D0425] text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center wb-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-6">
            📊 Admin Dashboard Solutions
          </Badge>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Admin Dashboard{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C645F9] to-[#5E6CE7]">
              Development
            </span>
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Powerful, secure, and scalable admin dashboards tailored to your business —
            analytics, management, and automation in one place.
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
              Dashboard Features
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Everything you need to manage, analyze, and scale your operations.
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

      {/* USE CASES */}
      <section className="py-24 bg-gray-50 dark:bg-[#140A35]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Use Cases
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
              Structured approach to build reliable dashboards.
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
                <h4 className="font-semibold mb-2">
                  {step.title}
                </h4>
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
            Dashboard Development Pricing
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Custom admin dashboards start from <strong>₹40,000</strong>.  
            Includes authentication, role management, analytics, and API integration.
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
