"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, X } from "lucide-react"

interface Category {
  _id: string
  name: string
  createdAt: string
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [categoryName, setCategoryName] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  /* ----------------------------------
     Fetch Categories
  ---------------------------------- */
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories")
      const data = await res.json()
      setCategories(data.categories || [])
    } catch (err) {
      console.error(err)
      setMessage({ type: "error", text: "Failed to fetch categories" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  /* ----------------------------------
     Handle Submit (Add / Update)
  ---------------------------------- */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!categoryName.trim()) {
      setMessage({ type: "error", text: "Category name cannot be empty" })
      return
    }

    try {
      if (editingId) {
        // Update
        const res = await fetch("/api/categories", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id: editingId, name: categoryName }),
        })

        const data = await res.json()
        if (!res.ok) {
          setMessage({ type: "error", text: data.error || "Failed to update category" })
          return
        }

        setMessage({ type: "success", text: "Category updated successfully" })
      } else {
        // Create
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: categoryName }),
        })

        const data = await res.json()
        if (!res.ok) {
          setMessage({ type: "error", text: data.error || "Failed to add category" })
          return
        }

        setMessage({ type: "success", text: "Category added successfully" })
      }

      setCategoryName("")
      setShowForm(false)
      setEditingId(null)
      fetchCategories()
    } catch (err) {
      console.error(err)
      setMessage({ type: "error", text: "An error occurred" })
    }
  }

  /* ----------------------------------
     Handle Edit
  ---------------------------------- */
  const handleEdit = (category: Category) => {
    setCategoryName(category.name)
    setEditingId(category._id)
    setShowForm(true)
  }

  /* ----------------------------------
     Handle Delete
  ---------------------------------- */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return

    try {
      const res = await fetch(`/api/categories?id=${id}`, { method: "DELETE" })
      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "Failed to delete category" })
        return
      }

      setMessage({ type: "success", text: "Category deleted successfully" })
      fetchCategories()
    } catch (err) {
      console.error(err)
      setMessage({ type: "error", text: "Failed to delete category" })
    }
  }

  /* ----------------------------------
     Reset Form
  ---------------------------------- */
  const resetForm = () => {
    setShowForm(false)
    setEditingId(null)
    setCategoryName("")
    setMessage(null)
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
          <h1 className="text-3xl font-semibold">Category Management</h1>
          <p className="text-muted-foreground">{categories.length} categories</p>
        </div>
        <Button
          onClick={() => {
            setCategoryName("")
            setEditingId(null)
            setShowForm(true)
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Message Alert */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      {showForm && (
        <Card className="p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Category" : "Add Category"}
            </h2>
            <Button size="icon" variant="ghost" onClick={resetForm}>
              <X />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit">{editingId ? "Update Category" : "Add Category"}</Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}
      {/* Categories List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <Card key={category._id} className="p-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-sm text-muted-foreground">
                Created: {new Date(category.createdAt).toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-primary border text-white hover:bg-primary/80"
                  onClick={() => handleEdit(category)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  className="bg-red-50 border text-red-600 hover:bg-red-600 hover:text-white"
                  onClick={() => handleDelete(category._id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                
              </div>
            </div>
          </Card>
        ))}
      </div>

      {categories.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📂</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No categories found</h3>
          <p className="text-gray-500 mb-4">Create your first category to get started</p>
          <Button
            onClick={() => {
              setCategoryName("")
              setEditingId(null)
              setShowForm(true)
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Category
          </Button>
        </div>
      )}
    </div>
  )
}
