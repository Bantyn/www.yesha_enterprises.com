'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Sun,
  Moon,
  Code,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Services',
    href: '/services',
    submenu: [
      { name: 'Website Development', href: '/services/website-development' },
      { name: 'MERN Stack Apps', href: '/services/mern-stack' },
      { name: 'Next.js Websites', href: '/services/nextjs' },
      { name: 'Admin Dashboards', href: '/services/dashboards' },
      { name: 'API Development', href: '/services/api-development' },
    ]
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Code className="h-8 w-8 wb-text-primary group-hover:rotate-12 transition-transform duration-300" />
              <div className="absolute -inset-1 bg-gradient-to-r from-[#C645F9]/20 to-[#5E6CE7]/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Web Buddies
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative">
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:wb-text-primary transition-colors"
                      >
                        <span>{item.name}</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border border-gray-200/50 dark:border-gray-700/50 shadow-xl">
                      {item.submenu.map((subItem) => (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            href={subItem.href}
                            className="flex items-center space-x-3 w-full px-4 py-3 text-sm hover:wb-bg-primary/10 hover:wb-text-primary transition-all duration-200 rounded-md mx-1"
                          >
                            <div className="w-2 h-2 rounded-full wb-bg-primary/60"></div>
                            <span>{subItem.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors ${pathname === item.href
                      ? 'wb-text-primary'
                      : 'text-gray-700 dark:text-gray-300 hover:wb-text-primary'
                      }`}
                  >
                    {item.name}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 wb-bg-primary"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* CTA Button */}
            <Button asChild className="wb-bg-primary hover:opacity-90 text-white">
              <Link href="/contact" className="flex items-center space-x-2">
                <span>Get Quote</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-300"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
          >
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.submenu ? (
                    <div className="space-y-2">
                      <div className="text-sm font-medium text-gray-900 dark:text-white px-3 py-2">
                        {item.name}
                      </div>
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          onClick={closeMenu}
                          className="block px-6 py-3 text-sm text-gray-600 dark:text-gray-400 hover:wb-text-primary hover:wb-bg-primary/10 rounded-md transition-all duration-200 ml-4"
                        >
                          <div className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 rounded-full wb-bg-primary/60"></div>
                            <span>{subItem.name}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      className={`block px-3 py-2 text-sm font-medium rounded-md transition-colors ${pathname === item.href
                        ? 'wb-text-primary wb-bg-primary/10'
                        : 'text-gray-700 dark:text-gray-300 hover:wb-text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button asChild className="w-full wb-bg-primary hover:opacity-90 text-white">
                  <Link href="/contact" onClick={closeMenu}>
                    Get Free Quote
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}