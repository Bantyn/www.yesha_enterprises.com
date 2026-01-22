import Link from 'next/link';
import { 
  Code, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Github, 
  Instagram,
  ExternalLink,
  Clock,
  Users,
  Award,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const services = [
  { name: 'Website Development', href: '/services/website-development' },
  { name: 'MERN Stack Apps', href: '/services/mern-stack' },
  { name: 'Next.js Websites', href: '/services/nextjs' },
  { name: 'Admin Dashboards', href: '/services/dashboards' },
  { name: 'API Development', href: '/services/api-development' },
];

const company = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

const stats = [
  { icon: Users, label: 'Happy Clients', value: '40+' },
  { icon: Award, label: 'Projects Completed', value: '50+' },
  { icon: Clock, label: 'Years Experience', value: '5+' },
  { icon: Zap, label: 'Response Time', value: '24h' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Stats Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <stat.icon className="h-8 w-8 text-blue-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Code className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">Web Buddies</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              We're a professional web development agency specializing in modern websites 
              and scalable web applications. From MERN stack to Next.js, we bring your 
              digital vision to life.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-5 w-5 wb-text-primary" />
                <a 
                  href="mailto:patelbanty1260@gmail.com" 
                  className="hover:text-white transition-colors"
                >
                  patelbanty1260@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-5 w-5 wb-text-primary" />
                <a 
                  href="tel:+919016576612" 
                  className="hover:text-white transition-colors"
                >
                  +91 9016576612
                </a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-5 w-5 wb-text-primary" />
                <span>Sagrampura, Surat, 395002</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Clock className="h-5 w-5 wb-text-primary" />
                <span>Mon-Fri 9AM-6PM IST</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>{service.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors flex items-center group"
                  >
                    <span>{item.name}</span>
                    <ExternalLink className="h-3 w-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <a
                  href="https://linkedin.com/company/webbuddies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com/webbuddies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="https://github.com/webbuddies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com/webbuddies"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 p-6 wb-gradient-primary rounded-lg">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Ready to Start Your Project?</h3>
            <p className="text-white/80 mb-4">
              Get a free consultation and quote for your web development needs.
            </p>
            <Button 
              asChild 
              variant="secondary" 
              className="bg-white text-[#C645F9] hover:bg-gray-100"
            >
              <Link href="/contact">
                Get Free Quote
              </Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="mb-4 md:mb-0">
            <p>
              © {currentYear} Web Buddies. All rights reserved. Built with ❤️ using Next.js
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}