import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"

/* ----------------------------------
   MongoDB Connection (Cached)
---------------------------------- */
const MONGO_URI = process.env.MONGODB_URI!
const DB_NAME = process.env.MONGODB_DB || "yesha-enterprises"

if (!MONGO_URI) throw new Error("❌ MONGODB_URI is not defined")

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>
if (!global._mongoClientPromise) {
  const client = new MongoClient(MONGO_URI)
  global._mongoClientPromise = client.connect()
}
clientPromise = global._mongoClientPromise

/* ----------------------------------
   GET: Fetch All Categories
---------------------------------- */
export async function GET(req: Request) {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)

    const categories = await db.collection("categories").find().toArray()

    return NextResponse.json({ categories })
  } catch (error) {
    console.error("GET categories error:", error)
    return NextResponse.json({ categories: [] }, { status: 500 })
  }
}

/* ----------------------------------
   POST: Create Category
---------------------------------- */
export async function POST(req: Request) {
  try {
    const { name } = await req.json()

    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Category name is required" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    // Check if category already exists
    const existing = await db.collection("categories").findOne({ name: name.trim() })
    if (existing) {
      return NextResponse.json(
        { success: false, error: "Category already exists" },
        { status: 400 }
      )
    }

    const result = await db.collection("categories").insertOne({
      name: name.trim(),
      createdAt: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      _id: result.insertedId,
      name: name.trim(),
    })
  } catch (error) {
    console.error("POST category error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to add category" },
      { status: 500 }
    )
  }
}

/* ----------------------------------
   PUT: Update Category
---------------------------------- */
export async function PUT(req: Request) {
  try {
    const { _id, name } = await req.json()

    if (!_id || !name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Category ID and name are required" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const existing = await db.collection("categories").findOne({ _id: new ObjectId(_id) })
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      )
    }

    // Check if new name already exists (but not for the same category)
    const duplicate = await db.collection("categories").findOne({
      name: name.trim(),
      _id: { $ne: new ObjectId(_id) },
    })
    if (duplicate) {
      return NextResponse.json(
        { success: false, error: "Category name already exists" },
        { status: 400 }
      )
    }

    await db.collection("categories").updateOne(
      { _id: new ObjectId(_id) },
      { $set: { name: name.trim() } }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("PUT category error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update category" },
      { status: 500 }
    )
  }
}

/* ----------------------------------
   DELETE: Remove Category
---------------------------------- */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Category ID is required" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const category = await db.collection("categories").findOne({ _id: new ObjectId(id) })
    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      )
    }

    // Check if category is being used by any products
    const productsUsing = await db.collection("products").countDocuments({ category: category.name })
    if (productsUsing > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Cannot delete. This category is used by ${productsUsing} product(s)`,
        },
        { status: 400 }
      )
    }

    await db.collection("categories").deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("DELETE category error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete category" },
      { status: 500 }
    )
  }
}
