"use client"

import { useEffect, useState } from "react"
import { Package, Calendar, TrendingUp, Clock } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Stats {
  totalProducts: number
  totalBookings: number
  pendingBookings: number
  recentBookings: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalBookings: 0,
    pendingBookings: 0,
    recentBookings: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, bookingsRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/bookings"),
        ])

        if (!productsRes.ok || !bookingsRes.ok) {
          console.error("Failed to fetch API routes", { productsRes, bookingsRes })
          return
        }

        const productsData = await productsRes.json()
        const bookingsData = await bookingsRes.json()

        const products = productsData.products || []
        const bookings = bookingsData.bookings || []

        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

        setStats({
          totalProducts: products.length,
          totalBookings: bookings.length,
          pendingBookings: bookings.filter((b: any) => b.status === "pending").length,
          recentBookings: bookings.filter((b: any) => new Date(b.createdAt) > weekAgo).length,
        })
      } catch (error) {
        console.error("[v0] Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }


    fetchStats()
  }, [])

  const statCards = [
    {
      icon: Package,
      label: "Total Products",
      value: stats.totalProducts,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: Calendar,
      label: "Total Bookings",
      value: stats.totalBookings,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: Clock,
      label: "Pending Requests",
      value: stats.pendingBookings,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      icon: TrendingUp,
      label: "This Week",
      value: stats.recentBookings,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

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
        <h1 className="text-3xl font-semibold text-neutral-900">Dashboard</h1>
        <p className="text-neutral-600 mt-2">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-neutral-600 font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-neutral-900 mt-2">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/products"
              className="block p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-neutral-900">Manage Products</p>
              <p className="text-sm text-neutral-600 mt-1">Add, edit, or remove geyser models</p>
            </a>
            <a
              href="/admin/bookings"
              className="block p-4 bg-neutral-50 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <p className="font-medium text-neutral-900">View Bookings</p>
              <p className="text-sm text-neutral-600 mt-1">Manage installation requests</p>
            </a>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">System Info</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">Database</span>
              <span className="font-medium text-green-600">Connected</span>
            </div>
            <div className="flex justify-between py-2 border-b border-neutral-100">
              <span className="text-neutral-600">Last Updated</span>
              <span className="font-medium text-neutral-900">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-neutral-600">Version</span>
              <span className="font-medium text-neutral-900">1.0.0</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
