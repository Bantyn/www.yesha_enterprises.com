"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, Trash2, Reply, Eye, EyeOff, Search } from "lucide-react"
import { motion } from "framer-motion"
import type { ContactRequest } from "@/lib/db-schemas"

// Helper function to highlight matching text
const highlightText = (text: string, query: string) => {
  if (!query || !text) return text
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  const parts = text.split(regex)
  return parts.map((part, index) =>
    regex.test(part) ? <strong key={index}>{part}</strong> : part
  )
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedContact, setSelectedContact] = useState<ContactRequest | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const searchParams = useSearchParams()

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/contacts")
      const { contacts } = await response.json()
      setContacts(contacts)
    } catch (error) {
      console.error("[v0] Error fetching contacts:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    const search = searchParams.get('search')
    if (search) {
      setSearchQuery(search)
    }
  }, [searchParams])

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch("/api/contacts", {
        method: "PUT",
        body: JSON.stringify({ id, status })
      })
      fetchContacts()
    } catch (error) {
      console.error("[v0] Error updating contact:", error)
    }
  }

  const deleteContact = async (id: string) => {
    if (!confirm("Delete this contact message?")) return
    try {
      await fetch(`/api/contacts?id=${id}`, { method: "DELETE" })
      fetchContacts()
      if (selectedContact?._id === id) {
        setSelectedContact(null)
      }
    } catch (error) {
      console.error("Delete error:", error)
    }
  }

  const replyToContact = (contact: ContactRequest) => {
    const subject = encodeURIComponent(`Re: ${contact.subject}`)
    const body = encodeURIComponent(`Dear ${contact.name},\n\nThank you for your message: "${contact.message}"\n\nBest regards,\nYesha Enterprises Team`)
    window.open(`mailto:${contact.email}?subject=${subject}&body=${body}`)
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      unread: "bg-red-100 text-red-800",
      read: "bg-blue-100 text-blue-800",
      replied: "bg-green-100 text-green-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  return (
    <div className="space-y-10 mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-3xl font-semibold text-neutral-900">
            Contact Messages
          </h1>
          <p className="text-neutral-600 mt-1">
            {contacts.length} total messages
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search contacts by name, email, subject, or message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-1 space-y-4">
          {(() => {
            const filteredContacts = contacts.filter((contact) =>
              !searchQuery ||
              (contact.name && typeof contact.name === 'string' && contact.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (contact.email && typeof contact.email === 'string' && contact.email.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (contact.subject && typeof contact.subject === 'string' && contact.subject.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (contact.message && typeof contact.message === 'string' && contact.message.toLowerCase().includes(searchQuery.toLowerCase())) ||
              (contact.phone && typeof contact.phone === 'string' && contact.phone.includes(searchQuery)) ||
              (contact._id && contact._id.toString().includes(searchQuery))
            )

            if (contacts.length === 0) {
              return (
                <Card className="p-8 text-center">
                  <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No contact messages yet</p>
                </Card>
              )
            }

            if (filteredContacts.length === 0) {
              return (
                <Card className="p-8 text-center">
                  <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600">No contacts match "{searchQuery}"</p>
                </Card>
              )
            }

            return filteredContacts.map((contact, idx) => (
              <motion.div
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                    selectedContact?._id === contact._id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedContact(contact)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm truncate">{highlightText(contact.name || '', searchQuery)}</h3>
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 mb-1 truncate">{highlightText(contact.subject || '', searchQuery)}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </p>
                </Card>
              </motion.div>
            ))
          })()}
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <Card className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-semibold mb-2">{highlightText(selectedContact.name || '', searchQuery)}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      {highlightText(selectedContact.email || '', searchQuery)}
                    </div>
                    {selectedContact.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-4 h-4" />
                        {highlightText(selectedContact.phone || '', searchQuery)}
                      </div>
                    )}
                  </div>
                </div>
                <Badge className={getStatusColor(selectedContact.status)}>
                  {selectedContact.status}
                </Badge>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Subject: {highlightText(selectedContact.subject || '', searchQuery)}</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-wrap">{highlightText(selectedContact.message || '', searchQuery)}</p>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Received on {new Date(selectedContact.createdAt).toLocaleString()}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(selectedContact._id!, selectedContact.status === 'unread' ? 'read' : 'unread')}
                  >
                    {selectedContact.status === 'unread' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    Mark as {selectedContact.status === 'unread' ? 'Read' : 'Unread'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => replyToContact(selectedContact)}
                  >
                    <Reply className="w-4 h-4 mr-2" />
                    Reply
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteContact(selectedContact._id!)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ) : (
            <Card className="p-12 text-center">
              <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a message</h3>
              <p className="text-gray-500">Choose a contact message from the list to view details</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}