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
    Search,
    X,
    Check,
    Loader2,
    Tag
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminCategoriesPage() {
    const { user, loading } = useAdmin();
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
    const [currentCategory, setCurrentCategory] = useState<any>(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/admin/login');
            return;
        }

        if (user) {
            fetchCategories();
        }
    }, [user, loading, router]);

    const fetchCategories = async () => {
        try {
            setLoadingCategories(true);
            const response = await fetch('/api/categories');
            if (response.ok) {
                const data = await response.json();
                setCategories(data.categories);
            }
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        } finally {
            setLoadingCategories(false);
        }
    };

    const filteredCategories = categories.filter((cat: any) =>
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAdd = () => {
        setModalMode('add');
        setCurrentCategory({
            name: '',
            slug: '',
            description: '',
            type: 'project',
            icon: 'Tag',
        });
        setIsModalOpen(true);
    };

    const handleEdit = (category: any) => {
        setModalMode('edit');
        setCurrentCategory({ ...category });
        setIsModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this category? This will fail if projects are still using it.')) return;

        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchCategories();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to delete category');
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
                ? '/api/categories'
                : `/api/categories/${currentCategory._id}`;

            const method = modalMode === 'add' ? 'POST' : 'PUT';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentCategory),
            });

            if (response.ok) {
                setIsModalOpen(false);
                fetchCategories();
            } else {
                const data = await response.json();
                alert(data.error || 'Failed to save category');
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
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Categories Management
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage dynamic categories for projects and services
                    </p>
                </div>
                <div className="flex w-full md:w-auto items-center gap-4">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search categories..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleAdd} className="wb-bg-primary hover:opacity-90 text-white shrink-0">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Category
                    </Button>
                </div>
            </div>

            {loadingCategories ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32"></div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredCategories.length === 0 ? (
                        <div className="col-span-full text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400 mb-4">
                                No categories found matching your search.
                            </p>
                            <Button onClick={handleAdd} className="wb-bg-primary hover:opacity-90 text-white">
                                <Plus className="h-4 w-4 mr-2" />
                                Add First Category
                            </Button>
                        </div>
                    ) : (
                        filteredCategories.map((category: any) => (
                            <Card key={category._id} className="hover:shadow-lg transition-shadow dark:bg-[#0D0425]/50 border-gray-100 dark:border-white/5">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg font-bold">{category.name}</CardTitle>
                                            <CardDescription className="text-xs mt-1">
                                                /{category.slug}
                                            </CardDescription>
                                        </div>
                                        <Badge variant="secondary" className="capitalize text-[10px]">
                                            {category.type}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 h-10">
                                        {category.description || 'No description provided.'}
                                    </p>
                                    <div className="flex justify-end space-x-2">
                                        <Button size="sm" variant="outline" className="h-8 w-8 p-0" onClick={() => handleEdit(category)}>
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                                            onClick={() => handleDelete(category._id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            )}

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
                            className="relative bg-white dark:bg-[#0D0425] rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-white dark:bg-[#0D0425]">
                                <h2 className="text-xl font-bold">
                                    {modalMode === 'add' ? 'Add Category' : 'Edit Category'}
                                </h2>
                                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <form onSubmit={handleSave} className="p-6 space-y-4">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Category Name</Label>
                                        <Input
                                            id="name"
                                            required
                                            value={currentCategory.name}
                                            onChange={(e) => setCurrentCategory({ ...currentCategory, name: e.target.value })}
                                            placeholder="e.g., Mobile Apps"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="type">Category Type</Label>
                                        <Select
                                            value={currentCategory.type}
                                            onValueChange={(val) => setCurrentCategory({ ...currentCategory, type: val })}
                                        >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="project">Project</SelectItem>
                                                <SelectItem value="service">Service</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            value={currentCategory.description}
                                            onChange={(e) => setCurrentCategory({ ...currentCategory, description: e.target.value })}
                                            placeholder="Brief description of this category..."
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                                    <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSaving} className="wb-bg-primary text-white px-8">
                                        {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                                        {modalMode === 'add' ? 'Create' : 'Save'}
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
