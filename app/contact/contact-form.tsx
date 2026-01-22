'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Send } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().optional(),
  company: z.string().optional(),
  projectType: z.enum(['website', 'web-app', 'mern-stack', 'nextjs', 'dashboard', 'api', 'other']),
  budget: z.enum(['under-5k', '5k-10k', '10k-25k', '25k-50k', '50k-plus']),
  timeline: z.enum(['asap', '1-month', '2-3-months', '3-6-months', 'flexible']),
  message: z.string().min(10, 'Please provide more details about your project'),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const projectTypes = [
  { value: 'website', label: 'Website Development' },
  { value: 'web-app', label: 'Web Application' },
  { value: 'mern-stack', label: 'MERN Stack Application' },
  { value: 'nextjs', label: 'Next.js Website' },
  { value: 'dashboard', label: 'Admin Dashboard' },
  { value: 'api', label: 'API Development' },
  { value: 'other', label: 'Other' },
];

const budgetRanges = [
  { value: 'under-5k', label: 'Under $5,000' },
  { value: '5k-10k', label: '$5,000 - $10,000' },
  { value: '10k-25k', label: '$10,000 - $25,000' },
  { value: '25k-50k', label: '$25,000 - $50,000' },
  { value: '50k-plus', label: '$50,000+' },
];

const timelines = [
  { value: 'asap', label: 'ASAP' },
  { value: '1-month', label: '1 Month' },
  { value: '2-3-months', label: '2-3 Months' },
  { value: '3-6-months', label: '3-6 Months' },
  { value: 'flexible', label: 'Flexible' },
];

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || 'Thank you! We\'ll get back to you soon.');
        reset();
        
        // Track form submission for analytics
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'form_submit', {
            event_category: 'Contact',
            event_label: data.projectType,
            value: data.budget,
          });
        }
      } else {
        toast.error(result.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
   <form
  onSubmit={handleSubmit(onSubmit)}
  className="relative space-y-8 rounded-2xl border border-gray-200/60
             dark:border-white/10 bg-white/70 dark:bg-[#0D0425]/70
             backdrop-blur-xl p-6 md:p-8 shadow-xl"
>
  {/* Header */}
  <div className="text-center">
    <h2 className="text-2xl md:text-3xl font-bold mb-2">
      Let’s Build Something Great 
    </h2>
    <p className="text-gray-600 dark:text-gray-400">
      Tell us about your project and we’ll get back within 24 hours.
    </p>
  </div>

  {/* Name & Email */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div className="space-y-1">
      <Label>Name *</Label>
      <Input
        {...register('name')}
        placeholder="Your full name"
        className="h-11 rounded-lg border-gray-300/70 dark:border-white/10
                   focus:ring-2 focus:ring-[#C645F9]/40"
      />
      {errors.name && (
        <p className="text-sm text-red-500">{errors.name.message}</p>
      )}
    </div>

    <div className="space-y-1">
      <Label>Email *</Label>
      <Input
        type="email"
        {...register('email')}
        placeholder="your@email.com"
        className="h-11 rounded-lg border-gray-300/70 dark:border-white/10
                   focus:ring-2 focus:ring-[#5E6CE7]/40"
      />
      {errors.email && (
        <p className="text-sm text-red-500">{errors.email.message}</p>
      )}
    </div>
  </div>

  {/* Phone & Company */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div className="space-y-1">
      <Label>Phone</Label>
      <Input
        {...register('phone')}
        placeholder="+91 98765 43210"
        className="h-11 rounded-lg"
      />
    </div>

    <div className="space-y-1">
      <Label>Company</Label>
      <Input
        {...register('company')}
        placeholder="Company name"
        className="h-11 rounded-lg"
      />
    </div>
  </div>

  {/* Project Type */}
  <div className="space-y-1">
    <Label>Project Type *</Label>
    <Select onValueChange={(v) => setValue('projectType', v as any)}>
      <SelectTrigger className="h-11 rounded-lg">
        <SelectValue placeholder="Select project type" />
      </SelectTrigger>
      <SelectContent>
        {projectTypes.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>

  {/* Budget & Timeline */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    <div className="space-y-1">
      <Label>Budget *</Label>
      <Select onValueChange={(v) => setValue('budget', v as any)}>
        <SelectTrigger className="h-11 rounded-lg">
          <SelectValue placeholder="Budget range" />
        </SelectTrigger>
        <SelectContent>
          {budgetRanges.map((b) => (
            <SelectItem key={b.value} value={b.value}>
              {b.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>

    <div className="space-y-1">
      <Label>Timeline *</Label>
      <Select onValueChange={(v) => setValue('timeline', v as any)}>
        <SelectTrigger className="h-11 rounded-lg">
          <SelectValue placeholder="Project timeline" />
        </SelectTrigger>
        <SelectContent>
          {timelines.map((t) => (
            <SelectItem key={t.value} value={t.value}>
              {t.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  </div>

  {/* Message */}
  <div className="space-y-1">
    <Label>Project Details *</Label>
    <Textarea
      {...register('message')}
      rows={5}
      placeholder="Tell us about your goals, features, and expectations…"
      className="rounded-xl resize-none focus:ring-2 focus:ring-[#C645F9]/30"
    />
  </div>

  {/* Submit */}
  <Button
    type="submit"
    disabled={isSubmitting}
    size="lg"
    className="w-full h-12 text-white font-semibold
               bg-gradient-to-r from-[#C645F9] to-[#5E6CE7]
               hover:opacity-90 transition-all shadow-lg"
  >
    {isSubmitting ? (
      <>
        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
        Sending...
      </>
    ) : (
      <>
        <Send className="h-5 w-5 mr-2" />
        Send Request
      </>
    )}
  </Button>

  <p className="text-sm text-center text-gray-600 dark:text-gray-400">
    🔒 Your information is safe. We never share your data.
  </p>
</form>

  );
}