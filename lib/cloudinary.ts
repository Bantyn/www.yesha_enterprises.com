import { v2 as cloudinary } from "cloudinary"

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
})

export async function uploadToCloudinary(buffer: Buffer) {
  return new Promise<{ url: string; publicId: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "products",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) return reject(error)
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          })
        }
      )
      .end(buffer)
  })
}

export async function deleteFromCloudinary(publicId: string) {
  await cloudinary.uploader.destroy(publicId)
}

export default cloudinary
