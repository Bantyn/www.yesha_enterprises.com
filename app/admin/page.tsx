"use client"

import { useEffect, useState } from "react"
import { Package, Calendar, TrendingUp, Clock, Settings, Search, Mail, Server, Database, Cpu, HardDrive } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Stats {
  totalProducts: number
  totalBookings: number
  pendingBookings: number
  recentBookings: number
  totalContacts: number
  unreadContacts: number
}

interface ChartData {
  productsByCategory: { category: string; count: number }[]
  bookingsByStatus: { status: string; count: number; color: string }[]
}

interface SystemInfo {
  server: {
    uptime: number
    platform: string
    arch: string
    nodeVersion: string
    memory: {
      total: number
      free: number
      used: number
      usagePercent: number
    }
    cpu: {
      cores: number
      model: string
      loadAverage: number[]
    }
  }
  database: {
    status: string
    name?: string
    collections?: number
    error?: string
  }
  timestamp: string
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalBookings: 0,
    pendingBookings: 0,
    recentBookings: 0,
    totalContacts: 0,
    unreadContacts: 0,
  })
  const [chartData, setChartData] = useState<ChartData>({
    productsByCategory: [],
    bookingsByStatus: [],
  })
  const [systemInfo, setSystemInfo] = useState<SystemInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  useEffect(() => {
    async function fetchStats() {
      try {
        const [productsRes, bookingsRes, settingsRes, contactsRes, systemRes] = await Promise.all([
          fetch("/api/products"),
          fetch("/api/bookings"),
          fetch("/api/settings"),
          fetch("/api/contacts"),
          fetch("/api/system"),
        ])

        if (!productsRes.ok || !bookingsRes.ok || !settingsRes.ok || !contactsRes.ok) {
          console.error("Failed to fetch API routes", { productsRes, bookingsRes, settingsRes, contactsRes })
          return
        }

        const productsData = await productsRes.json()
        const bookingsData = await bookingsRes.json()
        const settingsData = await settingsRes.json()
        const contactsData = await contactsRes.json()
        const systemData = systemRes.ok ? await systemRes.json() : null

        const products = productsData.products || []
        const bookings = bookingsData.bookings || []
        const contacts = contactsData.contacts || []

        const now = new Date()
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

        setStats({
          totalProducts: products.length,
          totalBookings: bookings.length,
          pendingBookings: bookings.filter((b: any) => b.status === "pending").length,
          recentBookings: bookings.filter((b: any) => new Date(b.createdAt) > weekAgo).length,
          totalContacts: contacts.length,
          unreadContacts: contacts.filter((c: any) => c.status === "unread").length,
        })

        // Calculate chart data
        const categoryCount: { [key: string]: number } = {}
        products.forEach((p: any) => {
          categoryCount[p.category] = (categoryCount[p.category] || 0) + 1
        })
        const productsByCategory = Object.entries(categoryCount).map(([category, count]) => ({
          category,
          count,
        }))

        const statusCount: { [key: string]: number } = {}
        bookings.forEach((b: any) => {
          statusCount[b.status] = (statusCount[b.status] || 0) + 1
        })
        const bookingsByStatus = [
          { status: 'pending', count: statusCount.pending || 0, color: 'bg-orange-500' },
          { status: 'contacted', count: statusCount.contacted || 0, color: 'bg-blue-500' },
          { status: 'scheduled', count: statusCount.scheduled || 0, color: 'bg-purple-500' },
          { status: 'completed', count: statusCount.completed || 0, color: 'bg-green-500' },
        ]

        setChartData({
          productsByCategory,
          bookingsByStatus,
        })

        if (systemData) {
          setSystemInfo(systemData)
        }

        setMaintenanceMode(settingsData.maintenanceMode || false)
      } catch (error) {
        console.error("[v0] Error fetching stats:", error)
      } finally {
        setLoading(false)
      }
    }


    fetchStats()
  }, [])

  const handleMaintenanceToggle = async (checked: boolean) => {
    const confirmMessage = checked
      ? "Are you sure you want to enable maintenance mode? This will make the website unavailable to users."
      : "Are you sure you want to disable maintenance mode? The website will be accessible again."

    if (!confirm(confirmMessage)) return

    try {
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ maintenanceMode: checked }),
      })

      if (res.ok) {
        setMaintenanceMode(checked)
      } else {
        alert("Failed to update maintenance mode.")
      }
    } catch (error) {
      console.error("Error updating maintenance mode:", error)
      alert("Error updating maintenance mode.")
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    try {
      // Search products
      const productsRes = await fetch(`/api/products`)
      const productsData = await productsRes.json()
      const products = productsData.products || []

      const foundProduct = products.find((p: any) =>
        (p.name && typeof p.name === 'string' && p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.model && typeof p.model === 'string' && p.model.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.category && typeof p.category === 'string' && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
      )

      if (foundProduct) {
        router.push(`/admin/products?search=${encodeURIComponent(searchQuery)}`)
        return
      }

      // Search bookings
      const bookingsRes = await fetch(`/api/bookings`)
      const bookingsData = await bookingsRes.json()
      const bookings = bookingsData.bookings || []

      const foundBooking = bookings.find((b: any) =>
        (b.name && typeof b.name === 'string' && b.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.email && typeof b.email === 'string' && b.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (b.phone && typeof b.phone === 'string' && b.phone.includes(searchQuery)) ||
        (b._id && b._id.toString().includes(searchQuery))
      )

      if (foundBooking) {
        router.push(`/admin/bookings?search=${encodeURIComponent(searchQuery)}`)
        return
      }

      // Search contacts
      const contactsRes = await fetch(`/api/contacts`)
      const contactsData = await contactsRes.json()
      const contacts = contactsData.contacts || []

      const foundContact = contacts.find((c: any) =>
        (c.name && typeof c.name === 'string' && c.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.email && typeof c.email === 'string' && c.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.subject && typeof c.subject === 'string' && c.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c._id && c._id.toString().includes(searchQuery))
      )

      if (foundContact) {
        router.push(`/admin/contacts?search=${encodeURIComponent(searchQuery)}`)
        return
      }

      // If nothing found
      alert("No products or bookings found matching your search.")
    } catch (error) {
      console.error("Search error:", error)
      alert("Search failed. Please try again.")
    }
  }
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
    {
      icon: Mail,
      label: "Total Contacts",
      value: stats.totalContacts,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      icon: Mail,
      label: "Unread Messages",
      value: stats.unreadContacts,
      color: "text-red-600",
      bgColor: "bg-red-50",
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

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search products, bookings, or contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full"
          />
        </div>
        <Button onClick={handleSearch} className="px-6 whitespace-nowrap">
          <Search className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Search</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-6 hover:-translate-y-1 transition-all duration-500 hover:shadow-2xl">
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

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Products by Category</h2>
          <div className="space-y-3">
            {chartData.productsByCategory.length === 0 ? (
              <p className="text-gray-500 text-center py-4">No products yet</p>
            ) : (
              chartData.productsByCategory.map((item) => {
                const maxCount = Math.max(...chartData.productsByCategory.map(d => d.count))
                const percentage = maxCount > 0 ? (item.count / maxCount) * 100 : 0
                return (
                  <div key={item.category} className="flex items-center gap-3">
                    <div className="w-24 text-sm text-gray-600 truncate">{item.category}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-500 h-4 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-8 text-sm font-medium text-gray-900">{item.count}</div>
                  </div>
                )
              })
            )}
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Booking Status Distribution</h2>
          <div className="space-y-3">
            {chartData.bookingsByStatus.map((item) => {
              const total = chartData.bookingsByStatus.reduce((sum, d) => sum + d.count, 0)
              const percentage = total > 0 ? (item.count / total) * 100 : 0
              return (
                <div key={item.status} className="flex items-center gap-3">
                  <div className="w-20 text-sm text-gray-600 capitalize">{item.status}</div>
                  <div className="flex-1 bg-gray-200 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all duration-500 ${item.color}`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="w-12 text-sm font-medium text-gray-900">{item.count}</div>
                  <div className="w-12 text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="flex justify-between items-center py-2 bg-primary/20 rounded-lg p-4 border border-primary hover:bg-primary hover:text-white transition-colors">
              <span>Maintenance Mode</span>
              <Switch
                checked={maintenanceMode}
                onCheckedChange={handleMaintenanceToggle}
                className="data-[state=checked]:bg-red-500"
              />
            </div>
          <div className="space-y-3">
            <a
              href="/admin/products"
              className="block p-4 bg-neutral-50 text-neutral-900 hover:text-neutral-100  border border-primary/50 hover:-translate-y-1  hover:bg-primary rounded-lg transition-all duration-500 active:bg-primary/50 active:text-white"
            >
              <p className="font-medium text-inherit">Manage Products</p>
              <p className="text-sm opacity-70 mt-1">Add, edit, or remove geyser models</p>
            </a>
            <a
              href="/admin/bookings"
              className="block p-4 bg-neutral-50 text-neutral-900 hover:text-neutral-100 border border-primary/50 hover:-translate-y-1 hover:bg-primary rounded-lg transition-all duration-500 active:bg-primary/50 active:text-white "
            >
              <p className="font-medium text-inherit">View Bookings</p>
              <p className="text-sm opacity-70 mt-1">Manage installation requests</p>
            </a>
            <a
              href="/admin/cloudinary"
              className="block p-4 bg-neutral-50 text-neutral-900 hover:text-neutral-100 border border-primary/50 hover:-translate-y-1 hover:bg-primary rounded-lg transition-all duration-500 active:bg-primary/50 active:text-white "
            >
              <p className="font-medium text-inherit">Manage Images</p>
              <p className="text-sm opacity-70 mt-1">View and delete Cloudinary images</p>
            </a>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold text-neutral-900 mb-4">System Information</h2>
          {systemInfo ? (
            <div className="space-y-4">
              {/* Server Status */}
              <div className="border-b border-neutral-100 pb-3">
                <h3 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                  <Server className="w-4 h-4" />
                  Server Status
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Uptime:</span>
                    <span className="font-medium">{Math.floor(systemInfo.server.uptime / 3600)}h {Math.floor((systemInfo.server.uptime % 3600) / 60)}m</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Platform:</span>
                    <span className="font-medium capitalize">{systemInfo.server.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Node.js:</span>
                    <span className="font-medium">{systemInfo.server.nodeVersion}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">CPU Cores:</span>
                    <span className="font-medium">{systemInfo.server.cpu.cores}</span>
                  </div>
                </div>
              </div>

              {/* Memory Usage */}
              <div className="border-b border-neutral-100 pb-3">
                <h3 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                  <HardDrive className="w-4 h-4" />
                  Memory Usage
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Used:</span>
                    <span className="font-medium">{systemInfo.server.memory.used} MB / {systemInfo.server.memory.total} MB</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${
                        systemInfo.server.memory.usagePercent > 80 ? 'bg-red-500' :
                        systemInfo.server.memory.usagePercent > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${systemInfo.server.memory.usagePercent}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-neutral-500 text-right">
                    {systemInfo.server.memory.usagePercent}% used
                  </div>
                </div>
              </div>

              {/* Database Status */}
              <div className="border-b border-neutral-100 pb-3">
                <h3 className="font-medium text-neutral-900 mb-2 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  Database
                </h3>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-neutral-600">Status:</span>
                  <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                    systemInfo.database.status === 'connected' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {systemInfo.database.status}
                  </span>
                </div>
                {systemInfo.database.status === 'connected' && (
                  <div className="grid grid-cols-1 gap-2 text-sm mt-2">
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Database:</span>
                      <span className="font-medium">{"yesha_enterprises"}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Last Updated */}
              <div className="text-xs text-neutral-500 pt-2">
                Last updated: {new Date(systemInfo.timestamp).toLocaleString()}
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              <p className="text-sm text-neutral-600 mt-2">Loading system information...</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}
