import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="px-6 py-12 md:px-12 border-t border-border mt-24 bg-transparent ">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold uppercase mb-4 font-sans tracking-tighter">YESHA ENTERPRISES</h2>
          <p className="text-muted-foreground max-w-xs font-light">
            Crafting high-performance heating solutions that blend seamlessly into the sophisticated home environment.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-widest mb-6">Quick Links</h4>
          <ul className="space-y-3 text-sm font-light">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/technology" className="hover:text-primary transition-colors">
                Technology
              </Link>
            </li>
            <li>
              <Link href="/collection" className="hover:text-primary transition-colors">
                Collection
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-primary transition-colors">
                Support
              </Link>
            </li>
          </ul>
        </div>
        <div>
          
          <h4 className="text-[10px] uppercase tracking-widest mb-6">Services</h4>
          <ul className="space-y-3 text-sm font-light">
            <li>
              <Link href="/support" className="hover:text-primary transition-colors">
                Installation
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-primary transition-colors">
                Maintenance
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-primary transition-colors">
                Warranty
              </Link>
            </li>
            <li>
              <Link href="/support" className="hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
         <div>
          <h4 className="text-[10px] uppercase tracking-widest mb-6">Developers</h4>
          <ul className="space-y-3 text-sm font-light">
            <li>
              <a href="https://webbuddies.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                web_buddies.dev
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex flex-col md:row items-center justify-between pt-12 border-t border-border gap-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          © 2026 YESHA ENTERPRISES. All rights reserved.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link href="https://instagram.com/yeshaenterprises" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Instagram
          </Link>
          <Link href="https://twitter.com/yeshaenterprises" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            Twitter
          </Link>
          <Link href="https://linkedin.com/company/yeshaenterprises" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
            LinkedIn
          </Link>
        </div>
        <p className="text-[11px] text-black/50 mt-10  tracking-wider">
          Designed and Developed by web_buddies
        </p>
      </div>
    </footer>
  )
}
