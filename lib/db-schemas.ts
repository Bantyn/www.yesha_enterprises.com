// lib/db-schemas.ts
import { ObjectId } from "mongodb"

/* =======================
   CATEGORIES
======================= */

/* UI-safe category */
export type Category = {
  _id?: string
  name: string
  createdAt?: string
}

/* Mongo insert */
export type CategoryInsert = Omit<Category, "_id">

/* Mongo document */
export type CategoryDocument = CategoryInsert & {
  _id: ObjectId
}

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
  features: string
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
   CONTACTS
======================= */

/* UI-safe contact */
export type ContactRequest = {
  _id?: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  createdAt: string
}

/* Mongo insert */
export type ContactInsert = Omit<ContactRequest, "_id">

/* Mongo document */
export type ContactDocument = ContactInsert & {
  _id: ObjectId
}

/* =======================
   CONSTANTS
======================= */

export const PRODUCT_CATEGORIES = [
  "Gas Geyser",
  "Storage Tank Geyser",
  "Pressure Pump",
  "Parts",
  "Iron",
] as const
/* =======================
   DEPRECATED: Use /api/categories instead for dynamic categories
======================= */