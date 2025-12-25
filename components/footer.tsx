import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="px-6 py-12 md:px-12 border-t border-border mt-24">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-bold uppercase mb-4 font-sans tracking-tighter">YESHA ENTERPRISES</h2>
          <p className="text-muted-foreground max-w-xs font-light">
            Crafting high-performance heating solutions that blend seamlessly into the sophisticated home environment.
          </p>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-widest mb-6">Support</h4>
          <ul className="space-y-3 text-sm font-light">
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Installation
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Maintenance
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                Warranty
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-primary transition-colors">
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-[10px] uppercase tracking-widest mb-6">Newsletter</h4>
          <div className="relative border-b border-foreground/20 pb-2">
            <input
              type="email"
              placeholder="Email"
              className="bg-transparent w-full outline-none text-sm font-light"
            />
            <button className="absolute right-0 top-0">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:row items-center justify-between pt-12 border-t border-border gap-4">
        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
          © 2026 YESHA ENTERPRISES. All rights reserved.
        </p>
        <div className="flex gap-8 text-[10px] uppercase tracking-widest text-muted-foreground">
          <Link href="#">Instagram</Link>
          <Link href="#">Twitter</Link>
          <Link href="#">Linkedin</Link>
        </div>
      </div>
    </footer>
  )
}
