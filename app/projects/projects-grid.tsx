'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/db-schemas';

export function ProjectsGrid() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const category = searchParams.get('category') || 'all';
        const page = searchParams.get('page') || '1';
        
        const params = new URLSearchParams({
          page,
          limit: '12',
        });
        
        if (category !== 'all') {
          params.set('category', category);
        }

        const response = await fetch(`/api/projects?${params}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        setProjects(data.projects);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 mb-4"></div>
            <div className="space-y-2">
              <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-3/4"></div>
              <div className="bg-gray-200 dark:bg-gray-700 rounded h-4 w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400 mb-4">Error loading projects: {error}</p>
        <Button onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          No projects found for the selected category.
        </p>
        <Button asChild>
          <Link href="/projects">View All Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className="group hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            {/* Project Image */}
            <div className="relative overflow-hidden rounded-t-lg">
              <Image
                src={project.images[0] || '/placeholder-project.svg'}
                alt={project.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {project.featured && (
                <Badge className="absolute top-3 left-3 bg-blue-600 text-white">
                  Featured
                </Badge>
              )}
              <div className="absolute top-3 right-3">
                <Badge variant="secondary" className="capitalize">
                  {project.category.replace('-', ' ')}
                </Badge>
              </div>
            </div>

            <CardHeader className="flex-grow">
              <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
                <Link href={`/projects/${project.slug}`}>
                  {project.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-2">
                {project.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Tech Stack */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.techStack.slice(0, 4).map((tech, techIndex) => (
                  <Badge key={techIndex} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
                {project.techStack.length > 4 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.techStack.length - 4} more
                  </Badge>
                )}
              </div>

              {/* Project Info */}
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {project.completedDate 
                      ? new Date(project.completedDate).getFullYear()
                      : 'Ongoing'
                    }
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span className="capitalize">{project.status.replace('-', ' ')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Button asChild size="sm" className="flex-1">
                  <Link href={`/projects/${project.slug}`}>
                    View Details
                  </Link>
                </Button>
                
                {project.liveUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                
                {project.githubUrl && (
                  <Button size="sm" variant="outline" asChild>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}