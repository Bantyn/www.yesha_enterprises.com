import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Privacy Policy - Web Buddies',
  description:
    'Privacy Policy for Web Buddies. Learn how we collect, use, and protect your personal information.',
};

export default function PrivacyPage() {
  return (
    <main className="bg-white dark:bg-[#0D0425] text-gray-900 dark:text-gray-100">
      <Navbar />

      {/* HERO */}
      <section className="pt-28 pb-20 wb-gradient-soft  flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4">
            📋 Legal & Privacy
          </Badge>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Privacy Policy
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-2xl border border-gray-200/60 dark:border-white/10
                       bg-white/70 dark:bg-[#0D0425]/70 backdrop-blur-xl
                       p-6 md:p-10 shadow-xl space-y-12"
          >
            {/* Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We collect information you provide directly to us when you contact
                us, fill out forms, or discuss project requirements.
              </p>

              <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Name and contact details</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company information</li>
                <li>Project requirements and preferences</li>
              </ul>
            </div>

            {/* Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We use your information to provide better services and ensure
                smooth communication throughout your project.
              </p>

              <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Deliver and improve our services</li>
                <li>Communicate regarding your project</li>
                <li>Respond to inquiries and support requests</li>
                <li>Send updates (only with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            {/* Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                3. Information Sharing
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We do not sell, trade, or rent your personal information to third
                parties. Your data is shared only when legally required or with
                your explicit consent.
              </p>
            </div>

            {/* Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                4. Data Security
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We implement industry-standard security measures to protect your
                personal data from unauthorized access, alteration, or disclosure.
              </p>
            </div>

            {/* Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                5. Your Rights
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                You have full control over your personal data. You may:
              </p>

              <ul className="mt-4 list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                <li>Request access to your personal information</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </div>

            {/* Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                6. Contact Us
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have any questions or concerns regarding this Privacy
                Policy, feel free to contact us:
              </p>

              <ul className="text-gray-600 dark:text-gray-400 space-y-2">
                <li>
                  <strong>Email:</strong> patelbanty1260@gmail.com
                </li>
                <li>
                  <strong>Phone:</strong> +91 9016576612
                </li>
                <li>
                  <strong>Address:</strong> Sagrampura, Surat – 395002
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
