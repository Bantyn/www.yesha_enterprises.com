"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Shield, Zap, Wind, Droplets } from "lucide-react"
import { Footer } from "@/components/footer"
import MaintenanceScreen from "@/components/maintenance-screen"
import { motion } from "framer-motion"

const FEATURES = [
  {
    icon: Zap,
    title: "Rapid Ignition",
    desc: "Our proprietary ignition system ensures consistent hot water delivery within 0.5 seconds, eliminating the frustrating wait common with traditional systems.",
  },
  {
    icon: Shield,
    title: "Multi-Stage Safety",
    desc: "Equipped with triple-layered thermal protection and automatic gas shut-off sensors to guarantee absolute peace of mind for your family.",
  },
  {
    icon: Wind,
    title: "Zero-Draft Exhaust",
    desc: "Optimized ventilation architecture that works even in high-rise environments, maintaining stable combustion across all weather conditions.",
  },
  {
    icon: Droplets,
    title: "Anti-Scale Core",
    desc: "A high-grade copper heat exchanger treated with anti-calcification coating to prolong the life of your geyser in hard water areas.",
  },
]

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      <motion.section
        className="relative px-6 py-24 max-w-6xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {/* Header */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.span
            className="inline-block mb-4 text-[11px] uppercase tracking-[0.3em] text-primary"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Innovation
          </motion.span>

          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-semibold leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Precision <br className="hidden sm:block" />
            Engineering
          </motion.h1>

          <motion.p
            className="mt-6 max-w-xl text-muted-foreground font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            Crafted with advanced thermal intelligence and modern safety architecture
            to deliver unmatched performance in every environment.
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FEATURES.map((item, i) => {
            const Icon = item.icon
            return (
              <motion.div
                key={i}
                className="
                  group relative rounded-2xl border border-border
                  bg-neutral-200 dark:bg-white/5
                  backdrop-blur-md
                  p-8
                  transition-all duration-300
                  hover:shadow-xl hover:-translate-y-1
                "
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition pointer-events-none bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

                <div className="relative space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-medium">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.section>
      <Footer></Footer>
    </main>

  )
}
