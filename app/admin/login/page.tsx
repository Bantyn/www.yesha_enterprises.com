"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Shield, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import toast, { Toaster } from "react-hot-toast"

export default function AdminLoginPage() {
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Login successful!")
        setTimeout(() => {
          router.push("/admin")
          router.refresh()
        }, 800)
      } else {
        setError(data.error || "Invalid password")
      }
    } catch {
      setError("Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="hidden md:flex md:w-1/2  items-center justify-center bg-gradient-to-r from-black to-transparent relative overflow-hidden"
      >
        <div className="absolute inset-0">
          {/* Optional shapes / floating graphics */}
          <motion.div
            className="absolute w-80 h-80 bg-white/10 rounded-full top-[-10%] left-[-10%]"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute w-96 h-96 bg-white/5 rounded-full bottom-[-20%] right-[-15%]"
            animate={{ rotate: -360 }}
            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="relative z-10 text-center px-6 md:px-12 max-w-2xl mx-auto">
  <h1 className="text-5xl font-bold text-white mb-4">Welcome Back!</h1>
  <p className="text-lg text-white/80 mb-6 mx-auto max-w-xl ">
    Manage your bookings, track all installations, and streamline your workflow from one place.
  </p>

  <div className="flex flex-col gap-4 text-left">
    <div className="flex items-center gap-3 tracking-wide hover:bg-black/20 hover:-translate-y-1 border transition-all bg-black/10 p-6 hover:shadow-xl rounded-lg">
      <p className="text-white/90 text-center w-full font-thin">View and update all bookings in real-time</p>
    </div>
    <div className="flex items-center gap-3 tracking-wide hover:bg-black/20 hover:-translate-y-1 border transition-all bg-black/10 p-6 hover:shadow-xl rounded-lg">
      <p className="text-white/90 text-center w-full font-thin">Schedule and confirm installation appointments</p>
    </div>
    <div className="flex items-center gap-3 tracking-wide hover:bg-black/20 hover:-translate-y-1 border transition-all bg-black/10 p-6 hover:shadow-xl rounded-lg">
      <p className="text-white/90 text-center w-full font-thin">Communicate directly with customers via WhatsApp</p>
    </div>
    <div className="flex items-center gap-3 tracking-wide hover:bg-black/20 hover:-translate-y-1 border transition-all bg-black/10 p-6 hover:shadow-xl rounded-lg">
      <p className="text-white/90 text-center w-full font-thin">Track all completed and pending installations at a glance</p>
    </div>
  </div>

  <p className="mt-8 text-white/50 text-sm">
    Trusted by hundreds of service teams to streamline operations and enhance customer satisfaction.
  </p>
</div>

      </motion.div>

      {/* Right Panel */}
      <motion.div
         initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="md:w-1/2 flex items-center justify-center bg-neutral-50"
        >
        <div className="w-full max-w-md px-6 md:px-10 py-10">
          <div className="flex flex-col items-center mb-10">
            <div className="w-20 h-20 bg-indigo-100/50 rounded-full flex items-center justify-center mb-4 shadow-lg">
              <Shield className="w-10 h-10 text-black" />
            </div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-1">Admin Login</h2>
            <p className="text-sm text-neutral-600 text-center">
              Enter your password to access the dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative w-full">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pr-12 border-neutral-300 focus:border-indigo-500 focus:ring-indigo-200 bg-white"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-indigo-600 transition"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <Button
              type="submit"
              className="w-full bg-black text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-101 focus:ring-2 focus:ring-indigo-400 focus:ring-offset-1"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>
          </form>

          <p className="text-center text-sm text-neutral-500 mt-6">
            YESHA ENTERPRISES Geyser Admin Panel
          </p>
        </div>
      </motion.div>
    </div>
  )
}
