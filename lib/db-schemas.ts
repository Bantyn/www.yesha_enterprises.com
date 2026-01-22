import { z } from 'zod';

// Project Schema
export const ProjectSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().optional(),
  techStack: z.array(z.string()).min(1, 'At least one technology is required'),
  images: z.array(z.string()).min(1, 'At least one image is required'),
  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  category: z.enum(['website', 'web-app', 'mern-stack', 'nextjs', 'dashboard', 'api']),
  featured: z.boolean().default(false),
  status: z.enum(['completed', 'in-progress', 'planned']).default('completed'),
  clientName: z.string().optional(),
  completedDate: z.date().optional(),
  slug: z.string().min(1, 'Slug is required'),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Service Schema
export const ServiceSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  longDescription: z.string().min(1, 'Long description is required'),
  icon: z.string().min(1, 'Icon is required'),
  features: z.array(z.string()).min(1, 'At least one feature is required'),
  technologies: z.array(z.string()).min(1, 'At least one technology is required'),
  startingPrice: z.number().min(0, 'Price must be positive'),
  deliveryTime: z.string().min(1, 'Delivery time is required'),
  slug: z.string().min(1, 'Slug is required'),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Contact/Lead Schema
export const ContactSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.enum(['website', 'web-app', 'mern-stack', 'nextjs', 'dashboard', 'api', 'other']),
  budget: z.enum(['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k-plus']),
  timeline: z.enum(['asap', '1-month', '2-3-months', '3-6-months', 'flexible']),
  message: z.string().min(1, 'Message is required'),
  status: z.enum(['new', 'contacted', 'in-discussion', 'proposal-sent', 'closed']).default('new'),
  source: z.enum(['website', 'referral', 'social-media', 'google', 'other']).default('website'),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Admin User Schema
export const AdminUserSchema = z.object({
  _id: z.string().optional(),
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required'),
  role: z.enum(['admin', 'editor']).default('admin'),
  isActive: z.boolean().default(true),
  lastLogin: z.date().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// SEO Settings Schema
export const SEOSettingsSchema = z.object({
  _id: z.string().optional(),
  page: z.string().min(1, 'Page identifier is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  keywords: z.array(z.string()).default([]),
  ogImage: z.string().optional(),
  canonicalUrl: z.string().url().optional(),
  noIndex: z.boolean().default(false),
  structuredData: z.record(z.any()).optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// Company Info Schema
export const CompanyInfoSchema = z.object({
  _id: z.string().optional(),
  name: z.string().default('Web Buddies'),
  tagline: z.string().default('Modern Websites & Scalable Web Applications'),
  description: z.string().min(1, 'Description is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  address: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().url().optional(),
    twitter: z.string().url().optional(),
    github: z.string().url().optional(),
    instagram: z.string().url().optional(),
  }).optional(),
  workingHours: z.string().default('Mon-Fri 9AM-6PM'),
  responseTime: z.string().default('Within 24 hours'),
  yearsOfExperience: z.number().default(5),
  projectsCompleted: z.number().default(50),
  clientsSatisfied: z.number().default(40),
  updatedAt: z.date().default(() => new Date()),
});

// Type exports
export type Project = z.infer<typeof ProjectSchema>;
export type Service = z.infer<typeof ServiceSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type AdminUser = z.infer<typeof AdminUserSchema>;
export type SEOSettings = z.infer<typeof SEOSettingsSchema>;
export type CompanyInfo = z.infer<typeof CompanyInfoSchema>;