"use client"

import type React from "react"

import { useRouter, usePathname } from "next/navigation"
import { LayoutDashboard, Package, Calendar, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  // Don't show sidebar on login page
  if (pathname === "/admin/login") {
    return children
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" })
    router.push("/admin/login")
    router.refresh()
  }

  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
    { icon: Package, label: "Products", href: "/admin/products" },
    { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-neutral-200 flex flex-col">
        <div className="p-6 border-b border-neutral-200">
          <h1 className="text-xl font-bold text-neutral-900">YESHA ENTERPRISES</h1>
          <p className="text-sm text-neutral-500 mt-1">Management Panel</p>
          
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive ? "bg-accent dark:text-white" : "text-neutral-600 hover:bg-neutral-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            )
          })}
           <div className="p-4 border-t border-neutral-200">
          <Button onClick={handleLogout} variant="outline" className="text-red-500  text-center bg-red-200 border-red-4 hover:bg-red-300 hover:text-white w-full ">
            <LogOut className="w-5 h-5 " />
            Logout
          </Button>
        </div>
        </nav>

       
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">{children}</main>
    </div>
  )
}
