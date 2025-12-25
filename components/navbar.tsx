"use client"

import { Menu, X } from "lucide-react"
import { useBooking } from "@/hooks/use-booking"
import { useState } from "react"
import Link from "next/link"

export function Navbar() {
  const openBooking = useBooking((state) => state.openBooking)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="flex items-center justify-between px-6 py-8 md:px-12 border-b border-border  backdrop-blur-sm bg-neutral-200/30 sticky top-0 z-40">
      <Link href="/" className="text-xl font-bold tracking-tighter font-sans uppercase">
        YESHA ENTERPRISES
      </Link>

      <div className="hidden md:flex gap-12 items-center text-[15px] uppercase tracking-widest text-muted-foreground">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <Link href="/technology" className="hover:text-primary transition-colors">
          Technology
        </Link>
        <Link href="/collection" className="hover:text-primary transition-colors">
          Collection
        </Link>
        <Link href="/support" className="hover:text-primary transition-colors">
          Support
        </Link>
      </div>

      <div className="flex items-center gap-6 ">
        <button
          onClick={() => openBooking()}
          className="text-sm font-medium  hover:text-primary transition-colors relative group"
        >
          Book Installation
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
        </button>
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-background border-b border-border p-6 flex flex-col gap-6 animate-in slide-in-from-top duration-300 md:hidden shadow-xl">
          <Link href="/technology" className="text-lg font-serif" onClick={() => setIsMobileMenuOpen(false)}>
            Technology
          </Link>
          <Link href="/collection" className="text-lg font-serif" onClick={() => setIsMobileMenuOpen(false)}>
            Collection
          </Link>
          <Link href="/support" className="text-lg font-serif" onClick={() => setIsMobileMenuOpen(false)}>
            Support
          </Link>
          <button
            onClick={() => {
              openBooking()
              setIsMobileMenuOpen(false)
            }}
            className="bg-primary text-primary-foreground py-4 rounded-sm text-sm font-medium uppercase tracking-widest"
          >
            Book Appointment
          </button>
        </div>
      )}
    </nav>
  )
}
