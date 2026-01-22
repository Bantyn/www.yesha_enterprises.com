'use client';

import { Wrench, Clock, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';

export default function MaintenancePage() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[100px] animate-blob"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] bg-pink-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl px-4 text-center">
                {/* Icon */}
                <div className="mb-8 flex justify-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                        <div className="relative bg-white dark:bg-gray-900 p-6 rounded-full border border-gray-100 dark:border-gray-800 shadow-xl">
                            <Wrench className="h-12 w-12 text-purple-600" />
                        </div>
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
                    We are currently <br />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                        Under Maintenance
                    </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg mx-auto leading-relaxed">
                    We're upgrading our system to serve you better. We apologize for the inconvenience and will be back shortly!
                </p>

                {/* Status Card */}
                <div className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-10 shadow-lg max-w-md mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
                            </div>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">System Update in Progress</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">Est. 1 hour</div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full w-[75%] animate-pulse"></div>
                    </div>
                </div>

                {/* Contact / Notify */}
                <div className="space-y-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Need urgent assistance?
                    </p>
                    <Button asChild className="rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:opacity-90 transition-opacity">
                        <a href="mailto:PATELBANTY1260@GMAIL.COM" className="flex items-center space-x-2 px-8">
                            <Mail className="h-4 w-4" />
                            <span>Contact Support</span>
                        </a>
                    </Button>
                </div>

                {/* Footer */}
                <div className="mt-16 text-sm text-gray-400 dark:text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Web Buddies. All rights reserved.</p>
                    <div className="mt-4">
                        <Link href="/admin/login" className="text-xs hover:text-purple-600 transition-colors opacity-0 hover:opacity-100">
                            Admin Access
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
