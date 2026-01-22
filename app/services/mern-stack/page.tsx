import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'MERN Stack Development Services - Web Buddies',
  description: 'Professional MERN Stack development services in Surat. Build scalable web applications with MongoDB, Express, React, and Node.js. Starting from ₹50,000.',
};

export default function MERNStackPage() {
  return (
    <main>
      <Navbar />
      
      <section className="pt-24 pb-12 wb-gradient-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              ⚡ MERN Stack Development
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              MERN Stack Development
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Build powerful, scalable web applications with MongoDB, Express.js, React, and Node.js. 
              Full-stack solutions for modern businesses.
            </p>
            <Button asChild size="lg" className="wb-bg-primary hover:opacity-90 text-white">
              <Link href="/contact">
                Get Started - From ₹50,000
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}