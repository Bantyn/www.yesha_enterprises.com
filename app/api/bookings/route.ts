// app/api/bookings/route.ts
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";
import type { BookingRequest } from "@/lib/db-schemas";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.MONGODB_DB;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!globalThis._mongoClientPromise) {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
  // @ts-ignore
  globalThis._mongoClientPromise = clientPromise;
} else {
  // @ts-ignore
  clientPromise = globalThis._mongoClientPromise;
}

// GET: fetch all bookings
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const bookings = await db
      .collection<BookingRequest>("bookings")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json(
      { bookings: [], error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

// POST: add new booking
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const newBooking: BookingRequest = {
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
    };

    const result = await db.collection("bookings").insertOne(newBooking);
    return NextResponse.json({
      success: true,
      booking: { _id: result.insertedId, ...newBooking },
    });
  } catch (error) {
    console.error("Error adding booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add booking" },
      { status: 500 }
    );
  }
}

// PUT: update booking
export async function PUT(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const body = await req.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const updateFields: Partial<BookingRequest> = {};
    if (body.status) updateFields.status = body.status;
    if (body.notes) updateFields.notes = body.notes;
    if (body.name) updateFields.name = body.name;
    if (body.email) updateFields.email = body.email;
    if (body.phone) updateFields.phone = body.phone;
    if (body.date) updateFields.date = body.date;
    if (body.address) updateFields.address = body.address;

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db
      .collection("bookings")
      .updateOne({ _id: new ObjectId(id) }, { $set: updateFields });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

// DELETE: delete booking
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Booking ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const result = await db
      .collection("bookings")
      .deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
