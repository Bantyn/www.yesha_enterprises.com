"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

import {
  LayoutDashboard,
  Package,
  Calendar,
  LogOut,
  Image,
  Mail,
  Bell,
  AlertCircle,
  Menu,
  X,
  Layers,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const isLoginPage = pathname === "/admin/login"

  const [notifications, setNotifications] = useState({
    unreadContacts: 0,
    pendingBookings: 0,
    totalNotifications: 0,
  })

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const fetchNotifications = async () => {
    try {
      const [contactsRes, bookingsRes] = await Promise.all([
        fetch("/api/contacts"),
        fetch("/api/bookings"),
      ])

      if (contactsRes.ok && bookingsRes.ok) {
        const contactsData = await contactsRes.json()
        const bookingsData = await bookingsRes.json()

        const unreadContacts =
          contactsData.contacts?.filter((c: any) => c.status === "unread")
            .length || 0

        const pendingBookings =
          bookingsData.bookings?.filter((b: any) => b.status === "pending")
            .length || 0

        setNotifications({
          unreadContacts,
          pendingBookings,
          totalNotifications: unreadContacts + pendingBookings,
        })
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
    }
  }

  useEffect(() => {
    if (isLoginPage) return

    fetchNotifications()
    const interval = setInterval(fetchNotifications, 1000)
    return () => clearInterval(interval)
  }, [isLoginPage])

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
    router.refresh()
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin", badge: null },
    { icon: Package, label: "Products", href: "/admin/products", badge: null },
    { icon: Layers, label: "Categories", href: "/admin/categories", badge: null },
    {
      icon: Calendar,
      label: "Bookings",
      href: "/admin/bookings",
      badge: notifications.pendingBookings || null,
    },
    { icon: Image, label: "Images", href: "/admin/cloudinary", badge: null },
    {
      icon: Mail,
      label: "Contacts",
      href: "/admin/contacts",
      badge: notifications.unreadContacts || null,
    },
  ]

  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed bg-white/20 lg:static inset-y-0 left-0 z-50  md:ml-0 my-10 md:my-0 w-64 rounded-br-4xl rounded-tr-4xl
        flex flex-col items-center md:items-stretch backdrop-blur-xs shadow-2xl transition-transform duration-300
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Desktop Header */}
        <div className="hidden lg:block p-6 border-b border-neutral-200">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold">YESHA ENTERPRISES</h1>
              <p className="text-sm text-neutral-500">Management Panel</p>
            </div>
            {notifications.totalNotifications > 0 && (
              <Badge variant="destructive">
                {notifications.totalNotifications}
              </Badge>
            )}
          </div>

          {(notifications.unreadContacts > 0 ||
            notifications.pendingBookings > 0) && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className="text-sm font-medium text-red-700">
                  Pending Actions
                </span>
              </div>
              <div className="space-y-1 text-xs">
                {notifications.unreadContacts > 0 && (
                  <div className="flex justify-between">
                    <span>Unread Messages</span>
                    <Badge variant="secondary">
                      {notifications.unreadContacts}
                    </Badge>
                  </div>
                )}
                {notifications.pendingBookings > 0 && (
                  <div className="flex justify-between">
                    <span>Pending Bookings</span>
                    <Badge variant="secondary">
                      {notifications.pendingBookings}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* NAV */}
        <nav className="flex-1 p-4 space-y-2 flex flex-col justify-center md:justify-start ">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <button
                key={item.href}
                onClick={() => {
                  router.push(item.href)
                  setIsMobileMenuOpen(false)
                }}
                className={`md:w-full flex items-center justify-center md:justify-between md:px-4 md:py-3  md:h-auto h-24 w-24 md:rounded-lg rounded-3xl transition-all duration-300
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-neutral-600 hover:bg-primary/20 md:bg-primary/5 bg-white/20 hover:text-white md:hover:text-primary active:bg-white active:text-primary shadow-sm  "
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="md:w-5 md:h-5" />
                  <span className="hidden md:inline font-medium">{item.label}</span>
                </div>
                {item.badge && (
                  <Badge variant="destructive" className="hidden md:inline bg-primary">
                    {item.badge}
                  </Badge>
                )}
              </button>
            )
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-neutral-200">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full text-red-600 border-red-400 bg-red-50 hover:bg-red-600 hover:text-white"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Header */}
        <div className="lg:hidden  flex items-center justify-between p-4 border-b border-neutral-200 bg-white">
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
          <h1 className="font-bold">YESHA ENTERPRISES</h1>
          {notifications.totalNotifications > 0 && (
            <Badge variant="destructive">
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
