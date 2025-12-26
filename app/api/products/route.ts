import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import { uploadToDrive } from "@/lib/googleDrive";

/* ----------------------------------
   MongoDB Connection (Cached)
---------------------------------- */
const MONGO_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB || "yesha-enterprises";

if (!MONGO_URI) {
  throw new Error("❌ MONGODB_URI is not defined");
}

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

let clientPromise: Promise<MongoClient>;

if (!global._mongoClientPromise) {
  const client = new MongoClient(MONGO_URI);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

// 👇 your Google Drive folder ID
const DRIVE_FOLDER_ID = "172ih8oNiGJZEywXVLNXIxXywpt3BpUWE";

/* ----------------------------------
   GET: Fetch Products
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
    return NextResponse.json({ products: [] }, { status: 500 });
  }
}

/* ----------------------------------
   POST: Create Product
---------------------------------- */
export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") || "");
    const model = String(formData.get("model") || "");
    const category = String(formData.get("category") || "");
    const capacity = String(formData.get("capacity") || "");
    const price = Number(formData.get("price") || 0);

    let image = "";
    const imageFile = formData.get("image") as File | null;

    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      image = await uploadToDrive(buffer, imageFile.name, DRIVE_FOLDER_ID);
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db.collection("products").insertOne({
      name,
      model,
      category,
      capacity,
      price,
      image,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      _id: result.insertedId,
      image,
    });
  } catch (error) {
    console.error("POST product error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add product" },
      { status: 500 }
    );
  }
}

/* ----------------------------------
   PUT: Update Product
---------------------------------- */
export async function PUT(req: Request) {
  try {
    const formData = await req.formData();
    const id = String(formData.get("_id") || "");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Product ID required" },
        { status: 400 }
      );
    }

    const updateData: Record<string, any> = {};

    for (const field of ["name", "model", "category", "capacity", "price"]) {
      const value = formData.get(field);
      if (value) {
        updateData[field] =
          field === "price" ? Number(value) : String(value);
      }
    }

    const imageFile = formData.get("image") as File | null;
    if (imageFile && imageFile.size > 0) {
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      updateData.image = await uploadToDrive(
        buffer,
        imageFile.name,
        DRIVE_FOLDER_ID
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

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
   DELETE: Remove Product
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
