// lib/db-schemas.ts

export type Product = {
  _id?: string
  name: string
  price: number
  category: string
  image: string
  description?: string
}

export const PRODUCT_CATEGORIES = [
  "Gas Geyser",
  "Pressure Pump",
  "Iron",
  "Storage Tank Geyser",
]

export type BookingRequest = {
  _id?: string
  name: string
  email: string
  phone: string
  model: string
  series?: string
  capacity?: string
  date: string
  address: string
  status: "pending" | "contacted" | "scheduled" | "completed" | "cancelled"
  createdAt: string
}