"use client"

import type React from "react"
import { useEffect, useState } from "react"

import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Package, Calendar, LogOut,Image, Mail, Bell, AlertCircle, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [notifications, setNotifications] = useState({
    unreadContacts: 0,
    pendingBookings: 0,
    totalNotifications: 0
  })
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return children
  }

  const fetchNotifications = async () => {
    try {
      const [contactsRes, bookingsRes] = await Promise.all([
        fetch("/api/contacts"),
        fetch("/api/bookings")
      ])

      if (contactsRes.ok && bookingsRes.ok) {
        const contactsData = await contactsRes.json()
        const bookingsData = await bookingsRes.json()

        const contacts = contactsData.contacts || []
        const bookings = bookingsData.bookings || []

        const unreadContacts = contacts.filter((c: any) => c.status === "unread").length
        const pendingBookings = bookings.filter((b: any) => b.status === "pending").length
        const totalNotifications = unreadContacts + pendingBookings

        setNotifications({
          unreadContacts,
          pendingBookings,
          totalNotifications
        })
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }

  useEffect(() => {
    fetchNotifications()
    // Refresh notifications every 1 seconds
    const interval = setInterval(fetchNotifications, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
    router.refresh()
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin", badge: null },
    { icon: Package, label: "Products", href: "/admin/products", badge: null },
    { icon: Calendar, label: "Bookings", href: "/admin/bookings", badge: notifications.pendingBookings > 0 ? notifications.pendingBookings : null },
    { icon: Image, label: "Images", href: "/admin/cloudinary", badge: null },
    { icon: Mail, label: "Contacts", href: "/admin/contacts", badge: notifications.unreadContacts > 0 ? notifications.unreadContacts : null },
  ]

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Desktop Header */}
        <div className="hidden lg:block p-6 h- border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-neutral-900">YESHA ENTERPRISES</h1>
              <p className="text-sm text-neutral-500 mt-1">Management Panel</p>
            </div>
            {notifications.totalNotifications > 0 && (
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <Badge variant="destructive" className="text-xs">
                  {notifications.totalNotifications}
                </Badge>
              </div>
            )}
          </div>

          {/* Notification Summary - Desktop */}
          {(notifications.unreadContacts > 0 || notifications.pendingBookings > 0) && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-800">Pending Actions</span>
              </div>
              <div className="space-y-1 text-xs text-red-700">
                {notifications.unreadContacts > 0 && (
                  <div className="flex justify-between">
                    <span>Unread Messages:</span>
                    <Badge variant="secondary" className="text-xs h-5">
                      {notifications.unreadContacts}
                    </Badge>
                  </div>
                )}
                {notifications.pendingBookings > 0 && (
                  <div className="flex justify-between">
                    <span>Pending Bookings:</span>
                    <Badge variant="secondary" className="text-xs h-5">
                      {notifications.pendingBookings}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Header in Sidebar */}
        <div className="lg:hidden p-4 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-neutral-700">Navigation</span>
            {notifications.totalNotifications > 0 && (
              <Badge variant="destructive" className="text-xs">
                {notifications.totalNotifications}
              </Badge>
            )}
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href)
                  setIsMobileMenuOpen(false) // Close mobile menu on navigation
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                  isActive ? "bg-accent dark:text-white" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="font-medium lg:block hidden">{item.label}</span>
                  {/* Show abbreviated labels on mobile */}
                  <span className="font-medium lg:hidden block">
                    {item.label === "Dashboard" ? "Dash" :
                     item.label === "Products" ? "Prod" :
                     item.label === "Bookings" ? "Book" :
                     item.label === "Images" ? "Img" :
                     item.label === "Contacts" ? "Cont" : item.label}
                  </span>
                </div>
                {item.badge && (
                  <Badge variant="destructive" className="text-xs h-5 min-w-[20px] flex items-center justify-center">
                    {item.badge}
                  </Badge>
                )}
              </button>
            )
          })}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-neutral-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-red-500 text-center bg-red-200 border-red-400 hover:bg-red-300 hover:text-white w-full"
          >
            <LogOut className="w-5 h-5 lg:mr-2" />
            <span className="lg:block hidden">Logout</span>
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-white border-b border-neutral-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
            <div>
              <h1 className="text-lg font-bold text-neutral-900">YESHA ENTERPRISES</h1>
              <p className="text-xs text-neutral-500">Management Panel</p>
            </div>
          </div>
          {notifications.totalNotifications > 0 && (
            <Badge variant="destructive" className="text-xs">
              {notifications.totalNotifications}
            </Badge>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
