import clientPromise from "./mongodb";

export async function connectToDatabase() {
  const client = await clientPromise;
  return client.db("geyser_store");
}

export async function getCollection(collectionName: string) {
  const db = await connectToDatabase();
  return db.collection(collectionName);
}

export interface GeyserProduct {
  _id?: string;
  name: string;
  category: "Gas" | "Electric" | "Hybrid";
  description: string;
  price: string;
  image: string;
  specs: {
    capacity: string;
    warranty: string;
    energyRating: string;
  };
  createdAt: Date;
}
export interface Product {
  _id: string
  name: string
  model: string        
  category: string
  capacity: string
  features: string
  price: number
  image?: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export interface BookingRequest {
  _id?: string;
  productId?: string;
  productName: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  address: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  createdAt: Date;
}
// lib/db-schemas.ts

/* =======================
   DEPRECATED: Use /api/categories instead for dynamic categories
======================= */
export const PRODUCT_CATEGORIES = [
  "Gas Geyser",
  "Storage Tank Geyser",
  "Pressure Pump",
  "Parts",
  "Iron",
];
