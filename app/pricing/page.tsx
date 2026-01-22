'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Zap, Shield, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const pricingPlans = [
    {
        name: 'Starter',
        description: 'Perfect for small businesses and personal sites',
        price: '₹15,000',
        icon: Code,
        features: [
            'Single Landing Page (Up to 5 sections)',
            'Responsive Design',
            'Basic SEO Optimization',
            'SSL Certificate Setup',
            '1 Month Free Support',
            '2 Rounds of Revisions'
        ],
        cta: 'Get Started',
        popular: false
    },
    {
        name: 'Professional',
        description: 'Ideal for growing companies needing custom features',
        price: '₹35,000',
        icon: Zap,
        features: [
            'Multi-page Website (Up to 10 pages)',
            'CMS Integration (Content Management)',
            'Advanced SEO Strategy',
            'Performance Optimization',
            '3 Months Premium Support',
            'Social Media Integration'
        ],
        cta: 'Most Popular',
        popular: true
    },
    {
        name: 'Enterprise',
        description: 'Full-scale solutions for complex requirements',
        price: '₹75,000',
        icon: Shield,
        features: [
            'Custom Web Application',
            'E-commerce Integration',
            'High-Priority Security',
            'Unlimited Revisions',
            '6 Months Expert Support',
            'Custom API Development'
        ],
        cta: 'Contact Sales',
        popular: false
    }
];

export default function PricingPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-white dark:bg-[#0D0425]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#C645F9]/10 blur-[120px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Badge variant="outline" className="mb-4 wb-border-primary wb-text-primary px-4 py-1">
                        Pricing & Plans
                    </Badge>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                        Transparent Pricing for <br />
                        <span className="wb-text-primary">Exceptional Results</span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
                        Choose a plan that fits your business goals. No hidden fees, just high-quality web development.
                    </p>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-32 bg-white dark:bg-[#0D0425]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {pricingPlans.map((plan, index) => (
                            <Card
                                key={index}
                                className={`flex flex-col border-gray-200 dark:border-white/10 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2
                  ${plan.popular ? 'ring-2 ring-[#C645F9] relative shadow-xl scale-105 z-10' : 'bg-white/50 dark:bg-white/5'}
                `}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C645F9] text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                                        Most Popular
                                    </div>
                                )}

                                <CardHeader className="text-center pb-8 border-b border-gray-100 dark:border-white/5">
                                    <div className="mx-auto w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10 mb-4">
                                        <plan.icon className="h-6 w-6 wb-text-primary" />
                                    </div>
                                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                                    <CardDescription className="mt-2">{plan.description}</CardDescription>
                                    <div className="mt-6">
                                        <span className="text-4xl font-extrabold text-gray-900 dark:text-white">{plan.price}</span>
                                        <span className="text-gray-500 ml-1">starting at</span>
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-grow pt-8">
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, fIndex) => (
                                            <li key={fIndex} className="flex items-start gap-3">
                                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                                                <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <div className="p-6 pt-0 mt-auto">
                                    <Button
                                        asChild
                                        className={`w-full py-6 rounded-xl transition-all
                      ${plan.popular
                                                ? 'wb-bg-primary text-white hover:opacity-90'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
                                            }
                    `}
                                    >
                                        <Link href="/contact" className="flex items-center justify-center gap-2">
                                            {plan.cta} <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ / Info Section */}
            <section className="py-20 bg-gray-50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-6">Need a custom solution?</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                        Every business is unique. We offer custom quotes tailored to your specific project needs.
                        If none of our standard packages fit your requirements, let's talk and build something unique for you.
                    </p>
                    <Button asChild variant="outline" size="lg" className="wb-border-primary wb-text-primary px-8">
                        <Link href="/contact">Book a Free Consultation</Link>
                    </Button>
                </div>
            </section>

            <Footer />
        </main>
    );
}
