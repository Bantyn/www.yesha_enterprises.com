"use client"

import { useEffect, useState } from "react"
import { Trash2, Image as ImageIcon } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface CloudinaryImage {
  publicId: string
  url: string
  createdAt: string
  bytes: number
  width: number
  height: number
}

export default function CloudinaryPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const res = await fetch("/api/cloudinary")
      const data = await res.json()
      setImages(data.images || [])
    } catch (error) {
      console.error("Error fetching images:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (publicId: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return

    try {
      const res = await fetch("/api/cloudinary", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publicId }),
      })

      if (res.ok) {
        setImages(images.filter(img => img.publicId !== publicId))
        alert("Image deleted successfully")
      } else {
        alert("Failed to delete image")
      }
    } catch (error) {
      console.error("Error deleting image:", error)
      alert("Error deleting image")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold text-neutral-900">Cloudinary Images</h1>
        <p className="text-neutral-600 mt-2">Manage images uploaded to Cloudinary</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No images found</p>
          </div>
        ) : (
          images.map((image) => (
            <Card key={image.publicId} className="p-4">
              <div className="aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={image.url}
                  alt={image.publicId}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">
                  <p>Size: {(image.bytes / 1024).toFixed(1)} KB</p>
                  <p>{image.width} × {image.height}</p>
                  <p>Created: {new Date(image.createdAt).toLocaleDateString()}</p>
                </div>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image.publicId)}
                  className="w-full bg-red-100 text-red-600 border hover:bg-red-600 hover:text-white "
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}