'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const categories = [
  { value: 'all', label: 'All Projects' },
  { value: 'website', label: 'Websites' },
  { value: 'web-app', label: 'Web Apps' },
  { value: 'mern-stack', label: 'MERN Stack' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'dashboard', label: 'Dashboards' },
  { value: 'api', label: 'APIs' },
];

export function ProjectsFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams);
    
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    
    // Reset page when changing category
    params.delete('page');
    
    const queryString = params.toString();
    const url = queryString ? `/projects?${queryString}` : '/projects';
    
    // Use replace instead of push to prevent scroll to top
    router.replace(url, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <Button
          key={category.value}
          variant={currentCategory === category.value ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleCategoryChange(category.value)}
          className={
            currentCategory === category.value
              ? 'wb-bg-primary hover:opacity-90 text-white'
              : 'hover:wb-bg-primary/10 wb-border-primary wb-text-primary'
          }
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}