// lib/adapters.ts
import type { Product } from "@/lib/db-schemas"
import type { GeyserModel } from "@/hooks/use-booking"

export const productToGeyserModel = (p: Product): GeyserModel => ({
  id: p._id || "",
  name: p.name,
  series: p.category,
  capacity: p.capacity,
  image: p.image,
  price: `₹${p.price.toLocaleString()}`,
})
