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
  Trash2
} from 'lucide-react';
import { Contact } from '@/lib/db-schemas';

export default function AdminContactsPage() {
  const { user, loading } = useAdmin();
  const router = useRouter();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loadingContacts, setLoadingContacts] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

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
        
        <div className="flex gap-2">
          {['all', 'new', 'contacted', 'in-discussion', 'proposal-sent', 'closed'].map((status) => (
            <Button
              key={status}
              variant={selectedStatus === status ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedStatus(status);
                fetchContacts();
              }}
              className="capitalize"
            >
              {status === 'all' ? 'All' : status.replace('-', ' ')}
            </Button>
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
            <Card key={contact._id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{contact.name}</CardTitle>
                    <CardDescription className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center space-x-1">
                        <Mail className="h-4 w-4" />
                        <span>{contact.email}</span>
                      </span>
                      {contact.phone && (
                        <span className="flex items-center space-x-1">
                          <Phone className="h-4 w-4" />
                          <span>{contact.phone}</span>
                        </span>
                      )}
                    </CardDescription>
                  </div>
                  <Badge className={getStatusColor(contact.status)}>
                    {contact.status.replace('-', ' ')}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Eye className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{formatProjectType(contact.projectType)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <IndianRupee className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">{formatBudget(contact.budget)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm capitalize">{contact.timeline.replace('-', ' ')}</span>
                  </div>
                </div>
                
                {contact.company && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <strong>Company:</strong> {contact.company}
                  </p>
                )}
                
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {contact.message}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {new Date(contact.createdAt).toLocaleDateString()} at{' '}
                    {new Date(contact.createdAt).toLocaleTimeString()}
                  </span>
                  
                  <div className="flex space-x-2">
                    {contact.status === 'new' && (
                      <Button
                        size="sm"
                        onClick={() => updateContactStatus(contact._id!, 'contacted')}
                      >
                        Mark as Contacted
                      </Button>
                    )}
                    {contact.status === 'contacted' && (
                      <Button
                        size="sm"
                        onClick={() => updateContactStatus(contact._id!, 'in-discussion')}
                      >
                        In Discussion
                      </Button>
                    )}
                    {contact.status === 'in-discussion' && (
                      <Button
                        size="sm"
                        onClick={() => updateContactStatus(contact._id!, 'proposal-sent')}
                      >
                        Proposal Sent
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
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
    </div>
  );
}