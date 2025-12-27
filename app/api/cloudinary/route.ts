import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function GET() {
  try {
    // Get all images from the 'products' folder
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'products/',
      max_results: 100,
    });

    const images = result.resources.map((resource: any) => ({
      publicId: resource.public_id,
      url: resource.secure_url,
      createdAt: resource.created_at,
      bytes: resource.bytes,
      width: resource.width,
      height: resource.height,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("GET cloudinary images error:", error);
    return NextResponse.json({ images: [] }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { publicId } = await req.json();

    if (!publicId) {
      return NextResponse.json({ error: "Public ID required" }, { status: 400 });
    }

    await cloudinary.uploader.destroy(publicId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE cloudinary image error:", error);
    return NextResponse.json({ success: false, error: "Failed to delete image" }, { status: 500 });
  }
}