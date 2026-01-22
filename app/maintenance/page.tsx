import { Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MaintenancePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
            <div className="text-center space-y-6 max-w-lg">
                <div className="flex justify-center">
                    <div className="p-6 bg-blue-100 dark:bg-blue-900/20 rounded-full animate-pulse">
                        <Wrench className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Under Maintenance
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        We're currently upgrading our system to serve you better.
                        We'll be back online shortly!
                    </p>
                </div>

                <div className="pt-8 text-sm text-gray-500">
                    <p>Need to contact us urgently?</p>
                    <a href="mailto:PATELBANTY1260@GMAIL.COM" className="text-blue-600 hover:underline">
                        PATELBANTY1260@GMAIL.COM
                    </a>
                </div>

                <div className="pt-4">
                    {/* Hidden link for admins to easily find login if they stumble here */}
                    <Link href="/admin/login" className="text-xs text-gray-300 hover:text-gray-500 transition-colors">
                        Admin Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
