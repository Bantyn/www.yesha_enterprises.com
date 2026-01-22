'use client';

import { useEffect, useState } from 'react';
import { useAdmin } from '../admin-provider';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Settings,
  Mail,
  Phone,
  MapPin,
  Globe,
  Save,
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminSettingsPage() {
  const { user, loading } = useAdmin();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [initLoading, setInitLoading] = useState(true);

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    ownerName: '', // This might not be in schema, handling safely
    email: '',
    phone: '',
    address: '',
    maintenanceMode: false
  });

  const [seoSettings, setSeoSettings] = useState({
    siteTitle: '',
    siteDescription: '',
    keywords: ''
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
      return;
    }

    if (user) {
      fetchSettings();
    }
  }, [user, loading, router]);

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        if (data.companyInfo) {
          setCompanyInfo(prev => ({ ...prev, ...data.companyInfo }));
        }
        if (data.seo) {
          setSeoSettings({
            siteTitle: data.seo.title || '',
            siteDescription: data.seo.description || '',
            keywords: data.seo.keywords ? data.seo.keywords.join(', ') : ''
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setInitLoading(false);
    }
  };

  const handleCompanyUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'company',
          data: companyInfo
        })
      });

      if (response.ok) {
        toast.success('Company settings updated!');
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleMaintenanceToggle = async (checked: boolean) => {
    // Optimistic update
    setCompanyInfo(prev => ({ ...prev, maintenanceMode: checked }));

    try {
      const response = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'company',
          data: { ...companyInfo, maintenanceMode: checked }
        })
      });

      if (!response.ok) {
        // Revert on failure
        setCompanyInfo(prev => ({ ...prev, maintenanceMode: !checked }));
        toast.error('Failed to update maintenance mode');
      } else {
        toast.success(`Maintenance mode ${checked ? 'enabled' : 'disabled'}`);
      }
    } catch (error) {
      setCompanyInfo(prev => ({ ...prev, maintenanceMode: !checked }));
      toast.error('Error updating maintenance mode');
    }
  };

  if (loading || !user || initLoading) {
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
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your website settings and configuration
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Company Information</span>
            </CardTitle>
            <CardDescription>
              Update your company details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCompanyUpdate} className="space-y-4">
              <div>
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={companyInfo.name || ''}
                  onChange={(e) => setCompanyInfo({ ...companyInfo, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    value={companyInfo.email || ''}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, email: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={companyInfo.phone || ''}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, phone: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="address"
                    value={companyInfo.address || ''}
                    onChange={(e) => setCompanyInfo({ ...companyInfo, address: e.target.value })}
                  />
                </div>
              </div>
              <Button type="submit" disabled={saving} className="bg-blue-600 hover:bg-blue-700 text-white">
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* System Control */}
          <Card className="border-red-200 dark:border-red-900/50 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                <ShieldAlert className="h-5 w-5" />
                <span>System Control</span>
              </CardTitle>
              <CardDescription>
                Emergency controls and system status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Maintenance Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Restrict public access to the site
                  </p>
                </div>
                <Switch
                  checked={companyInfo.maintenanceMode}
                  onCheckedChange={handleMaintenanceToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5" />
                <span>SEO Configuration</span>
              </CardTitle>
              <CardDescription>
                Basic SEO settings (View Only - Use API for full control)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Site Title</Label>
                <Input value={seoSettings.siteTitle} disabled />
              </div>
              <div>
                <Label>Description</Label>
                <Input value={seoSettings.siteDescription} disabled />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}