import { Metadata } from 'next';
import { AdminProvider } from './admin-provider';
import { AdminSidebar } from './admin-sidebar';
import { AdminHeader } from './admin-header';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Web Buddies',
  description: 'Admin panel for managing Web Buddies website content',
  robots: 'noindex,nofollow',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AdminSidebar />
        <div className="lg:pl-64">
          <AdminHeader />
          <main className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}