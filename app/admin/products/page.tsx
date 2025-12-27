"use client"

import type React from "react"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, Edit, Trash2, X } from "lucide-react"
import type { Product } from "@/lib/db-schemas"
import { PRODUCT_CATEGORIES } from "@/lib/db-schemas"

// Helper function to highlight matching text
const highlightText = (text: string, query: string) => {
  if (!query || !text) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, index) =>
    regex.test(part) ? <strong key={index}>{part}</strong> : part
  )
}

function AdminProductsPageContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()

  const [formData, setFormData] = useState<{
    name: string
    model: string
    category: string
    capacity: string
    price: number
    image: string
    file?: File | null
  }>({
    name: "",
    model: "",
    category: "",
    capacity: "",
    price: 0,
    image: "",
    file: null,
  })

  /* ----------------------------------
     Fetch Products
  ---------------------------------- */
  const fetchProducts = async () => {
    try {
      const res = await fetch("/api/products")
      const data = await res.json()
      setProducts(data.products || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  /* ----------------------------------
     Submit (Add / Update)
  ---------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formPayload = new FormData()
    formPayload.append("name", formData.name)
    formPayload.append("model", formData.model)
    formPayload.append("category", formData.category)
    formPayload.append("capacity", formData.capacity)
    formPayload.append("price", String(formData.price))
    if (formData.file) {
      formPayload.append("image", formData.file)
    }

    try {
      if (editingId) {
        // ✅ FIX: send _id in formData
        formPayload.append("_id", editingId)

        await fetch("/api/products", {
          method: "PUT",
          body: formPayload,
        })
      } else {
        await fetch("/api/products", {
          method: "POST",
          body: formPayload,
        })
      }

      setShowForm(false)
      setEditingId(null)
      setFormData({
        name: "",
        model: "",
        category: "",
        capacity: "",
        price: 0,
        image: "",
        file: null,
      })

      fetchProducts()
    } catch (err) {
      console.error("Save error:", err)
    }
  }

  /* ----------------------------------
     Edit
  ---------------------------------- */
  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      model: product.model,
      category: product.category,
      capacity: product.capacity,
      price: product.price,

      image: product.image,
      file: null,
    })
    setEditingId(product._id!)
    setShowForm(true)
  }

  /* ----------------------------------
     Delete
  ---------------------------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return
    await fetch(`/api/products?id=${id}`, { method: "DELETE" })
    fetchProducts()
  }

  /* ----------------------------------
     Loader
  ---------------------------------- */
  if (loading) {
    return (
      <div className="flex justify-center min-h-[60vh] items-center">
        <div className="h-10 w-10 border-b-2 border-accent animate-spin rounded-full" />
      </div>
    )
  }

  /* ----------------------------------
     UI
  ---------------------------------- */
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Products Management</h1>
          <p className="text-muted-foreground">{products.length} products</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {showForm && (
        <Card className="p-6">
          <div className="flex justify-between mb-4 border-neutral-500/50">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Product" : "Add Product"}
            </h2>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setShowForm(false)
                setEditingId(null)
              }}
            >
              <X />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField label="Name" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} />
            <InputField label="Model" value={formData.model} onChange={(v: string) => setFormData({ ...formData, model: v })} />

            <div>
              <Label>Category</Label>
              <Select value={formData.category} onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <InputField label="Capacity" value={formData.capacity} onChange={(v:string) => setFormData({ ...formData, capacity: v })} />
            <InputField label="Price" type="number" value={formData.price} onChange={(v: string) => setFormData({ ...formData, price: Number(v) })} />

            <div>
              <Label>Image</Label>
              <input
                type="file"
                title="upload file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    setFormData({
                      ...formData,
                      image: URL.createObjectURL(file),
                      file,
                    })
                  }
                }}
              />
              {formData.image && (
                <img alt="preview" src={formData.image} className="mt-2 w-32 h-32 object-cover" />
              )}
            </div>


            <Button type="submit">
              {editingId ? "Update Product" : "Add Product"}
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products
          .filter((p) =>
            !searchQuery ||
            (p.name && typeof p.name === 'string' && p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.model && typeof p.model === 'string' && p.model.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (p.category && typeof p.category === 'string' && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
          )
          .map((p) => (
          <Card key={p._id}>
            <img alt="" src={p.image} className="h-80 w-full object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold">{highlightText(p.name || '', searchQuery)}</h3>
              <p><span className="font-semibold">Model : </span>{highlightText(p.model || '', searchQuery)}</p>
              <div className="flex justify-between">
                <span>{highlightText(p.category || '', searchQuery)}</span>
                <span>₹{p.price}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(p)}><Edit className="w-3 h-3" /> Edit</Button>
                <Button className="bg-red-50 border text-red-600 hover:bg-red-600 hover:text-white" size="sm" variant="destructive" onClick={() => handleDelete(p._id!)}><Trash2 className="w-3 h-3" /> Delete</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {products.filter((p) =>
        !searchQuery ||
        (p.name && typeof p.name === 'string' && p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.model && typeof p.model === 'string' && p.model.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.category && typeof p.category === 'string' && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
      ).length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">
            {searchQuery ? `No products match "${searchQuery}"` : "No products have been added yet"}
          </p>
        </div>
      )}
    </div>
  )
}

export default function AdminProductsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    }>
      <AdminProductsPageContent />
    </Suspense>
  )
}

/* ----------------------------------
   Small Input Helper
---------------------------------- */
function InputField({
  label,
  value,
  onChange,
  type = "text",
}: any) {
  return (
    <div>
      <Label>{label}</Label>
      <Input type={type} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}
