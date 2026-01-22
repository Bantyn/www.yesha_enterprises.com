'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useRef } from 'react';
import {
  Menu,
  X,
  Code,
  ExternalLink,
  ChevronDown,
  Sun,
  Moon,
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
    name: 'Pricing',
    href: '/pricing',
    submenu: [
      { name: 'Website Development', href: '/pricing/website-development' },
      { name: 'MERN Stack Apps', href: '/pricing/mern-stack' },
      { name: 'Next.js Websites', href: '/pricing/nextjs' },
      { name: 'Admin Dashboards', href: '/pricing/dashboards' },
      { name: 'API Development', href: '/pricing/api-development' },
    ],
  },
  { name: 'Projects', href: '/projects' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);


  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    setDark(!dark);
  };
  const hasAnimated = useRef(false);
  return (
    <motion.nav
      initial={
        hasAnimated.current
          ? false
          : { y: -100, opacity: 0 }
      }
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      onAnimationComplete={() => {
        hasAnimated.current = true;
      }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl"
    >
      <div
        className={`flex items-center justify-between px-6 h-16 rounded-full
        backdrop-blur-xl transition-all duration-300 border border-gray-200 dark:border-white/10`}
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Code className="h-7 w-7 text-[#C645F9] group-hover:rotate-12 transition-transform" />
            <span className="absolute -inset-1 bg-gradient-to-r from-[#C645F9]/30 to-[#5E6CE7]/30 blur rounded-full opacity-0 group-hover:opacity-100 transition" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            Web Buddies
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <div key={item.name} className="relative">
              {item.submenu ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#C645F9] transition">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent
                    align="start"
                    className="mt-3 w-64 rounded-xl bg-white/95 dark:bg-[#140A35]
                    backdrop-blur-xl border border-gray-200/50 dark:border-white/10 shadow-xl p-2"
                  >
                    {item.submenu.map((sub) => (
                      <DropdownMenuItem key={sub.name} asChild>
                        <Link
                          href={sub.href}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
                          ${pathname === sub.href
                              ? 'bg-gradient-to-r from-[#C645F9] to-[#5E6CE7] text-white'
                              : 'text-gray-700 dark:text-gray-300 hover:bg-[#C645F9]/10 hover:text-[#C645F9]'
                            }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C645F9]" />
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  href={item.href}
                  className={`text-sm font-medium transition relative
                  ${pathname === item.href
                      ? 'text-[#C645F9]'
                      : 'text-gray-700 dark:text-gray-300 hover:text-[#C645F9]'
                    }`}
                >
                  {item.name}
                  {pathname === item.href && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#C645F9] to-[#5E6CE7]"
                    />
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-3">


          <Button asChild className="bg-gradient-to-r from-[#C645F9] to-[#5E6CE7] text-white rounded-full px-5">
            <Link href="/contact" className="flex items-center gap-2">
              Get Quote <ExternalLink className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* MOBILE */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-3 rounded-2xl bg-white dark:bg-[#0D0425]
            border border-gray-200 dark:border-white/10 shadow-xl overflow-hidden"
          >
            <div className="p-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 rounded-lg text-sm
                  text-gray-700 dark:text-gray-300
                  hover:bg-[#C645F9]/10 hover:text-[#C645F9]"
                >
                  {item.name}
                </Link>
              ))}

              <Button asChild className="w-full mt-3 bg-gradient-to-r from-[#C645F9] to-[#5E6CE7] text-white">
                <Link href="/contact">Get Free Quote</Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
