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
      <section className="px-6 pt-28 pb-20 max-w-5xl mx-auto text-center">
        <span className="text-[11px] uppercase tracking-widest text-primary block mb-4">
          Support Center
        </span>
        <h1 className="text-5xl md:text-6xl mb-6">
          How can we help you?
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
          From installation guidance to technical troubleshooting, our support
          team is here to ensure your AquaFlow experience is flawless. Get expert
          assistance from certified technicians and access comprehensive resources.
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">24hrs</div>
            <div className="text-xs text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">5★</div>
            <div className="text-xs text-muted-foreground">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">5000+</div>
            <div className="text-xs text-muted-foreground">Installations</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">15+</div>
            <div className="text-xs text-muted-foreground">Years Experience</div>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="px-6 max-w-6xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Technical Support */}
          <div className="group relative p-8 rounded-3xl border border-border bg-neutral-200 hover:scale-105 backdrop-blur hover:border-primary transition-all">
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
          </div>

          {/* Manuals & Documentation */}
          <div className="group relative p-8 rounded-3xl border border-border bg-neutral-200 hover:scale-105 backdrop-blur hover:border-primary transition-all">
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
          </div>

          {/* Warranty & Claims */}
          <div className="group relative p-8 rounded-3xl border border-border bg-neutral-200 hover:scale-105 backdrop-blur hover:border-primary transition-all">
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
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="px-6 max-w-6xl mx-auto pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Our Service Process</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We follow a systematic approach to ensure your complete satisfaction
            and the optimal performance of your AquaFlow system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Contact Us</h3>
            <p className="text-sm text-muted-foreground">
              Reach out via phone, email, or our contact form for immediate assistance.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Assessment</h3>
            <p className="text-sm text-muted-foreground">
              Our experts assess your requirements and provide personalized solutions.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Service</h3>
            <p className="text-sm text-muted-foreground">
              Professional installation, repair, or maintenance by certified technicians.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">4. Follow-up</h3>
            <p className="text-sm text-muted-foreground">
              Quality check and follow-up to ensure your complete satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 max-w-4xl mx-auto pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl mb-4">Frequently Asked Questions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find quick answers to common questions about AquaFlow products and services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border rounded-lg overflow-hidden">
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
              {expandedFaq === index && (
                <div className="px-6 pb-6">
                  <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Help Highlights */}
      <section className="px-6 max-w-5xl mx-auto pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-2xl bg-neutral-200/60 dark:bg-neutral-200/30 dark:backdrop-blur-sm hover:-translate-1 transition-all duration-500 border border-border">
            <Clock className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium">Fast Response</p>
            <p className="text-xs text-muted-foreground">
              Average response time under 24 hours for all support requests.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-200/60 dark:bg-neutral-200/30 dark:backdrop-blur-sm hover:-translate-1 transition-all duration-500 border border-border">
            <HelpCircle className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium">Expert Assistance</p>
            <p className="text-xs text-muted-foreground">
              Certified technicians & product specialists with 15+ years experience.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-neutral-200/60 dark:bg-neutral-200/30 dark:backdrop-blur-sm hover:-translate-1 transition-all duration-500 border border-border">
            <ShieldCheck className="w-6 h-6 text-primary mx-auto mb-3" />
            <p className="text-sm font-medium">Trusted Service</p>
            <p className="text-xs text-muted-foreground">
              Genuine parts, authorized servicing, and 100% satisfaction guarantee.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 pb-28 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl mb-10">Contact Support</h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-14">
          <div className="flex items-center gap-4">
            <Phone className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Call Us</p>
              <p className="text-lg font-medium">+91 9825400630</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Mail className="w-5 h-5 text-primary" />
            <div className="text-left">
              <p className="text-xs text-muted-foreground">Email Support</p>
              <p className="text-lg font-medium lowercase">nitinpalavwala029@gmail.com</p>
            </div>
          </div>
        </div>

        <p className="mt-10 text-xs text-muted-foreground">
          Available Monday–Saturday · 9:00 AM – 7:00 PM IST
        </p>
      </section>
    </main>
  )
}
