'use client';

import { useEffect, useState } from 'react';
import { useAdmin } from './admin-provider';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  FolderOpen,
  Mail,
  TrendingUp,
  AlertCircle,
  Activity
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface DashboardStats {
  totalProjects: number;
  totalContacts: number;
  newContacts: number;
  inDiscussionContacts: number;
  closedContacts: number;
}

interface GraphDataPoint {
  name: string;
  total: number;
}

export default function AdminDashboard() {
  const { user, loading } = useAdmin();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentContacts, setRecentContacts] = useState<any[]>([]);
  const [graphData, setGraphData] = useState<GraphDataPoint[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      fetchDashboardData();
    }
  }, [user, loading, router]);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/dashboard');
      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
        setRecentContacts(data.contacts);
        setGraphData(data.graphData);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Projects',
      value: stats?.totalProjects || 0,
      description: 'Completed projects',
      icon: FolderOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Total Contacts',
      value: stats?.totalContacts || 0,
      description: 'All time inquiries',
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'New Leads',
      value: stats?.newContacts || 0,
      description: 'Awaiting response',
      icon: AlertCircle,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900/20',
    },
    {
      title: 'Active Discussions',
      value: stats?.inDiscussionContacts || 0,
      description: 'In progress',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user.name}! 👋
        </h1>
        <p className="text-blue-100">
          Here's what's happening with your Web Buddies dashboard today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Card key={index} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Analytics Graph */}
      <Card className="col-span-4">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Inquiry Trends</span>
          </CardTitle>
          <CardDescription>
            Number of inquiries over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={graphData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1} />
                <Area type="monotone" dataKey="total" stroke="#8884d8" fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contacts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Recent Contacts</span>
            </CardTitle>
            <CardDescription>
              Latest inquiries from potential clients
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadingStats ? (
              <div className="space-y-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentContacts.length > 0 ? (
              <div className="space-y-4">
                {recentContacts.map((contact, index) => (
                  <div key={index} className="flex items-start justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium text-sm">{contact.name}</p>
                        <Badge
                          variant={contact.status === 'new' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {contact.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {contact.projectType?.replace('-', ' ')} • {contact.budget}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm py-4 text-center">
                No recent contacts
              </p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a
                href="/admin/projects"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <FolderOpen className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Manage Projects</p>
                  <p className="text-xs text-muted-foreground">Add or edit portfolio items</p>
                </div>
              </a>

              <a
                href="/admin/contacts"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
              >
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">Review Contacts</p>
                  <p className="text-xs text-muted-foreground">Respond to client inquiries</p>
                </div>
              </a>

              <a
                href="/admin/settings"
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border"
              >
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <AlertCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">System Status</p>
                  <p className="text-xs text-muted-foreground">Manage maintenance mode</p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}