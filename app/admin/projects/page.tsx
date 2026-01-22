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
  ExternalLink,
  Github,
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

export default function AdminProjectsPage() {
  const { user, loading } = useAdmin();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentProject, setCurrentProject] = useState<any>(null);
  const [categories, setCategories] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      fetchProjects();
      fetchCategories();
    }
  }, [user, loading, router]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories?type=project');
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      setLoadingProjects(true);
      const response = await fetch('/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects);
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoadingProjects(false);
    }
  };

  const filteredProjects = projects.filter((project: any) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.techStack?.some((tech: string) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAdd = () => {
    setModalMode('add');
    setCurrentProject({
      title: '',
      description: '',
      longDescription: '',
      techStack: [],
      images: ['/images/placeholder.jpg'],
      category: 'website',
      featured: false,
      status: 'completed',
      liveUrl: '',
      githubUrl: '',
    });
    setIsModalOpen(true);
  };

  const handleEdit = (project: any) => {
    setModalMode('edit');
    setCurrentProject({ ...project });
    setIsModalOpen(true);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const response = await fetch(`/api/projects/${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchProjects();
      } else {
        alert('Failed to delete project');
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
        ? '/api/projects'
        : `/api/projects/${currentProject.slug}`;

      const method = modalMode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentProject),
      });

      if (response.ok) {
        setIsModalOpen(false);
        fetchProjects();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to save project');
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
            Projects Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your portfolio projects
          </p>
        </div>
        <div className="flex w-full md:w-auto items-center gap-4">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search projects..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button onClick={handleAdd} className="wb-bg-primary hover:opacity-90 text-white shrink-0">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {loadingProjects ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No projects found matching your search.
              </p>
              <Button onClick={handleAdd} className="wb-bg-primary hover:opacity-90 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add First Project
              </Button>
            </div>
          ) : (
            filteredProjects.map((project: any) => (
              <Card key={project._id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="mt-1">
                        {project.description}
                      </CardDescription>
                    </div>
                    {project.featured && (
                      <Badge className="wb-bg-primary text-white">Featured</Badge>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.techStack?.slice(0, 3).map((tech: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack?.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{project.techStack.length - 3}
                      </Badge>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="capitalize">
                      {project.category?.replace('-', ' ')}
                    </Badge>

                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(project)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {project.liveUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDelete(project.slug)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
              className="relative bg-white dark:bg-[#0D0425] rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center sticky top-0 bg-white dark:bg-[#0D0425] z-10">
                <h2 className="text-xl font-bold">
                  {modalMode === 'add' ? 'Add New Project' : 'Edit Project'}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <form onSubmit={handleSave} className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Project Title</Label>
                      <Input
                        id="title"
                        required
                        value={currentProject.title}
                        onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={currentProject.category}
                        onValueChange={(val) => setCurrentProject({ ...currentProject, category: val })}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.length > 0 ? (
                            categories.map((cat: any) => (
                              <SelectItem key={cat._id} value={cat.slug}>
                                {cat.name}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="website">Website (Fallback)</SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Short Description</Label>
                    <Input
                      id="description"
                      required
                      value={currentProject.description}
                      onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longDescription">Long Description</Label>
                    <Textarea
                      id="longDescription"
                      value={currentProject.longDescription}
                      onChange={(e) => setCurrentProject({ ...currentProject, longDescription: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="techStack">Tech Stack (comma separated)</Label>
                    <Input
                      id="techStack"
                      placeholder="React, Tailwind, Node.js"
                      value={currentProject.techStack?.join(', ')}
                      onChange={(e) => setCurrentProject({
                        ...currentProject,
                        techStack: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')
                      })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="liveUrl">Live URL</Label>
                      <Input
                        id="liveUrl"
                        type="url"
                        value={currentProject.liveUrl}
                        onChange={(e) => setCurrentProject({ ...currentProject, liveUrl: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="githubUrl">GitHub URL</Label>
                      <Input
                        id="githubUrl"
                        type="url"
                        value={currentProject.githubUrl}
                        onChange={(e) => setCurrentProject({ ...currentProject, githubUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <div className="space-y-0.5">
                      <Label className="text-base">Featured Project</Label>
                      <div className="text-sm text-gray-500">Show on the homepage</div>
                    </div>
                    <Switch
                      checked={currentProject.featured}
                      onCheckedChange={(val) => setCurrentProject({ ...currentProject, featured: val })}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 dark:border-white/5 sticky bottom-0 bg-white dark:bg-[#0D0425] -mx-1 -mb-1">
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSaving} className="wb-bg-primary text-white px-8">
                    {isSaving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Check className="h-4 w-4 mr-2" />}
                    {modalMode === 'add' ? 'Create Project' : 'Save Changes'}
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