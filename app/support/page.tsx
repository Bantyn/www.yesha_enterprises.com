"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import {
  Phone,
  Mail,
  FileText,
  PenTool as Tool,
  ShieldCheck,
  Clock,
  HelpCircle,
} from "lucide-react"
import MaintenanceScreen from "@/components/maintenance-screen"

export default function SupportPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings")
        const data = await res.json()
        setMaintenanceMode(data.maintenanceMode || false)
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }

    fetchSettings()
  }, [])

  if (maintenanceMode) {
    return <MaintenanceScreen />
  }
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="px-6 pt-28 pb-20 max-w-5xl mx-auto text-center">
        <span className="text-[11px] uppercase tracking-widest text-primary block mb-4">
          Support Center
        </span>
        <h1 className="text-5xl md:text-6xl mb-6">
          How can we help you?
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          From installation guidance to technical troubleshooting, our support
          team is here to ensure your AquaFlow experience is flawless.
        </p>
      </section>

      {/* Support Options */}
      <section className="px-6 max-w-6xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Technical Support */}
          <div className="group relative p-8 rounded-3xl border border-border bg-neutral-200 hover:scale-105 backdrop-blur hover:border-primary transition-all">
            <Tool className="w-9 h-9 text-primary mb-6" />
            <h3 className="text-xl mb-3">Technical Support</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Step-by-step help for installation issues, error codes,
              performance optimization, and long-term maintenance.
            </p>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>• Installation & setup</li>
              <li>• Error diagnostics</li>
              <li>• Annual servicing</li>
            </ul>
          </div>

          {/* Manuals */}
          <div className="group relative p-8 rounded-3xl border border-border bg-neutral-200 hover:scale-105 backdrop-blur hover:border-primary transition-all">
            <FileText className="w-9 h-9 text-primary mb-6" />
            <h3 className="text-xl mb-3">User Manuals</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Access comprehensive PDF guides covering safety instructions,
              installation steps, and operating best practices.
            </p>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>• Model-specific manuals</li>
              <li>• Safety certifications</li>
              <li>• Warranty terms</li>
            </ul>
          </div>

          {/* Warranty */}
          <div className="group relative p-8 rounded-3xl border border-border bg-neutral-200 hover:scale-105 backdrop-blur hover:border-primary transition-all">
            <ShieldCheck className="w-9 h-9 text-primary mb-6" />
            <h3 className="text-xl mb-3">Warranty & Claims</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Learn about product coverage, warranty registration, and the
              hassle-free claim process.
            </p>
            <ul className="text-xs text-muted-foreground space-y-2">
              <li>• Warranty duration</li>
              <li>• Claim eligibility</li>
              <li>• Authorized service centers</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Help Highlights */}
      <section className="px-6 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-neutral-200/60 dark:bg-neutral-200/30 dark:backdrop-blur-sm hover:-translate-1 transition-all duration-500 border border-border">
            <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium">Fast Response</p>
            <p className="text-xs text-muted-foreground">
              Average response time under 24 hours.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-200/60 dark:bg-neutral-200/30 dark:backdrop-blur-sm hover:-translate-1 transition-all duration-500 border border-border">
            <HelpCircle className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium">Expert Assistance</p>
            <p className="text-xs text-muted-foreground">
              Certified technicians & product specialists.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-200/60 dark:bg-neutral-200/30 dark:backdrop-blur-sm hover:-translate-1 transition-all duration-500 border border-border">
            <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium">Trusted Service</p>
            <p className="text-xs text-muted-foreground">
              Genuine parts & authorized servicing only.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 pb-28 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl mb-10">Contact Support</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Call Us</p>
              <p className="text-lg font-medium">+91 9825400630</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Email Support</p>
              <p className="text-lg font-medium lowercase">nitinpalavwala029@gmail.com</p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Available Monday–Saturday · 9:00 AM – 7:00 PM IST
        </p>
      </section>
    </main>
  )
}
