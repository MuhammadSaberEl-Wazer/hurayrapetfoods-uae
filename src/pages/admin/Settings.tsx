import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { 
  Settings as SettingsIcon,
  Store,
  Mail,
  Phone,
  MapPin,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Bell,
  Save,
  Upload
} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

export default function AdminSettings() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // Store Information
    storeName: 'Hurayra Pet Foods',
    storeNameAr: 'Hurayra Pet Foods',
    email: 'info@hurayrapet.ae',
    phone: '+971 50 123 4567',
    whatsapp: '+971 50 123 4567',
    address: 'Dubai, United Arab Emirates',
    
    // Social Media
    facebook: 'https://facebook.com/hurayrapet',
    instagram: 'https://instagram.com/hurayrapet',
    twitter: 'https://twitter.com/hurayrapet',
    tiktok: 'https://tiktok.com/@hurayrapet',
    
    // Business Settings
    freeShippingThreshold: 100,
    shippingFee: 20,
    currency: 'AED',
    taxRate: 0,
    
    // Notifications
    emailNotifications: true,
    orderNotifications: true,
    lowStockAlerts: true,
    customerMessages: true,
    
    // Website
    maintenanceMode: false,
    allowRegistration: true,
    showPrices: true
  })

  const handleSave = () => {
    // Mock save - will connect to Supabase later
    toast({
      title: "Settings Saved!",
      description: "Your changes have been saved successfully.",
      duration: 3000
    })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your store settings and preferences</p>
        </div>
        <Button onClick={handleSave} className="bg-primary hover:bg-primary/90">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Store Information */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Store Information</h2>
                <p className="text-sm text-gray-600">Basic details about your store</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="storeName">Store Name (English)</Label>
                  <Input
                    id="storeName"
                    value={settings.storeName}
                    onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="storeNameAr" className="font-cairo">Store Name (Arabic)</Label>
                  <Input
                    id="storeNameAr"
                    value={settings.storeNameAr}
                    onChange={(e) => setSettings({ ...settings, storeNameAr: e.target.value })}
                    className="font-cairo"
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Textarea
                    id="address"
                    value={settings.address}
                    onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    className="pl-10"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Social Media</h2>
                <p className="text-sm text-gray-600">Your social media profiles</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="facebook">Facebook</Label>
                <div className="relative">
                  <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="facebook"
                    value={settings.facebook}
                    onChange={(e) => setSettings({ ...settings, facebook: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="instagram">Instagram</Label>
                <div className="relative">
                  <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="instagram"
                    value={settings.instagram}
                    onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <div className="relative">
                  <Twitter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    id="twitter"
                    value={settings.twitter}
                    onChange={(e) => setSettings({ ...settings, twitter: e.target.value })}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <SettingsIcon className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Business Settings</h2>
                <p className="text-sm text-gray-600">Pricing and shipping configuration</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="freeShipping">Free Shipping Threshold</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">AED</span>
                    <Input
                      id="freeShipping"
                      type="number"
                      value={settings.freeShippingThreshold}
                      onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                      className="pl-12"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shippingFee">Standard Shipping Fee</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">AED</span>
                    <Input
                      id="shippingFee"
                      type="number"
                      value={settings.shippingFee}
                      onChange={(e) => setSettings({ ...settings, shippingFee: Number(e.target.value) })}
                      className="pl-12"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={settings.taxRate}
                    onChange={(e) => setSettings({ ...settings, taxRate: Number(e.target.value) })}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          {/* Notifications */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Notifications</h2>
                <p className="text-sm text-gray-600">Manage alerts</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-500">Receive email alerts</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Order Notifications</p>
                  <p className="text-sm text-gray-500">New order alerts</p>
                </div>
                <Switch
                  checked={settings.orderNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, orderNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Low Stock Alerts</p>
                  <p className="text-sm text-gray-500">Product stock warnings</p>
                </div>
                <Switch
                  checked={settings.lowStockAlerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, lowStockAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Customer Messages</p>
                  <p className="text-sm text-gray-500">Contact form alerts</p>
                </div>
                <Switch
                  checked={settings.customerMessages}
                  onCheckedChange={(checked) => setSettings({ ...settings, customerMessages: checked })}
                />
              </div>
            </div>
          </div>

          {/* Website Settings */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Website</h2>
                <p className="text-sm text-gray-600">Site preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Maintenance Mode</p>
                  <p className="text-sm text-gray-500">Disable public access</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Allow Registration</p>
                  <p className="text-sm text-gray-500">User sign ups</p>
                </div>
                <Switch
                  checked={settings.allowRegistration}
                  onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Show Prices</p>
                  <p className="text-sm text-gray-500">Display product prices</p>
                </div>
                <Switch
                  checked={settings.showPrices}
                  onCheckedChange={(checked) => setSettings({ ...settings, showPrices: checked })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
