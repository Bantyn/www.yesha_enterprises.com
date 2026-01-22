'use client';

import { useEffect, useState } from 'react';
import { useAdmin } from '../admin-provider';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Mail,
  Phone,
  Calendar,
  IndianRupee,
  Clock,
  Search,
  Eye,
  Trash2,
  MoreVertical,
  X,
  Check,
  MessageSquare
} from 'lucide-react';
import { Contact } from '@/lib/db-schemas';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function AdminContactsPage() {
  const { user, loading } = useAdmin();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      fetchContacts();
    }
  }, [user, loading, router]);

  const fetchContacts = async () => {
    try {
      setLoadingContacts(true);
      const params = new URLSearchParams();
      if (selectedStatus !== 'all') {
        params.set('status', selectedStatus);
      }

      const response = await fetch(`/api/contact?${params}`);
      if (response.ok) {
        const data = await response.json();
        setContacts(data.contacts);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoadingContacts(false);
    }
  };

  const updateContactStatus = async (contactId: string, status: string) => {
    try {
      const response = await fetch(`/api/contact/${contactId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchContacts(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update contact status:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact submission?')) return;

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchContacts();
      } else {
        alert('Failed to delete contact');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const openDetails = (contact: Contact) => {
    setSelectedContact(contact);
    setIsDetailModalOpen(true);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.company?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800';
      case 'contacted': return 'bg-yellow-100 text-yellow-800';
      case 'in-discussion': return 'bg-purple-100 text-purple-800';
      case 'proposal-sent': return 'bg-orange-100 text-orange-800';
      case 'closed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatProjectType = (type: string) => {
    const types: Record<string, string> = {
      'website': 'Website Development',
      'web-app': 'Web Application',
      'mern-stack': 'MERN Stack Application',
      'nextjs': 'Next.js Website',
      'dashboard': 'Admin Dashboard',
      'api': 'API Development',
      'other': 'Other'
    };
    return types[type] || type;
  };

  const formatBudget = (budget: string) => {
    const budgets: Record<string, string> = {
      'under-5k': 'Under ₹5,000',
      '5k-10k': '₹5,000 - ₹10,000',
      '10k-25k': '₹10,000 - ₹25,000',
      '25k-50k': '₹25,000 - ₹50,000',
      '50k-plus': '₹50,000+'
    };
    return budgets[budget] || budget;
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Contact Management
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage and respond to client inquiries
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search contacts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-full w-full sm:w-auto overflow-x-auto no-scrollbar">
          {['all', 'new', 'contacted', 'in-discussion', 'proposal-sent', 'closed'].map((status) => (
            <button
              key={status}
              onClick={() => {
                setSelectedStatus(status);
                fetchContacts();
              }}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap capitalize",
                selectedStatus === status
                  ? "bg-white dark:bg-purple-600 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
              )}
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Contacts List */}
      {loadingContacts ? (
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-32"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredContacts.map((contact) => (
            <Card key={contact._id} className="hover:shadow-md transition-shadow dark:bg-[#0D0425]/50 border-gray-100 dark:border-white/5">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold">{contact.name}</CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                      <span className="flex items-center space-x-1">
                        <Mail className="h-3.5 w-3.5 text-purple-600" />
                        <span className="text-xs">{contact.email}</span>
                      </span>
                      {contact.phone && (
                        <span className="flex items-center space-x-1">
                          <Phone className="h-3.5 w-3.5 text-purple-600" />
                          <span className="text-xs">{contact.phone}</span>
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select
                      value={contact.status}
                      onValueChange={(val) => updateContactStatus(contact._id!, val)}
                    >
                      <SelectTrigger className={cn("h-8 rounded-full border-none shadow-none text-xs w-36 capitalize", getStatusColor(contact.status))}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="contacted">Contacted</SelectItem>
                        <SelectItem value="in-discussion">In Discussion</SelectItem>
                        <SelectItem value="proposal-sent">Proposal Sent</SelectItem>
                        <SelectItem value="closed">Closed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full"
                      onClick={() => handleDelete(contact._id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 p-3 bg-gray-50 dark:bg-white/5 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-white dark:bg-[#0D0425] rounded-lg shadow-sm">
                      <Eye className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium">{formatProjectType(contact.projectType)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-white dark:bg-[#0D0425] rounded-lg shadow-sm">
                      <IndianRupee className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium">{formatBudget(contact.budget)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="p-1.5 bg-white dark:bg-[#0D0425] rounded-lg shadow-sm">
                      <Clock className="h-4 w-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium capitalize">{contact.timeline.replace('-', ' ')}</span>
                  </div>
                </div>

                {contact.company && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong className="text-gray-900 dark:text-gray-200">Company:</strong> {contact.company}
                  </p>
                )}

                <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 italic border-l-2 border-purple-200 dark:border-purple-900/50 pl-4 py-1 mb-4">
                  "{contact.message}"
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">
                    {new Date(contact.createdAt).toLocaleDateString()} at{' '}
                    {new Date(contact.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full h-8"
                      onClick={() => openDetails(contact)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      View Full Message
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full h-8 px-3"
                      onClick={() => window.open(`mailto:${contact.email}`)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredContacts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                No contacts found matching your criteria.
              </p>
            </div>
          )}
        </div>
      )}
      <AnimatePresence>
        {isDetailModalOpen && selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative bg-white dark:bg-[#0D0425] rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-100 dark:border-white/5 flex justify-between items-center sticky top-0 bg-white dark:bg-[#0D0425] z-10">
                <div>
                  <h2 className="text-xl font-bold">{selectedContact.name}</h2>
                  <p className="text-xs text-gray-500">Contact Details</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => setIsDetailModalOpen(false)} className="rounded-full">
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Email</p>
                    <p className="text-sm font-medium">{selectedContact.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Phone</p>
                    <p className="text-sm font-medium">{selectedContact.phone || 'N/A'}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Project Type</p>
                    <Badge variant="secondary" className="capitalize">
                      {selectedContact.projectType.replace('-', ' ')}
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Budget</p>
                    <p className="text-sm font-medium">{formatBudget(selectedContact.budget)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Message</p>
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl italic text-gray-700 dark:text-gray-300 border-l-4 border-purple-600">
                    "{selectedContact.message}"
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button variant="outline" className="rounded-full" onClick={() => setIsDetailModalOpen(false)}>
                    Close
                  </Button>
                  <Button className="wb-bg-primary text-white rounded-full px-6" onClick={() => window.open(`mailto:${selectedContact.email}`)}>
                    <Mail className="h-4 w-4 mr-2" />
                    Reply
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}