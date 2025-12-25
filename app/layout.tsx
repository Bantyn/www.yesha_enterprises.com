import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { BookingModal } from "@/components/booking-modal"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const _geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "Yesha Enterprises | Premium Gas Water Geysers",
  description: "Experience the next generation of home heating with AquaFlow's high-efficiency gas geysers.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${instrumentSerif.variable}`}>
        {children}
        <BookingModal />
        <Analytics />
      </body>
    </html>
  )
}
