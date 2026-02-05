import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Mail, AlertCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

// Temporary credentials (will be replaced with Supabase Auth)
const TEMP_CREDENTIALS = {
  email: 'admin@hurayra.com',
  password: 'admin123'
}

export default function AdminLogin() {
  const { t } = useTranslation('admin-login')
  const navigate = useNavigate()
  const { toast } = useToast()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (email === TEMP_CREDENTIALS.email && password === TEMP_CREDENTIALS.password) {
      toast({
        title: t('toast.successTitle'),
        description: t('toast.successDesc'),
        duration: 3000
      })
      localStorage.setItem('admin_authenticated', 'true')
      navigate('/admin')
    } else {
      setError(t('error'))
      toast({
        title: t('toast.failTitle'),
        description: t('toast.failDesc'),
        variant: "destructive",
        duration: 3000
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4 relative">
      {/* Language switcher — top right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
        <LanguageSwitcher />
      </div>
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 mb-4">
            <img
              src="/logos/Hurayra-uae-svg-logo.svg"
              alt="HurayraPetFood.ae Admin"
              className="h-14 w-auto"
            />
          </div>
          <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">
            {t('title')}
          </h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <Label htmlFor="email">{t('email')}</Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="password">{t('password')}</Label>
              <div className="relative mt-2">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t('passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? t('submitting') : t('submit')}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-2">{t('demoTitle')}</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>{t('demoEmail')} <code className="bg-white px-2 py-0.5 rounded">admin@hurayra.com</code></p>
              <p>{t('demoPassword')} <code className="bg-white px-2 py-0.5 rounded">admin123</code></p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          {t('footer')}
        </p>
      </div>
    </div>
  )
}
