"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import {
  Phone,
  Mail,
  FileText,
  PenTool as Tool,
  ShieldCheck,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  AlertCircle,
  Wrench,
  Download,
  Users,
  Award,
} from "lucide-react"
import MaintenanceScreen from "@/components/maintenance-screen"
import { motion, AnimatePresence } from "framer-motion"

export default function SupportPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  useEffect(() => {
    async function fetchSettings() {
      try {
        const res = await fetch("/api/settings")
        const data = await res.json()
        setMaintenanceMode(data.maintenanceMode || false)
      } catch (error) {
        console.error("Error fetching settings:", error)
      }
    }

    fetchSettings()
  }, [])

  if (maintenanceMode) {
    return <MaintenanceScreen />
  }

  const faqs = [
    {
      question: "How do I install my AquaFlow water purifier?",
      answer: "Installation is simple and should be done by our certified technicians. We provide step-by-step guidance and ensure proper setup. Contact our support team to schedule a professional installation within 24 hours of purchase."
    },
    {
      question: "What is the warranty period for AquaFlow products?",
      answer: "All AquaFlow products come with a comprehensive 1-year manufacturer warranty covering manufacturing defects. Extended warranty options are available for up to 5 years with our premium service plans."
    },
    {
      question: "How often should I service my water purifier?",
      answer: "We recommend annual servicing for optimal performance. Our service includes filter replacement, system cleaning, and performance testing. Regular servicing ensures consistent water quality and extends product life."
    },
    {
      question: "What should I do if my purifier shows an error code?",
      answer: "Don't worry! Most error codes are simple to resolve. Check our troubleshooting guide in the user manual, or contact our technical support. Common issues include filter replacement reminders or low water pressure alerts."
    },
    {
      question: "Do you provide on-site repair services?",
      answer: "Yes, we offer comprehensive on-site repair services across all major cities. Our certified technicians carry genuine spare parts and can resolve most issues within 24-48 hours of your call."
    },
    {
      question: "How do I download user manuals and documentation?",
      answer: "All user manuals, installation guides, and documentation are available in the 'User Manuals' section above. You can also request physical copies or email delivery of any specific documentation."
    },
    {
      question: "What types of water contaminants does AquaFlow remove?",
      answer: "AquaFlow systems effectively remove bacteria, viruses, heavy metals, pesticides, chlorine, and other harmful contaminants. Each model is designed for specific water quality challenges in different regions."
    },
    {
      question: "Can I install the purifier myself to save costs?",
      answer: "While basic setup is user-friendly, we strongly recommend professional installation to ensure warranty validity and optimal performance. Improper installation can affect water quality and void your warranty."
    }
  ]

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <motion.section
        className="px-6 pt-28 pb-20 max-w-5xl mx-auto text-center"
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
          Support Center
        </motion.span>
        <motion.h1
          className="text-5xl md:text-6xl mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          How can we help you?
        </motion.h1>
        <motion.p
          className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          From installation guidance to technical troubleshooting, our support
          team is here to ensure your AquaFlow experience is flawless. Get expert
          assistance from certified technicians and access comprehensive resources.
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
            { value: "24hrs", label: "Response Time" },
            { value: "5★", label: "Customer Rating" },
            { value: "5000+", label: "Installations" },
            { value: "15+", label: "Years Experience" }
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

      {/* Support Options */}
      <motion.section
        className="px-6 max-w-6xl mx-auto pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Technical Support */}
          <motion.div
            className="group relative p-8 rounded-3xl border border-border bg-neutral-200 hover:scale-105 backdrop-blur hover:border-primary transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <Tool className="w-9 h-9 text-primary mb-6" />
            <h3 className="text-xl mb-3">Technical Support</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Step-by-step help for installation issues, error codes,
              performance optimization, and long-term maintenance. Our certified
              technicians provide remote and on-site assistance.
            </p>
            <ul className="text-xs text-muted-foreground space-y-2 mb-6">
              <li>• Installation & setup guidance</li>
              <li>• Error diagnostics & troubleshooting</li>
              <li>• Annual servicing & maintenance</li>
              <li>• Performance optimization</li>
              <li>• Emergency repair services</li>
            </ul>
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <CheckCircle className="w-4 h-4" />
              Available 24/7 for emergencies
            </div>
          </motion.div>

          {/* Manuals & Documentation */}
          <motion.div
            className="group relative p-8 rounded-3xl border border-border bg-neutral-200 hover:scale-105 backdrop-blur hover:border-primary transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <FileText className="w-9 h-9 text-primary mb-6" />
            <h3 className="text-xl mb-3">User Manuals & Guides</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Access comprehensive PDF guides covering safety instructions,
              installation steps, operating best practices, and troubleshooting tips.
            </p>
            <ul className="text-xs text-muted-foreground space-y-2 mb-6">
              <li>• Model-specific installation manuals</li>
              <li>• Safety certifications & compliance</li>
              <li>• Warranty terms & conditions</li>
              <li>• Maintenance checklists</li>
              <li>• Video tutorials & guides</li>
            </ul>
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <Download className="w-4 h-4" />
              Download all resources
            </div>
          </motion.div>

          {/* Warranty & Claims */}
          <motion.div
            className="group relative p-8 rounded-3xl border border-border bg-neutral-200 hover:scale-105 backdrop-blur hover:border-primary transition-all"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <ShieldCheck className="w-9 h-9 text-primary mb-6" />
            <h3 className="text-xl mb-3">Warranty & Claims</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Learn about product coverage, warranty registration, and the
              hassle-free claim process. We ensure genuine parts and authorized servicing.
            </p>
            <ul className="text-xs text-muted-foreground space-y-2 mb-6">
              <li>• 1-year manufacturer warranty</li>
              <li>• Extended warranty options</li>
              <li>• Claim eligibility & process</li>
              <li>• Authorized service centers</li>
              <li>• Genuine spare parts guarantee</li>
            </ul>
            <div className="flex items-center gap-2 text-xs text-primary font-medium">
              <Award className="w-4 h-4" />
              100% genuine parts warranty
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Service Process */}
      <motion.section
        className="px-6 max-w-6xl mx-auto pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl mb-4">Our Service Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We follow a systematic approach to ensure your complete satisfaction
            and the optimal performance of your AquaFlow system.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { icon: Phone, title: "1. Contact Us", desc: "Reach out via phone, email, or our contact form for immediate assistance." },
            { icon: Users, title: "2. Assessment", desc: "Our experts assess your requirements and provide personalized solutions." },
            { icon: Wrench, title: "3. Service", desc: "Professional installation, repair, or maintenance by certified technicians." },
            { icon: CheckCircle, title: "4. Follow-up", desc: "Quality check and follow-up to ensure your complete satisfaction." }
          ].map((step, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="px-6 max-w-4xl mx-auto pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find quick answers to common questions about AquaFlow products and services.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border border-border rounded-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <span className="font-medium pr-4">{faq.question}</span>
                {expandedFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-primary flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-primary flex-shrink-0" />
                )}
              </button>
              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Help Highlights */}
      <motion.section
        className="px-6 max-w-5xl mx-auto pb-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: Clock, title: "Fast Response", desc: "Average response time under 24 hours for all support requests." },
            { icon: HelpCircle, title: "Expert Assistance", desc: "Certified technicians & product specialists with 15+ years experience." },
            { icon: ShieldCheck, title: "Trusted Service", desc: "Genuine parts, authorized servicing, and 100% satisfaction guarantee." }
          ].map((highlight, i) => (
            <motion.div
              key={i}
              className="p-6 rounded-2xl bg-neutral-200/60 dark:bg-neutral-200/30 dark:backdrop-blur-sm hover:-translate-1 transition-all duration-500 border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <highlight.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="text-sm font-medium">{highlight.title}</p>
              <p className="text-xs text-muted-foreground">{highlight.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        className="px-6 pb-28 max-w-4xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.h2
          className="text-3xl mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          Contact Support
        </motion.h2>

        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Phone className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Call Us</p>
              <p className="text-lg font-medium">+91 9825400630</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <Mail className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Email Support</p>
              <p className="text-lg font-medium lowercase">nitinpalavwala029@gmail.com</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          className="mt-10 text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          Available Monday–Saturday · 9:00 AM – 7:00 PM IST
        </motion.p>
      </motion.section>
    </main>
  )
}
