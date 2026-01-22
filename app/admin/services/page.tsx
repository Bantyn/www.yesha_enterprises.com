'use client';

import { useEffect, useState } from 'react';
import { useAdmin } from '../admin-provider';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus,
  Edit,
  Trash2,
  Code,
  Zap,
  Shield,
  Database
} from 'lucide-react';

const defaultServices = [
  {
    _id: '1',
    title: 'Website Development',
    description: 'Modern, responsive websites built with the latest technologies',
    icon: 'Code',
    startingPrice: 15000,
    deliveryTime: '2-4 weeks',
    featured: true,
    slug: 'website-development'
  },
  {
    _id: '2',
    title: 'MERN Stack Development',
    description: 'Full-stack web applications using MongoDB, Express, React, and Node.js',
    icon: 'Zap',
    startingPrice: 50000,
    deliveryTime: '4-8 weeks',
    featured: true,
    slug: 'mern-stack'
  },
  {
    _id: '3',
    title: 'Next.js Development',
    description: 'High-performance websites with server-side rendering',
    icon: 'Shield',
    startingPrice: 25000,
    deliveryTime: '3-6 weeks',
    featured: true,
    slug: 'nextjs'
  },
  {
    _id: '4',
    title: 'Admin Dashboard',
    description: 'Custom admin dashboards with analytics and management features',
    icon: 'Database',
    startingPrice: 40000,
    deliveryTime: '4-6 weeks',
    featured: false,
    slug: 'dashboards'
  }
];

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Code': return Code;
    case 'Zap': return Zap;
    case 'Shield': return Shield;
    case 'Database': return Database;
    default: return Code;
  }
};

export default function AdminServicesPage() {
  const { user, loading } = useAdmin();
  const router = useRouter();
  const [services, setServices] = useState(defaultServices);
  const [loadingServices, setLoadingServices] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      fetchServices();
    }
  }, [user, loading, router]);

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const response = await fetch('/api/services');
      if (response.ok) {
        const data = await response.json();
        if (data.services && data.services.length > 0) {
          setServices(data.services);
        }
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
      // Keep default services if API fails
    } finally {
      setLoadingServices(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#C645F9]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Services Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your service offerings and pricing
          </p>
        </div>
        <Button className="wb-bg-primary hover:opacity-90 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {loadingServices ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = getIcon(service.icon);
            return (
              <Card key={service._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gradient-to-r from-[#C645F9]/10 to-[#5E6CE7]/10 rounded-lg">
                        <IconComponent className="h-6 w-6 wb-text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        {service.featured && (
                          <Badge className="wb-bg-primary text-white mt-1">Featured</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Starting Price:</span>
                      <span className="font-semibold wb-text-primary">₹{service.startingPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Delivery Time:</span>
                      <span className="font-medium">{service.deliveryTime}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Slug:</span>
                      <Badge variant="outline">{service.slug}</Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" asChild className="wb-bg-primary hover:opacity-90 text-white">
                      <a href={`/services/${service.slug}`} target="_blank" rel="noopener noreferrer">
                        View Live
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Service Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Service Statistics</CardTitle>
          <CardDescription>
            Overview of your service offerings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold wb-text-primary">{services.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold wb-text-primary">
                {services.filter(s => s.featured).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Featured Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold wb-text-primary">
                ₹{Math.min(...services.map(s => s.startingPrice)).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Starting From</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold wb-text-primary">
                ₹{Math.max(...services.map(s => s.startingPrice)).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Premium Service</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}