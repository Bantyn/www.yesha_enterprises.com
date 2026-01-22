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
    <footer className="relative bg-[#0D0425] text-white overflow-hidden">
      {/* Soft background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#C645F9]/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#5E6CE7]/20 blur-[140px]" />
      </div>

      {/* Stats */}
      <div className="relative border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-9 w-9 text-[#C645F9]" />
                </div>
                <div className="text-3xl font-bold mb-1">
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

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-5">
              <div className="p-2 rounded-lg bg-gradient-to-r from-[#C645F9] to-[#5E6CE7]">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold tracking-tight">
                Web Buddies
              </span>
            </div>

            <p className="text-gray-400 max-w-md mb-8">
              We build modern, high-performance websites and scalable web applications.
              From MERN stack to Next.js, we help businesses grow digitally.
            </p>

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3 text-gray-400">
                <Mail className="h-4 w-4 text-[#C645F9]" />
                <a href="mailto:patelbanty1260@gmail.com" className="hover:text-white">
                  patelbanty1260@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Phone className="h-4 w-4 text-[#C645F9]" />
                <a href="tel:+919016576612" className="hover:text-white">
                  +91 9016576612
                </a>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <MapPin className="h-4 w-4 text-[#C645F9]" />
                <span>Sagrampura, Surat – 395002</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400">
                <Clock className="h-4 w-4 text-[#C645F9]" />
                <span>Mon – Fri, 9AM – 6PM IST</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <span>{service.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Company</h3>
            <ul className="space-y-3 mb-6">
              {company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
                  >
                    <span>{item.name}</span>
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>

            {/* Socials */}
            <div className="flex gap-4">
              {[Linkedin, Twitter, Github, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-white/5 hover:bg-gradient-to-r hover:from-[#C645F9] hover:to-[#5E6CE7] transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-[#C645F9] to-[#5E6CE7] p-8 text-center shadow-xl">
          <h3 className="text-2xl font-bold mb-3">
            Ready to Start Your Project?
          </h3>
          <p className="text-white/80 mb-6">
            Get a free consultation and let’s build something amazing together.
          </p>
          <Button
            asChild
            className="bg-white text-[#C645F9] font-semibold hover:bg-gray-100"
          >
            <Link href="/contact">Get Free Quote</Link>
          </Button>
        </div>

        <Separator className="my-10 bg-white/10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p className="mb-4 md:mb-0">
            © {currentYear} Web Buddies. Built with ❤️ using Next.js
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
            <Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
