import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

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

/* ----------------------------------
   GET: Fetch Contacts
---------------------------------- */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const contacts = await db.collection("contacts").find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ contacts });
  } catch (error) {
    console.error("GET contacts error:", error);
    return NextResponse.json({ contacts: [] }, { status: 500 });
  }
}

/* ----------------------------------
   POST: Create Contact
---------------------------------- */
export async function POST(req: Request) {
  try {
    const { name, email, phone, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All required fields must be filled" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const result = await db.collection("contacts").insertOne({
      name,
      email,
      phone: phone || "",
      subject,
      message,
      status: "unread",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, _id: result.insertedId });
  } catch (error) {
    console.error("POST contact error:", error);
    return NextResponse.json({ success: false, error: "Failed to submit contact form" }, { status: 500 });
  }
}

/* ----------------------------------
   PUT: Update Contact Status
---------------------------------- */
export async function PUT(req: Request) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json({ error: "ID and status required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection("contacts").updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, updatedAt: new Date().toISOString() } }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PUT contact error:", error);
    return NextResponse.json({ success: false, error: "Failed to update contact" }, { status: 500 });
  }
}

/* ----------------------------------
   DELETE: Remove Contact
---------------------------------- */
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Contact ID required" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection("contacts").deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE contact error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete contact" }, { status: 500 });
  }
}