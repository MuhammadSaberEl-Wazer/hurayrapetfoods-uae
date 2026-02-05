import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation('admin-settings')
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    // Store Information
    storeName: 'HurayraPetFood.ae',
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
      title: t('toastSavedTitle'),
      description: t('toastSavedDesc'),
      duration: 3000
    })
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
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
                <h2 className="text-xl font-bold text-gray-900">{t('storeInfo')}</h2>
                <p className="text-sm text-gray-600">{t('storeInfoDesc')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="storeName">{t('storeName')}</Label>
                <Input
                  id="storeName"
                  value={settings.storeName}
                  onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="email">{t('email')}</Label>
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
                  <Label htmlFor="phone">{t('phone')}</Label>
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
                  <Label htmlFor="whatsapp">{t('whatsapp')}</Label>
                  <Input
                    id="whatsapp"
                    value={settings.whatsapp}
                    onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="address">{t('address')}</Label>
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
                <h2 className="text-xl font-bold text-gray-900">{t('socialMedia')}</h2>
                <p className="text-sm text-gray-600">{t('socialMediaDesc')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="facebook">{t('facebook')}</Label>
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
                <Label htmlFor="instagram">{t('instagram')}</Label>
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
                <Label htmlFor="twitter">{t('twitter')}</Label>
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
                <h2 className="text-xl font-bold text-gray-900">{t('businessSettings')}</h2>
                <p className="text-sm text-gray-600">{t('businessSettingsDesc')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="freeShipping">{t('freeShippingThreshold')}</Label>
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
                  <Label htmlFor="shippingFee">{t('standardShippingFee')}</Label>
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
                  <Label htmlFor="currency">{t('currency')}</Label>
                  <Input
                    id="currency"
                    value={settings.currency}
                    onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                  />
                </div>

                <div>
                  <Label htmlFor="taxRate">{t('taxRate')}</Label>
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
                <h2 className="text-lg font-bold text-gray-900">{t('notifications')}</h2>
                <p className="text-sm text-gray-600">{t('notificationsDesc')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{t('emailNotifications')}</p>
                  <p className="text-sm text-gray-500">{t('emailNotificationsDesc')}</p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{t('orderNotifications')}</p>
                  <p className="text-sm text-gray-500">{t('orderNotificationsDesc')}</p>
                </div>
                <Switch
                  checked={settings.orderNotifications}
                  onCheckedChange={(checked) => setSettings({ ...settings, orderNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{t('lowStockAlerts')}</p>
                  <p className="text-sm text-gray-500">{t('lowStockAlertsDesc')}</p>
                </div>
                <Switch
                  checked={settings.lowStockAlerts}
                  onCheckedChange={(checked) => setSettings({ ...settings, lowStockAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{t('customerMessages')}</p>
                  <p className="text-sm text-gray-500">{t('customerMessagesDesc')}</p>
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
                <h2 className="text-lg font-bold text-gray-900">{t('website')}</h2>
                <p className="text-sm text-gray-600">{t('websiteDesc')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{t('maintenanceMode')}</p>
                  <p className="text-sm text-gray-500">{t('maintenanceModeDesc')}</p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, maintenanceMode: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{t('allowRegistration')}</p>
                  <p className="text-sm text-gray-500">{t('allowRegistrationDesc')}</p>
                </div>
                <Switch
                  checked={settings.allowRegistration}
                  onCheckedChange={(checked) => setSettings({ ...settings, allowRegistration: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{t('showPrices')}</p>
                  <p className="text-sm text-gray-500">{t('showPricesDesc')}</p>
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

      {/* Save Changes — full width, larger and accessible on mobile */}
      <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row justify-end">
        <Button
          onClick={handleSave}
          className="w-full sm:w-auto min-h-12 px-8 gap-2 bg-primary hover:bg-primary/90"
          size="lg"
        >
          <Save className="w-5 h-5 shrink-0" />
          {t('saveChanges')}
        </Button>
      </div>
    </div>
  )
}
