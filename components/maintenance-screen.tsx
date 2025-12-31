"use client"

import { Construction } from "lucide-react"
import { motion } from "framer-motion"

export default function MaintenanceScreen() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100 flex items-center justify-center px-6 text-center">

      {/* Floating background shapes */}
      <motion.div
        animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-40 h-40 bg-sky-200/50 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 50, 0], x: [0, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-16 w-56 h-56 bg-indigo-200/50 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-1/4 w-32 h-32 bg-orange-200/40 rounded-full blur-2xl"
      />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        {/* Floating icon */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="flex justify-center mb-8"
        >
          <div className="w-24 h-24 rounded-full bg-orange-100 flex items-center justify-center shadow-md">
            <Construction className="w-12 h-12 text-orange-500" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6"
        >
          We’ll Be Back Soon
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8"
        >
          YESHA ENTERPRISES is currently undergoing scheduled maintenance.
          We’re improving our systems to serve you better.
        </motion.p>

        {/* Status */}
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="inline-flex items-center gap-3 text-orange-500 text-sm md:text-base tracking-wide"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
          Maintenance in progress
        </motion.div>

        {/* Footer */}
        <div className="mt-10 text-xs uppercase tracking-widest text-gray-500">
          © {new Date().getFullYear()} Yesha Enterprises
        </div>
      </div>
    </div>
  )
}
