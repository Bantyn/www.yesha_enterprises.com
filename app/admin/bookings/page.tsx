"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar, Phone, Mail, MapPin, RefreshCw, Trash2 } from "lucide-react"
import { motion } from "framer-motion"
import type { BookingRequest } from "@/lib/db-schemas"

// Helper function to highlight matching text
const highlightText = (text: string, query: string) => {
  if (!query || !text) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, index) =>
    regex.test(part) ? <strong key={index}>{part}</strong> : part
  )
}

function AdminBookingsPageContent() {
  const [bookings, setBookings] = useState<BookingRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/bookings")
      const { bookings } = await response.json()
      setBookings(bookings)
    } catch (error) {
      console.error("[v0] Error fetching bookings:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const updateStatus = async (id: string, status: string, notes?: string) => {
    try {
      await fetch(`/api/bookings?id=${id}`, {
        method: "PUT",
        body: JSON.stringify({ status, notes })
      })
      fetchBookings()
    } catch (error) {
      console.error("[v0] Error updating booking:", error)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: "bg-gradient-to-r from-orange-200 to-orange-100 text-orange-800",
      contacted: "bg-gradient-to-r from-blue-200 to-blue-100 text-blue-800",
      scheduled: "bg-gradient-to-r from-purple-200 to-purple-100 text-purple-800",
      completed: "bg-gradient-to-r from-green-200 to-green-100 text-green-800",
      cancelled: "bg-gradient-to-r from-red-200 to-red-100 text-red-800",
    }
    return colors[status] || "bg-neutral-100 text-neutral-700"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent" />
      </div>
    )
  }

  return (
    <div className="space-y-10   mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-3xl font-semibold text-neutral-900">
            Booking Requests
          </h1>
          <p className="text-neutral-600 mt-1">{bookings.length} total requests</p>
        </div>

      </div>

      <div className="flex gap-4">
        <Input
          placeholder="Search bookings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.length === 0 && (
          <Card className="p-12 text-center flex flex-col items-center justify-center">
            <Calendar className="w-12 h-12 text-neutral-300 mb-4" />
            <p className="text-neutral-600 text-lg">No booking requests yet</p>
          </Card>
        )}

        {bookings
          .filter((booking) =>
            !searchQuery ||
            (booking.name && typeof booking.name === 'string' && booking.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (booking.email && typeof booking.email === 'string' && booking.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
            (booking.phone && typeof booking.phone === 'string' && booking.phone.includes(searchQuery)) ||
            (booking._id && booking._id.toString().includes(searchQuery))
          )
          .map((booking, idx) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card className="p-6 hover:shadow-lg transition-shadow rounded-2xl border border-border">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-neutral-900">{highlightText(booking.name || '', searchQuery)}</h3>
                  <p className="text-accent font-medium mt-1">{highlightText(booking.model || '', searchQuery)}</p>
                </div>
                <Badge className={`${getStatusColor(booking.status)} px-3 py-1 text-sm`}>
                  {booking.status}
                </Badge>
              </div>

              {/* Booking Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4  text-neutral-700">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-neutral-900" />
                  <span>{highlightText(booking.phone || '', searchQuery)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-neutral-900" />
                  <span>{highlightText(booking.email || '', searchQuery)}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-neutral-900" />
                  <span>{booking.date}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-neutral-900" />
                  <span className="line-clamp-1">{booking.address}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-neutral-100">
                <span className="text-sm text-neutral-600 mr-2">Update Status:</span>
                <Select
                  value={booking.status}
                  onValueChange={(value) => updateStatus(booking._id!, value)}
                >
                  <SelectTrigger className="bg-neutral-200/70 transition-all w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="contacted">Contacted</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <a
                  href={`https://wa.me/91${booking.phone ? booking.phone.replace(/\D/g, "") : ""}?text=${encodeURIComponent(
                    `📌 *YESHA ENTERPRISES Installation Request*

                      🛠️ *Model:* ${booking.model || "General Inquiry"}
                      📝 *Series:* ${booking.series || "-"}
                      📏 *Capacity:* ${booking.capacity || "-"}

                      👤 *Customer Name:* ${booking.name}
                      📞 *Phone:* ${booking.phone}
                      ✉️ *Email:* ${booking.email}

                      📅 *Preferred Installation Date:* ${booking.date}
                      🏠 *Installation Address:* ${booking.address}

                      ────────────────────
                      ✅ Please confirm the appointment.`
                                        )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 text-white bg-green-600 border-green-500 hover:bg-green-50 hover:text-green-700 transition-colors duration-500"
                  >
                    <Phone className="w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>

                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    if (confirm(`Delete booking for ${booking.name}?`)) {
                      fetch(`/api/bookings?id=${booking._id}`, { method: "DELETE" })
                        .then(() => fetchBookings())
                        .catch(error => console.error("Delete error:", error))
                    }
                  }}
                  className="gap-2 bg-red-100 text-red-600 border hover:text-white hover:bg-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </Button>

              </div>

              {/* Created At */}
              {booking.createdAt && (
                <p className="text-xs text-neutral-500 mt-4">
                  Submitted on {new Date(booking.createdAt).toLocaleString()}
                </p>
              )}
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function AdminBookingsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    }>
      <AdminBookingsPageContent />
    </Suspense>
  )
}
