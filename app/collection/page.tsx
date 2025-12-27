"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import type { Product } from "@/lib/db-schemas"
import { PRODUCT_CATEGORIES } from "@/lib/db-schemas"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import MaintenanceScreen from "@/components/maintenance-screen"

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [productsRes, settingsRes] = await Promise.all([
          fetch(selectedCategory === "all" ? "/api/products" : `/api/products?category=${encodeURIComponent(selectedCategory)}`),
          fetch("/api/settings"),
        ])

        const productsData = await productsRes.json()
        const settingsData = await settingsRes.json()

        setProducts(productsData.products || [])
        setMaintenanceMode(settingsData.maintenanceMode || false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedCategory])

  if (maintenanceMode) {
    return <MaintenanceScreen />
  }
        setLoading(false)
      }
    }
    fetchProducts()
  }, [selectedCategory])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="px-10 py-10 max-w-7xl mx-auto">
        <span className="text-[11px] uppercase tracking-widest text-primary block mb-4">
          Collection
        </span>
        <h1 className="text-5xl md:text-7xl font-semibold mb-6">
          Our Premium Products
        </h1>
        <p className="text-muted-foreground max-w-2xl leading-relaxed">
          Explore our complete range of high-performance gas geysers, crafted
          for safety, efficiency, and elegance.
        </p>
      </section>

      {/* Category Filter */}
      <section className="px-6 max-w-7xl mx-auto ">
        <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-secondary/40 backdrop-blur border border-border">
          {["all", ...PRODUCT_CATEGORIES].map((cat) => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full text-[11px] uppercase tracking-widest transition-all
                  ${active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-neutral-200 hover:bg-background border border-border"
                  }
                `}
              >
                {cat === "all" ? "All Products" : cat}
              </button>
            )
          })}
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        {loading ? (
          <div className="flex items-center justify-center min-h-[40vh]">
            <div className="h-14 w-14 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground text-lg">
              No products found in this category.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
            >
              {products.map((product, idx) => (
                <motion.div
                  key={product._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: idx * 0.06 }}
                  className="group relative rounded-3xl bg-secondary/40 backdrop-blur border border-border overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  {/* Image */}
                  <div className="aspect-square p-8 flex items-center justify-center bg-gradient-to-br from-background/40 to-background">
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      className="object-contain w-full h-full transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                      {product.category}
                    </p>

                    <h3 className="text-lg font-semibold mb-3 leading-snug">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="font-light">
                        {product.capacity}
                      </span>
                      <span className="text-primary font-semibold">
                        ₹{product.price.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Glow */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute -inset-px rounded-3xl bg-gradient-to-tr from-primary/20 to-transparent" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      <Footer />
    </main>
  )
}
