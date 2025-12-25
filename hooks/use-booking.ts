import { create } from "zustand"

export type GeyserModel = {
  id: string
  name: string
  series: string
  capacity: string
  image: string
  price: string
}

interface BookingStore {
  isOpen: boolean
  selectedModel: GeyserModel | null
  customerName: string
  customerEmail: string
  customerPhone: string
  preferredDate: string
  address: string
  openBooking: (model?: GeyserModel) => void
  closeBooking: () => void
  setSelectedModel: (model: GeyserModel | null) => void
  setCustomerName: (name: string) => void
  setCustomerEmail: (email: string) => void
  setCustomerPhone: (phone: string) => void
  setPreferredDate: (date: string) => void
  setAddress: (address: string) => void
  resetBooking: () => void
}

export const useBooking = create<BookingStore>((set) => ({
  isOpen: false,
  selectedModel: null,
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  preferredDate: "",
  address: "",
  openBooking: (model) => set({ isOpen: true, selectedModel: model || null }),
  closeBooking: () => set({ isOpen: false }),
  setSelectedModel: (model) => set({ selectedModel: model }),
  setCustomerName: (name) => set({ customerName: name }),
  setCustomerEmail: (email) => set({ customerEmail: email }),
  setCustomerPhone: (phone) => set({ customerPhone: phone }),
  setPreferredDate: (date) => set({ preferredDate: date }),
  setAddress: (address) => set({ address: address }),
  resetBooking: () =>
    set({
      selectedModel: null,
      isOpen: false,
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      preferredDate: "",
      address: "",
    }),
}))
