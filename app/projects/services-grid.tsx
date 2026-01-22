'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Code, Zap, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ServicesGrid() {
    const [services, setServices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('/api/services?featured=true');
                if (response.ok) {
                    const data = await response.json();
                    setServices(data.services || []);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const getIcon = (title: string) => {
        const t = title.toLowerCase();
        if (t.includes('code') || t.includes('web')) return Code;
        if (t.includes('zap') || t.includes('fast') || t.includes('mern')) return Zap;
        return Shield;
    };

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin wb-text-primary" />
            </div>
        );
    }

    if (services.length === 0) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => {
                const Icon = getIcon(service.title);
                return (
                    <motion.div
                        key={service._id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                        <Card className="group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                            {/* Service Stylized Header */}
                            <div className="relative overflow-hidden rounded-t-lg bg-gradient-to-br from-[#C645F9]/20 to-[#5E6CE7]/20 h-48 flex items-center justify-center">
                                <div className="p-5 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white/20">
                                    <Icon className="h-12 w-12 wb-text-primary" />
                                </div>
                                {service.featured && (
                                    <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                                        Popular
                                    </Badge>
                                )}
                                <div className="absolute top-3 right-3">
                                    <Badge variant="secondary">
                                        Service
                                    </Badge>
                                </div>
                            </div>

                            <CardHeader className="flex-grow">
                                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                                    <Link href={`/services/${service.slug}`}>
                                        {service.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription className="line-clamp-2">
                                    {service.description}
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="pt-0 text-gray-900 border-b-0">
                                {/* Technologies */}
                                <div className="flex flex-wrap gap-1 mb-4">
                                    {service.technologies?.slice(0, 4).map((tech: string, techIndex: number) => (
                                        <Badge key={techIndex} variant="outline" className="text-xs">
                                            {tech}
                                        </Badge>
                                    ))}
                                    {service.technologies?.length > 4 && (
                                        <Badge variant="outline" className="text-xs">
                                            +{service.technologies.length - 4} more
                                        </Badge>
                                    )}
                                </div>

                                {/* Service Info (Pricing/Time) */}
                                <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                                    <div className="flex items-center space-x-1">
                                        <Zap className="h-4 w-4 wb-text-primary" />
                                        <span>Starts at ₹{service.startingPrice}</span>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Shield className="h-4 w-4 wb-text-primary" />
                                        <span>{service.deliveryTime}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex space-x-2">
                                    <Button asChild size="sm" className="flex-1 h-11 mt-3 wb-bg-primary text-white hover:opacity-90">
                                        <Link href={`/services/${service.slug}`}>
                                            View Details
                                            <ArrowRight className="h-4 w-4 ml-1" />
                                        </Link>
                                    </Button>
                                    <Button asChild size="sm" variant="outline" className="h-11 mt-3">
                                        <Link href="/contact">
                                            Quote
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
}
