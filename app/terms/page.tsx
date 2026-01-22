import { Metadata } from 'next';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Terms of Service - Web Buddies',
  description: 'Terms of Service for Web Buddies. Read our terms and conditions for using our web development services.',
};

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      
      <section className="pt-24 pb-16 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              📋 Legal
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none dark:prose-invert">
            <h2>Agreement to Terms</h2>
            <p>
              By accessing and using Web Buddies services, you accept and agree to be bound by the 
              terms and provision of this agreement.
            </p>

            <h2>Services</h2>
            <p>
              Web Buddies provides web development services including but not limited to:
            </p>
            <ul>
              <li>Website development and design</li>
              <li>Web application development</li>
              <li>MERN stack development</li>
              <li>Next.js development</li>
              <li>API development and integration</li>
              <li>Maintenance and support services</li>
            </ul>

            <h2>Payment Terms</h2>
            <ul>
              <li>All prices are quoted in Indian Rupees (₹)</li>
              <li>50% advance payment required to start the project</li>
              <li>Remaining 50% due upon project completion</li>
              <li>Payment terms may vary for larger projects</li>
              <li>Late payments may incur additional charges</li>
            </ul>

            <h2>Project Timeline</h2>
            <p>
              Project timelines are estimates and may vary based on:
            </p>
            <ul>
              <li>Project complexity and scope</li>
              <li>Client feedback and approval times</li>
              <li>Availability of required resources</li>
              <li>Changes in project requirements</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              Upon full payment, clients receive full ownership of the developed website/application. 
              Web Buddies retains the right to showcase the work in our portfolio.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              Web Buddies shall not be liable for any indirect, incidental, special, consequential, 
              or punitive damages arising out of your use of our services.
            </p>

            <h2>Termination</h2>
            <p>
              Either party may terminate the agreement with written notice. Upon termination, 
              payment for completed work is due within 30 days.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, contact us at:
            </p>
            <ul>
              <li>Email: patelbanty1260@gmail.com</li>
              <li>Phone: +91 9016576612</li>
              <li>Address: Sagrampura, Surat, 395002</li>
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}