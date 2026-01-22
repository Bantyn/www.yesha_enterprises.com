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
  Database,
  Search,
  X,
  Check,
  Loader2
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentService, setCurrentService] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

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
        setServices(data.services);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoadingServices(false);
    }
  };

  const filteredServices = services.filter((service: any) =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    setModalMode('add');
    setCurrentService({
      title: '',
      description: '',
      longDescription: '',
      icon: 'Code',
      startingPrice: 10000,
      deliveryTime: '2 weeks',
      features: [],
      technologies: [],
      featured: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (service: any) => {
    setModalMode('edit');
    setCurrentService({ ...service });
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`/api/services/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchServices();
      } else {
        alert('Failed to delete service');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const url = modalMode === 'add'
        ? '/api/services'
        : `/api/services/${currentService.slug}`;

      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentService),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchServices();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save service');
      }
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setIsSaving(false);
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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Services Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your service offerings and pricing
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search services..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAdd} className="wb-bg-primary hover:opacity-90 text-white shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        </div>
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
          {filteredServices.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No services found matching your search.
              </p>
              <Button onClick={handleAdd} className="wb-bg-primary hover:opacity-90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add First Service
              </Button>
            </div>
          ) : (
            filteredServices.map((service: any) => {
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
                        <span className="font-semibold wb-text-primary">₹{service.startingPrice?.toLocaleString()}</span>
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
                        <Button size="sm" variant="outline" onClick={() => handleEdit(service)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => handleDelete(service.slug)}
                        >
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
            })
          )}
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
              <div className="text-2xl font-bold wb-text-primary">{services?.length || 0}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold wb-text-primary">
                {services?.filter((s: any) => s.featured).length || 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Featured Services</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold wb-text-primary">
                ₹{services?.length > 0 ? Math.min(...services.map((s: any) => s.startingPrice || 0)).toLocaleString() : 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Starting From</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold wb-text-primary">
                ₹{services?.length > 0 ? Math.max(...services.map((s: any) => s.startingPrice || 0)).toLocaleString() : 0}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Premium Service</div>
            </div>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-[#0D0425] rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center sticky top-0 bg-white dark:bg-[#0D0425] z-10">
                <h2 className="text-xl font-bold">
                  {modalMode === 'add' ? 'Add New Service' : 'Edit Service'}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Service Title</Label>
                      <Input
                        id="title"
                        required
                        value={currentService.title}
                        onChange={(e) => setCurrentService({ ...currentService, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startingPrice">Starting Price (₹)</Label>
                      <Input
                        id="startingPrice"
                        type="number"
                        required
                        value={currentService.startingPrice}
                        onChange={(e) => setCurrentService({ ...currentService, startingPrice: parseInt(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Input
                      id="description"
                      required
                      value={currentService.description}
                      onChange={(e) => setCurrentService({ ...currentService, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longDescription">Long Description</Label>
                    <Textarea
                      id="longDescription"
                      required
                      value={currentService.longDescription}
                      onChange={(e) => setCurrentService({ ...currentService, longDescription: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryTime">Delivery Time</Label>
                      <Input
                        id="deliveryTime"
                        placeholder="2-4 weeks"
                        required
                        value={currentService.deliveryTime}
                        onChange={(e) => setCurrentService({ ...currentService, deliveryTime: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="icon">Icon Name</Label>
                      <Select
                        value={currentService.icon}
                        onValueChange={(val) => setCurrentService({ ...currentService, icon: val })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select icon" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Code">Code</SelectItem>
                          <SelectItem value="Zap">Zap</SelectItem>
                          <SelectItem value="Shield">Shield</SelectItem>
                          <SelectItem value="Database">Database</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="features">Features (comma separated)</Label>
                      <Input
                        id="features"
                        placeholder="Feature 1, Feature 2"
                        value={currentService.features?.join(', ')}
                        onChange={(e) => setCurrentService({
                          ...currentService,
                          features: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="technologies">Technologies (comma separated)</Label>
                      <Input
                        id="technologies"
                        placeholder="Next.js, Tailwind"
                        value={currentService.technologies?.join(', ')}
                        onChange={(e) => setCurrentService({
                          ...currentService,
                          technologies: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')
                        })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <div className="space-y-0.5">
                      <Label className="text-base">Featured Service</Label>
                      <div className="text-sm text-gray-500">Highlight on homepage</div>
                    </div>
                    <Switch
                      checked={currentService.featured}
                      onCheckedChange={(val) => setCurrentService({ ...currentService, featured: val })}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-white/5 sticky bottom-0 bg-white dark:bg-[#0D0425] -mx-1 -mb-1">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving} className="wb-bg-primary text-white px-8">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                    {modalMode === 'add' ? 'Create Service' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}