import { NextResponse } from "next/server"
import { MongoClient, ObjectId } from "mongodb"
import type { BookingInsert, BookingDocument } from "@/lib/db-schemas"

/* ---------------- ENV SAFETY ---------------- */
const MONGO_URI = process.env.MONGODB_URI
const DB_NAME = process.env.MONGODB_DB || "yesha-enterprises"

if (!MONGO_URI) {
  throw new Error("❌ MONGODB_URI is not defined")
}

/* ---------------- GLOBAL CACHE ---------------- */
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined
}

let clientPromise: Promise<MongoClient>

if (!global._mongoClientPromise) {
  const client = new MongoClient(MONGO_URI)
  global._mongoClientPromise = client.connect()
}

clientPromise = global._mongoClientPromise

/* ---------------- GET ---------------- */
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db(DB_NAME)

    const bookings = await db
      .collection<BookingDocument>("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json({ bookings })
  } catch (error) {
    console.error("GET bookings error:", error)
    return NextResponse.json(
      { bookings: [], error: "Failed to fetch bookings" },
      { status: 500 }
    )
  }
}

/* ---------------- POST ---------------- */
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const client = await clientPromise
    const db = client.db(DB_NAME)

    const newBooking: BookingInsert = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      model: body.model || "General Inquiry",
      series: body.series || "",
      capacity: body.capacity || "",
      date: body.date,
      address: body.address,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    const result = await db
      .collection<BookingInsert>("bookings")
      .insertOne(newBooking)

    return NextResponse.json({
      success: true,
      booking: { _id: result.insertedId.toString(), ...newBooking },
    })
  } catch (error) {
    console.error("POST booking error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to add booking" },
      { status: 500 }
    )
  }
}

/* ---------------- PUT ---------------- */
export async function PUT(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")
    const body = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 }
      )
    }

    const updateFields: Partial<BookingInsert> = {
      ...(body.status && { status: body.status }),
      ...(body.name && { name: body.name }),
      ...(body.email && { email: body.email }),
      ...(body.phone && { phone: body.phone }),
      ...(body.date && { date: body.date }),
      ...(body.address && { address: body.address }),
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const result = await db.collection("bookings").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    )

    if (!result.matchedCount) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
    })
  } catch (error) {
    console.error("PUT booking error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    )
  }
}

/* ---------------- DELETE ---------------- */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db(DB_NAME)

    const result = await db
      .collection("bookings")
      .deleteOne({ _id: new ObjectId(id) })

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    })
  } catch (error) {
    console.error("DELETE booking error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to delete booking" },
      { status: 500 }
    )
  }
}
