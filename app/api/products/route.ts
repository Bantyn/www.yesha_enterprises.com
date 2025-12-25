// app/api/products/route.ts
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import fs from "fs-extra";
import path from "path";

/* ----------------------------------
   MongoDB Connection
---------------------------------- */
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB;

let clientPromise: Promise<MongoClient>;

if (!(globalThis as any)._mongoClientPromise) {
  const client = new MongoClient(MONGODB_URI);
  (globalThis as any)._mongoClientPromise = client.connect();
}

clientPromise = (globalThis as any)._mongoClientPromise;

/* ----------------------------------
   GET: All products OR by category
   /api/products
   /api/products?category=Gas
---------------------------------- */
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const query = category && category !== "all" ? { category } : {};

    const products = await db.collection("products").find(query).toArray();

    return NextResponse.json({ products });
  } catch (error) {
    console.error("GET products error:", error);
    return NextResponse.json(
      { products: [], error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

/* ----------------------------------
   POST: Create product
---------------------------------- */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name") as string;
    const model = formData.get("model") as string;
    const category = formData.get("category") as string;
    const capacity = formData.get("capacity") as string;
    const price = Number(formData.get("price"));
    const features = (formData.get("features") as string)
      .split(",")
      .map((f) => f.trim());

    const imageFile = formData.get("image") as File | null;
    let image = "";

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      await fs.ensureDir(uploadsDir);

      const fileName = `${Date.now()}-${imageFile.name}`;
      await fs.writeFile(path.join(uploadsDir, fileName), buffer);

      image = `/uploads/${fileName}`;
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db.collection("products").insertOne({
      name,
      model,
      category,
      capacity,
      price,
      features,
      image,
    });

    return NextResponse.json({ success: true, _id: result.insertedId });
  } catch (error) {
    console.error("POST product error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add product" },
      { status: 500 }
    );
  }
}

/* ----------------------------------
   PUT: Update product
---------------------------------- */
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = formData.get("_id") as string;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID required" },
        { status: 400 }
      );
    }

    const updateData: any = {};

    for (const field of ["name", "model", "category", "capacity", "price"]) {
      const value = formData.get(field);
      if (value) updateData[field] = field === "price" ? Number(value) : value;
    }

    const features = formData.get("features");
    if (features) {
      updateData.features = (features as string)
        .split(",")
        .map((f) => f.trim());
    }

    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      const uploadsDir = path.join(process.cwd(), "public/uploads");
      await fs.ensureDir(uploadsDir);

      const fileName = `${Date.now()}-${imageFile.name}`;
      await fs.writeFile(path.join(uploadsDir, fileName), buffer);

      updateData.image = `/uploads/${fileName}`;
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT product error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update product" },
      { status: 500 }
    );
  }
}

/* ----------------------------------
   DELETE: Remove product
---------------------------------- */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection("products").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE product error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
