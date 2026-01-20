"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import type { Product } from "@/lib/db-schemas"
import { motion, AnimatePresence } from "framer-motion"
import { Calendar } from "lucide-react"
import { useBooking, type GeyserModel } from "@/hooks/use-booking"

interface Category {
  _id: string
  name: string
}

export default function CollectionPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  const openBooking = useBooking((state) => state.openBooking)

  // Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("/api/categories")
        const data = await res.json()
        setCategories(data.categories || [])
      } catch (error) {
        console.error("Error fetching categories:", error)
      }
    }
    fetchCategories()
  }, [])

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      try {
        const url =
          selectedCategory === "all"
            ? "/api/products"
            : `/api/products?category=${encodeURIComponent(selectedCategory)}`

        const res = await fetch(url)
        const data = await res.json()
        setProducts(data.products || [])
      } catch (error) {
        console.error("Error fetching products:", error)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [selectedCategory])

  const toGeyserModel = (product: Product): GeyserModel => ({
    id: product._id || "",
    name: product.name,
    series: product.category,
    capacity: product.capacity,
    features: product.features,
    image: product.image,
    price: `₹${product.price.toLocaleString()}`,
  })

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

      {/* Category Filter (UNCHANGED) */}
      <section className="px-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-3 p-4 rounded-2xl bg-secondary/40 backdrop-blur border border-border">
          <button
            key="all"
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-2 rounded-full text-[11px] uppercase tracking-widest transition-all
              ${selectedCategory === "all"
                ? "bg-primary text-primary-foreground shadow-md"
                : "bg-neutral-200 hover:bg-background border border-border"
              }
            `}
          >
            All Products
          </button>
          {categories.map((cat) => {
            const active = selectedCategory === cat.name
            return (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-6 py-2 rounded-full text-[11px] uppercase tracking-widest transition-all
                  ${active
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-neutral-200 hover:bg-background border border-border"
                  }
                `}
              >
                {cat.name}
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
              {products.map((product, idx) => {
                const model = toGeyserModel(product)

                return (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: idx * 0.06, ease: "easeOut" }}
                    className="
                      group relative rounded-3xl
                      bg-secondary/40 backdrop-blur
                      border border-neutral-200/50 shadow-lg
                      overflow-hidden
                      transition-shadow duration-500
                      will-change-transform
                      
                    "
                  >
                    {/* Image Wrapper (FIXED HEIGHT) */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-background/40 to-background">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="
                        object-contain w-full h-full
                        transition-transform duration-700 ease-out
                        group-hover:scale-110
                      "
                      />

                      {/* Dark overlay for focus */}
                      <div className="
                          absolute inset-0
                          bg-black/0
                          group-hover:bg-black/10
                          transition-colors duration-500
                        " />

                      {/* Booking Button (NO LAYOUT SHIFT) */}
                      <button
                        onClick={() => openBooking(model)}
                        className="
                            absolute bottom-0 left-0 w-full
                            md:translate-y-full group-hover:translate-y-0
                            bg-primary text-primary-foreground
                            py-4
                            flex items-center justify-center gap-2
                            uppercase tracking-widest text-[10px] font-semibold
                            transition-transform duration-500 ease-out
                          "
                      >
                        <Calendar className="w-4 h-4" />
                        Book Installation
                      </button>
                    </div>

                    {/* Content (FIXED PADDING AREA) */}
                    <div className="p-6 space-y-3">
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                        {product.category}
                      </p>

                      <h3 className="text-lg font-semibold leading-snug line-clamp-2">
                        {product.name}
                      </h3>
                      <h3 className="text-sm tracking-wider line-clamp-2 -mt-2">
                        {product.features ? "Features : " + product.features : ""}
                      </h3>

                      <div className="flex items-center justify-between text-sm">
                        <span className="font-light">{product.capacity}</span>
                        <span className="text-primary font-semibold">
                          ₹{product.price.toLocaleString()}
                        </span>
                      </div>
                    </div>

                   
                  </motion.div>

                )
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      <Footer />
    </main>
  )
}
