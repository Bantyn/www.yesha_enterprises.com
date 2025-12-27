"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, Calendar } from "lucide-react"
import { useBooking, type GeyserModel } from "@/hooks/use-booking"
import type { Product } from "@/lib/db-schemas"
import MaintenanceScreen from "@/components/maintenance-screen"

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
        <div className="bg-card backdrop-blur-md rounded-lg p-12  animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="mt-20">
            <h1 className="text-5xl md:text-8xl leading-[1.1] mb-8 text-balance font-bold ">
              Optimal warmth meets exquisite design
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-light">
              Transform your morning rituals with AquaFlow's high-efficiency gas geysers. Precision engineering for the
              modern home.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12 mt-70">
            <button
              onClick={() => openBooking()}
              className="group cursor-pointer bg-transparent border-none"
            >
              <span className="text-[15px] uppercase tracking-widest block mb-4 group-hover:text-primary transition-colors">
                Request Quote
              </span>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mx-auto bg-card/50 backdrop-blur-md group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>

            <div className="relative w-full max-w-2xl aspect-square overflow-hidden rounded-lg bg-card/40 backdrop-blur-md group shadow-lg">
              <img
                src="/landing_image.png"
                alt="Premium Gas Geyser"
                className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-105 animate-float"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            </div>

            <button
              onClick={() => document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" })}
              className="group cursor-pointer bg-transparent border-none"
            >
              <span className="text-[15px] uppercase tracking-widest block mb-4 group-hover:text-primary transition-colors">
                View Collection
              </span>
              <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mx-auto bg-card/50 backdrop-blur-md group-hover:bg-primary group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-30 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: "Instant ignition time", value: "0.5s" },
            { label: "Energy efficiency rating", value: "98%" },
            { label: "Seamless warranty", value: "5yr" },
            { label: "Continuous flow rate", value: "12L" },
          ].map((stat, i) => (
            <div
              key={i}
              className=" backdrop-blur-md p-8 md:p-12 rounded-4xl border border-neutral-500/30 hover:translate-y-1 hover:shadow-lg transition-all group"
            >
              <div className="text-4xl mb-2 text-primary">{stat.value}</div>
              <p className="text-sm text-muted-foreground uppercase tracking-tighter">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Product Categories */}
      <section id="collection" className="px-6 py-24 md:px-12 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-primary mb-2 block">Curated Selection</span>
            <h2 className="text-4xl md:text-6xl">Top Collection</h2>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((model, idx) => (
              <div
                key={model.id}
                className="group cursor-pointer p-10 bg-neutral-200/10 border border-neutral-200 rounded-4xl"
                style={{ animationDelay: `${idx * 150}ms` }}
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
              </div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="px-6 py-32 text-center">
        <div className="bg-card/30 backdrop-blur-md  p-12 ">
          <h2 className="text-4xl md:text-6xl mb-8 text-balance max-w-4xl mx-auto">
            Elevate your home with AquaFlow expertise
          </h2>
          <button
            onClick={() => openBooking()}
            className="bg-primary text-primary-foreground px-22 py-5 mb-30 rounded-lg uppercase tracking-widest text-sm font-medium hover:bg-primary/90 hover:scale-105 transition-all"
          >
            Schedule Installation
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>

  )
}
