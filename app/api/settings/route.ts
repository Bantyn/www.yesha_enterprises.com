import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

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
   GET: Fetch Settings
---------------------------------- */
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(DB_NAME);

    const settings = await db.collection("settings").findOne({ key: "maintenance" });
    const maintenanceMode = settings ? settings.value : false;

    return NextResponse.json({ maintenanceMode });
  } catch (error) {
    console.error("GET settings error:", error);
    return NextResponse.json({ maintenanceMode: false }, { status: 500 });
  }
}

/* ----------------------------------
   PUT: Update Settings
---------------------------------- */
export async function PUT(req: Request) {
  try {
    const { maintenanceMode } = await req.json();

    if (typeof maintenanceMode !== "boolean") {
      return NextResponse.json({ error: "Invalid maintenanceMode value" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(DB_NAME);

    await db.collection("settings").updateOne(
      { key: "maintenance" },
      { $set: { value: maintenanceMode, updatedAt: new Date().toISOString() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, maintenanceMode });
  } catch (error) {
    console.error("PUT settings error:", error);
    return NextResponse.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}