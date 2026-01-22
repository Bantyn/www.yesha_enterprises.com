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
    value: 'hello@webbuddies.com',
    href: 'mailto:hello@webbuddies.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    description: 'Speak with our team',
    value: '+1 (555) 123-4567',
    href: 'tel:+15551234567',
  },
  {
    icon: MapPin,
    title: 'Location',
    description: 'We work remotely & on-site',
    value: 'Worldwide',
    href: null,
  },
  {
    icon: Clock,
    title: 'Business Hours',
    description: 'Monday to Friday',
    value: '9AM - 6PM EST',
    href: null,
  },
];

const features = [
  {
    icon: Zap,
    title: '24h Response',
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
      <section className="pt-24 pb-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Web Buddies
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Ready to start your web development project? Get in touch for a free consultation 
              and quote. We'd love to hear about your ideas and help bring them to life.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
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
                      <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                        <info.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                          className="text-blue-600 dark:text-blue-400 hover:underline"
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
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-4">
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