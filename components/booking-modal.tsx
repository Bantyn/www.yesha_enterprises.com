"use client"

import type React from "react"
import { useBooking } from "@/hooks/use-booking"
import { X, Calendar, User, Mail, Phone, MapPin, MessageCircle } from "lucide-react"
import { useState, useEffect } from "react"

export function BookingModal() {
  const {
    isOpen: isBookingOpen,
    selectedModel,
    customerName,
    customerEmail,
    customerPhone,
    preferredDate,
    address,
    setCustomerName,
    setCustomerEmail,
    setCustomerPhone,
    setPreferredDate,
    setAddress,
    closeBooking,
    resetBooking,
  } = useBooking()


  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (isBookingOpen) {
      window.scrollTo({ top: 0, behavior: "instant" })
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isBookingOpen])
  if (!isBookingOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel?.name || "General Inquiry",
          name: customerName,
          phone: customerPhone,
          email: customerEmail,
          date: preferredDate,
          address: address,
        }),
      })
    } catch (error) {
      console.error("[v0] Error saving booking:", error)
    }

    const whatsappNumber = "9825400630"
   const message = `📌 *YESHA ENTERPRISES Installation Request*

🛠️ *Model:* ${selectedModel?.name || "General Inquiry"}
📝 *Series:* ${selectedModel?.series || "-"}
📏 *Capacity:* ${selectedModel?.capacity || "-"}

👤 *Customer Name:* ${customerName}
📞 *Phone:* ${customerPhone}
✉️ *Email:* ${customerEmail}

📅 *Preferred Installation Date:* ${preferredDate}
🏠 *Installation Address:* ${address}

────────────────────
✅ Please confirm the appointment.
`;


    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    // Redirect to WhatsApp
    window.open(whatsappUrl, "_blank")

    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      resetBooking()
    }, 3000)
  }

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center max-h-screen justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-background max-w-2xl w-full rounded-sm shadow-2xl  overflow-y-auto animate-in slide-in-from-bottom-4 duration-500">
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-serif">Book Installation</h2>
          <button
            onClick={closeBooking}
            className="w-8 h-8 rounded-full hover:bg-secondary transition-colors flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="px-6 py-24 text-center animate-in fade-in zoom-in duration-500">
            <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-serif mb-4">Opening WhatsApp...</h3>
            <p className="text-muted-foreground">Redirecting you to our team to finalize your installation details.</p>
          </div>
        ) : (
          <>
            {selectedModel && (
              <div className="px-6 py-6 bg-secondary/50 border-b border-border animate-in slide-in-from-top duration-700">
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Selected Model</p>
                <div className="flex items-center gap-4">
                  <img
                    src={selectedModel.image || "/placeholder.svg"}
                    alt={selectedModel.name}
                    className="w-16 h-16 object-cover rounded-sm"
                  />
                  <div>
                    <h3 className="font-serif text-lg">{selectedModel.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedModel.series} • {selectedModel.capacity}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="px-6 py-8 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-transparent border-b border-border pb-2 outline-none focus:border-primary transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-transparent border-b border-border pb-2 outline-none focus:border-primary transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-transparent border-b border-border pb-2 outline-none focus:border-primary transition-colors"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <Calendar className="w-3 h-3" />
                    Preferred Installation Date
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-transparent border-b border-border pb-2 outline-none focus:border-primary transition-colors"
                  />
                </div>

                <div className="space-y-2 group">
                  <label className="text-[10px] uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-3 h-3" />
                    Installation Address
                  </label>
                  <textarea
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    className="w-full bg-transparent border border-border p-3 rounded-sm outline-none focus:border-primary transition-colors resize-none"
                    placeholder="123 Main St, Apt 4B, City, State, ZIP"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-4 rounded-sm font-medium uppercase tracking-wider text-sm hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Book via WhatsApp
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
