import { Metadata } from 'next';
import { ContactForm } from './contact-form';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SEOService, defaultSEOConfigs } from '@/lib/seo';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Zap,
  Shield,
  Users
} from 'lucide-react';

export const metadata: Metadata = SEOService.generateMetadata(defaultSEOConfigs.contact);

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    description: 'Get in touch via email',
    value: 'patelbanty1260@gmail.com',
    href: 'mailto:patelbanty1260@gmail.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our team',
    value: '+91 9016576612',
    href: 'tel:+919016576612',
  },
  {
    icon: MapPin,
    title: 'Location',
    description: 'We work remotely & on-site',
    value: 'Surat, Gujarat, India',
    href: null,
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'Monday to Friday',
    value: '9AM - 6PM',
    href: null,
  },
];

const features = [
  {
    icon: Zap,
    title: '24/7 Support',
    description: 'We respond to all inquiries within 24 hours',
  },
  {
    icon: Shield,
    title: 'Free Consultation',
    description: 'Get expert advice at no cost',
  },
  {
    icon: Users,
    title: 'Dedicated Support',
    description: 'Personal project manager assigned',
  },
];

export default function ContactPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Web Buddies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-16">
              Ready to start your web development project? Get in touch for a free consultation
              and quote. We'd love to hear about your ideas and help bring them to life.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10 rounded-full">
                    <feature.icon className="h-6 w-6 wb-text-primary" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Get in Touch
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="p-3 bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10 rounded-xl">
                        <info.icon className="h-5 w-5 wb-text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-1">
                        {info.description}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="wb-text-primary hover:underline font-medium"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <span className="text-gray-900 dark:text-white font-medium">
                          {info.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ */}
              <div className="bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-white/10 rounded-2xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      How long does a typical project take?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Project timelines vary based on complexity, but most websites take 2-6 weeks,
                      while web applications can take 1-3 months.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      Do you provide ongoing support?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Yes! We offer maintenance packages and ongoing support to keep your
                      website secure and up-to-date.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                      What's included in the free consultation?
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      We'll discuss your project requirements, provide technical recommendations,
                      and give you a detailed quote with timeline.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                <div className="flex items-center space-x-2 mb-6">
                  <MessageCircle className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Send us a Message
                  </h2>
                </div>
                <ContactForm />
              </div>
            </div>
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
            '@type': 'ContactPage',
            name: 'Contact Web Buddies',
            description: 'Get in touch with Web Buddies for professional web development services',
            url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
            mainEntity: {
              '@type': 'Organization',
              name: 'Web Buddies',
              email: 'hello@webbuddies.com',
              telephone: '+1-555-123-4567',
              url: process.env.NEXT_PUBLIC_SITE_URL,
            },
          }),
        }}
      />
    </main>
  );
}