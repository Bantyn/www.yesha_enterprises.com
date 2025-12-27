"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, CheckCircle, Star, Users, Award, Zap } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const suggestedMessages = [
    {
      title: "Product Inquiry",
      subject: "Inquiry about AquaFlow Products",
      message: "Hi, I'm interested in learning more about your AquaFlow water purification systems. Could you please provide information about your product range, pricing, and which model would be best suited for a family of 4?"
    },
    {
      title: "Installation Service",
      subject: "Request for Installation Service",
      message: "Hello, I recently purchased an AquaFlow system and would like to schedule a professional installation. Please let me know the process, requirements, and available time slots for installation at my location."
    },
    {
      title: "Technical Support",
      subject: "Technical Support Request",
      message: "Hi, I'm experiencing some issues with my AquaFlow system. The water flow seems reduced and I'm seeing some error indicators. Could you please help me troubleshoot this issue or arrange for a technician visit?"
    },
    {
      title: "Warranty Claim",
      subject: "Warranty Service Request",
      message: "Hello, I need assistance with a warranty claim for my AquaFlow product. The system is within warranty period but has developed a fault. Please guide me through the warranty claim process and next steps."
    },
    {
      title: "Maintenance Service",
      subject: "Annual Maintenance Booking",
      message: "Hi, it's been a year since I purchased my AquaFlow system. I'd like to schedule the annual maintenance service as recommended. Please provide information about the maintenance package and available dates."
    },
    {
      title: "Bulk Purchase",
      subject: "Bulk Purchase Inquiry",
      message: "Hello, I'm interested in bulk purchasing AquaFlow systems for my organization/residential complex. Could you please provide pricing for bulk orders, any discounts available, and delivery arrangements?"
    }
  ]

  const handleSuggestedMessage = (message: typeof suggestedMessages[0]) => {
    setFormData({
      ...formData,
      subject: message.subject,
      message: message.message
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      } else {
        alert("Failed to send message. Please try again.")
      }
    } catch (error) {
      console.error("Contact form error:", error)
      alert("Error sending message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Message Sent!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <Button onClick={() => setSubmitted(false)} variant="outline">
              Send Another Message
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
        <Navbar></Navbar>

      {/* Hero Section */}
      <motion.section
        className="px-6 pt-28 pb-16 max-w-5xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.span
          className="text-[11px] uppercase tracking-widest text-primary block mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Get In Touch
        </motion.span>
        <motion.h1
          className="text-5xl md:text-6xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          We're Here to Help
        </motion.h1>
        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Have questions about our AquaFlow water purification systems? Need technical support,
          installation assistance, or just want to learn more? Our expert team is ready to help
          you with personalized solutions.
        </motion.p>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {[
            { value: "24hrs", label: "Average Response" },
            { value: "5000+", label: "Happy Customers" },
            { value: "15+", label: "Years Experience" },
            { value: "4.9★", label: "Customer Rating" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-2xl font-bold text-primary mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
         {/* Main Contact Section */}

      <section className="px-6 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief description of your inquiry"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    rows={6}
                    placeholder="Please provide detailed information about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  {loading ? "Sending..." : "Send Message"}
                  <Send className="w-4 h-4 ml-2" />
                </Button>
              </form>
            </Card>

            {/* Contact Info & Services */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Phone Support</p>
                      <p className="text-gray-600">+91 9825400630</p>
                      <p className="text-sm text-muted-foreground">Mon-Sat: 9:00 AM - 7:00 PM IST</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email Support</p>
                      <p className="text-gray-600">nitinpalavwala029@gmail.com</p>
                      <p className="text-sm text-muted-foreground">We respond within 24 hours</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Service Areas</p>
                      <p className="text-gray-600">Surat, Gujarat & surrounding areas</p>
                      <p className="text-sm text-muted-foreground">Home delivery & installation available</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Business Hours */}
              <Card className="p-8">
                <h3 className="text-xl font-semibold mb-6">Business Hours</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Saturday</span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Sunday</span>
                    <span className="font-medium text-red-600">Closed</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Emergency support available 24/7
                    </div>
                  </div>
                </div>
              </Card>

              
            </div>
          </div>
        </div>
      </section>

      {/* Suggested Messages */}
      <section className="px-6 max-w-6xl mx-auto pb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Quick Start Your Message</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from these common inquiries to get started quickly, or write your own custom message.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedMessages.map((msg, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all cursor-pointer group" onClick={() => handleSuggestedMessage(msg)}>
              <div className="flex items-start gap-3 mb-4">
                <MessageSquare className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{msg.title}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{msg.message}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                Use This Template
              </Button>
            </Card>
          ))}
        </div>
      </section>

     
      {/* FAQ Preview */}
      <section className="px-6 pb-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl mb-4">Need Quick Answers?</h2>
        <p className="text-muted-foreground mb-8">
          Check out our comprehensive FAQ section for instant answers to common questions.
        </p>
        <Button variant="outline" size="lg" asChild>
          <a href="/support">Visit Support Center</a>
        </Button>
      </section>

      <Footer></Footer>
    </div>
  )
}