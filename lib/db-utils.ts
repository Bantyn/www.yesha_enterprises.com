import clientPromise from "./mongodb";

export async function getCollection(collectionName: string) {
  const client = await clientPromise;
  const db = client.db("geyser_store");
  return db.collection(collectionName);
}

export interface GeyserProduct {
  _id?: string;
  name: string;
  category: "Gas" | "Electric" | "Hybrid";
  description: string;
  price: string;
  image: string;
  features: string[];
  specs: {
    capacity: string;
    warranty: string;
    energyRating: string;
  };
  createdAt: Date;
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

export type Product = {
  _id?: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
};

export const PRODUCT_CATEGORIES = [
  "Gas Geyser",
  "Pressure Pump",
  "Iron",
  "Storage Tank Geyser",
];
