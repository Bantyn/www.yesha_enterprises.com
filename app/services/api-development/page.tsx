import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'API Development Services - Web Buddies',
  description:
    'Professional API development services in Surat. We build secure, scalable REST APIs, GraphQL APIs, and microservices for modern web and mobile applications.',
};

export default function APIPage() {
  return (
    <main className="bg-white dark:bg-[#0D0425] text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex items-center justify-center pt-28 pb-20 wb-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            🔌 API Development
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Scalable & Secure API Development
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            We design and build high-performance APIs that power modern web and mobile
            applications. From RESTful APIs to GraphQL and microservices.
          </p>

          <Button asChild size="lg" className="wb-bg-primary text-white hover:opacity-90">
            <Link href="/contact">Get Started — From ₹25,000</Link>
          </Button>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="py-20 bg-white dark:bg-[#0D0425]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              End-to-end API development services tailored to your business needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'RESTful APIs',
                desc: 'Well-structured REST APIs with authentication, validation, and documentation.',
              },
              {
                title: 'GraphQL APIs',
                desc: 'Flexible GraphQL APIs for faster frontend development and optimized data fetching.',
              },
              {
                title: 'Microservices',
                desc: 'Scalable microservices architecture designed for growth and performance.',
              },
            ].map((item) => (
              <Card
                key={item.title}
                className="bg-white dark:bg-[#140A35] border border-gray-200 dark:border-white/10"
              >
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="py-20 wb-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Technology Stack</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            We use modern, battle-tested technologies to ensure reliability and scalability.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'GraphQL', 'JWT', 'Docker'].map(
              (tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="px-4 py-2 text-sm dark:border-white/20"
                >
                  {tech}
                </Badge>
              )
            )}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 bg-white dark:bg-[#0D0425]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold mb-4">Why Web Buddies?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We focus on quality, security, and long-term scalability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              'Secure authentication & authorization',
              'Clean and maintainable code',
              'Performance-optimized APIs',
              'Clear documentation & testing',
            ].map((point) => (
              <div
                key={point}
                className="p-6 rounded-xl bg-gray-50 dark:bg-[#140A35] border border-gray-200 dark:border-white/10"
              >
                <p className="font-medium">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 text-center wb-gradient-soft">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Build Your API?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Let’s discuss your requirements and build an API that scales with your business.
        </p>
        <Button asChild size="lg" className="wb-bg-primary text-white hover:opacity-90">
          <Link href="/contact">Contact Web Buddies</Link>
        </Button>
      </section>

      <Footer />
    </main>
  );
}
