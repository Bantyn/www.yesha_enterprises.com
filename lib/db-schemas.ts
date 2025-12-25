// lib/db-schemas.ts
import { ObjectId } from "mongodb"

/* =======================
   PRODUCTS
======================= */

/* UI-safe product */
export type Product = {
  _id?: string
  name: string
  price: number
  model: string
  category: string
  image: string
  capacity: string
  description?: string
}

/* Mongo insert */
export type ProductInsert = Omit<Product, "_id">

/* Mongo document */
export type ProductDocument = ProductInsert & {
  _id: ObjectId
}

/* =======================
   BOOKINGS
======================= */

/* UI-safe booking */
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

/* Mongo insert */
export type BookingInsert = Omit<BookingRequest, "_id">

/* Mongo document */
export type BookingDocument = BookingInsert & {
  _id: ObjectId
}

/* =======================
   CONSTANTS
======================= */

export const PRODUCT_CATEGORIES = [
  "Gas Geyser",
  "Pressure Pump",
  "Iron",
  "Storage Tank Geyser",
] as const
