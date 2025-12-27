"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, Calendar } from "lucide-react"
import { useBooking, type GeyserModel } from "@/hooks/use-booking"
import type { Product } from "@/lib/db-schemas"
import MaintenanceScreen from "@/components/maintenance-screen"
import { motion } from "framer-motion"

export default function LandingPage() {
  const openBooking = useBooking((state) => state.openBooking)
  const [featuredProducts, setFeaturedProducts] = useState<GeyserModel[]>([])
  const [loading, setLoading] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  useEffect(() => {
    async function fetchData() {
      try {
        const [productsRes, settingsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/settings"),
        ])

        const { products } = await productsRes.json()
        const settings = await settingsRes.json()

        // Convert Product[] to GeyserModel[] and take first 3
        const models: GeyserModel[] = products.slice(0, 3).map((p: Product) => ({
          id: p._id || "",
          name: p.name,
          series: p.category,
          capacity: p.capacity,
          image: p.image,
          price: `₹${p.price.toLocaleString()}`,
        }))

        setFeaturedProducts(models)
        setMaintenanceMode(settings.maintenanceMode || false)
      } catch (error) {
        console.error("[v0] Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (maintenanceMode) {
    return <MaintenanceScreen />
  }

  return (
    <main className="min-h-screen font-sans bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 py-0 text-center max-w-5xl mx-auto">
        <motion.div
          className="bg-card backdrop-blur-md rounded-lg p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="mt-20">
            <motion.h1
              className="text-5xl md:text-8xl leading-[1.1] mb-8 text-balance font-bold"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Optimal warmth meets exquisite design
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Transform your morning rituals with AquaFlow's high-efficiency gas geysers. Precision engineering for the
              modern home.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col md:flex-row items-center justify-center gap-12 mt-70"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => openBooking()}
              className="group cursor-pointer bg-transparent border-none"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[15px] uppercase tracking-widest block mb-4 group-hover:text-primary transition-colors">
                Request Quote
              </span>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mx-auto bg-card/50 backdrop-blur-md group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>

            <motion.div
              className="relative w-full max-w-2xl aspect-square overflow-hidden rounded-lg bg-card/40 backdrop-blur-md group shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <img
                src="/landing_image.png"
                alt="Premium Gas Geyser"
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105 animate-float"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </motion.div>

            <motion.button
              onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              className="group cursor-pointer bg-transparent border-none"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="text-[15px] uppercase tracking-widest block mb-4 group-hover:text-primary transition-colors">
                View Collection
              </span>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mx-auto bg-card/50 backdrop-blur-md group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="py-24 px-30 overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Instant ignition time", value: "0.5s" },
            { label: "Energy efficiency rating", value: "98%" },
            { label: "Seamless warranty", value: "5yr" },
            { label: "Continuous flow rate", value: "12L" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className=" backdrop-blur-md p-8 md:p-12 rounded-4xl border border-neutral-500/30 hover:translate-y-1 hover:shadow-lg transition-all group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-2 text-primary">{stat.value}</div>
              <p className="text-sm text-muted-foreground uppercase tracking-tighter">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Product Categories */}
      <motion.section
        id="collection"
        className="px-6 py-24 md:px-12 max-w-7xl mx-auto"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex justify-between items-end mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div>
            <span className="text-[10px] uppercase tracking-widest text-primary mb-2 block">Curated Selection</span>
            <h2 className="text-4xl md:text-6xl">Top Collection</h2>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((model, idx) => (
              <motion.div
                key={model.id}
                className="group cursor-pointer p-10 bg-neutral-200/10 border border-neutral-200 rounded-4xl"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="bg-card/30 backdrop-blur-md p-8 rounded-lg text-center relative overflow-hidden mb-6 aspect-square flex items-center justify-center hover:translate-y-1 hover:shadow-xl transition-all">
                  <img
                    src={model.image || "/placeholder.svg"}
                    alt={model.name}
                    className="mb-8 mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                  />
                  <button
                    onClick={() => openBooking(model)}
                    className="absolute bottom-0 left-0 w-full bg-primary text-primary-foreground py-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] font-bold rounded-b-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Appointment
                  </button>
                </div>
                <span className="text-[11px] uppercase tracking-widest text-muted-foreground">{model.series}</span>
                <div className="flex justify-between items-center mt-2">
                  <h3 className="text-2xl">{model.name}</h3>
                  <span className="text-sm font-light text-muted-foreground">{model.capacity}</span>
                  <h3 className="text-sm font-light text-muted-foreground">{model.price}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="px-6 py-32 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="bg-card/30 backdrop-blur-md  p-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-4xl md:text-6xl mb-8 text-balance max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Elevate your home with AquaFlow expertise
          </motion.h2>
          <motion.button
            onClick={() => openBooking()}
            className="bg-primary text-primary-foreground px-22 py-5 mb-30 rounded-lg uppercase tracking-widest text-sm font-medium hover:bg-primary/90 hover:scale-105 transition-all"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Schedule Installation
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </main>

  )
}
