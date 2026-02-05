import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Lock, Mail, AlertCircle } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useToast } from '@/hooks/use-toast'

export default function Login() {
  const { t } = useTranslation('auth')
  const navigate = useNavigate()
  const { toast } = useToast()
  const login = useAuthStore((s) => s.login)
  const loginWithGoogle = useAuthStore((s) => s.loginWithGoogle)
  const isLoading = useAuthStore((s) => s.isLoading)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const res = await login(email, password)
    if (res.success) {
      toast({ title: t('login.welcomeBack'), description: t('login.signedIn'), duration: 3000 })
      navigate('/account')
    } else {
      setError(res.error || t('login.loginFailed'))
      toast({ title: t('login.loginFailed'), description: res.error, variant: 'destructive' })
    }
  }

  const handleGoogle = async () => {
    setError('')
    const res = await loginWithGoogle()
    if (res.success) {
      toast({ title: t('login.signedInGoogle'), duration: 3000 })
      navigate('/account')
    } else {
      setError(res.error || t('login.googleFailed'))
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3">
            <img
              src="/logos/Hurayra-uae-svg-logo.svg"
              alt="HurayraPetFood.ae"
              className="h-12 w-auto"
            />
          </Link>
          <h1 className="text-2xl font-causten font-bold text-gray-900 mt-6 mb-2">{t('login.title')}</h1>
          <p className="text-gray-600 text-sm">{t('login.subtitle')}</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <Button
            type="button"
            variant="outline"
            className="w-full h-12 mb-6 border-2"
            onClick={handleGoogle}
            disabled={isLoading}
          >
            <svg className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t('login.continueGoogle')}
          </Button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-2 text-gray-500">{t('login.orEmail')}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">{t('login.email')}</Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t('login.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 rtl:pl-4 rtl:pr-10 h-11"
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="password">{t('login.password')}</Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 rtl:left-auto rtl:right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder={t('login.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 rtl:pl-4 rtl:pr-10 h-11"
                  required
                />
              </div>
            </div>
            {error && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </div>
            )}
            <Button type="submit" className="w-full h-11 bg-primary hover:bg-primary/90" disabled={isLoading}>
              {isLoading ? t('login.submitting') : t('login.submit')}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            {t('login.noAccount')}{' '}
            <Link to="/signup" className="font-semibold text-primary hover:underline">
              {t('login.signUpLink')}
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          {t('login.demo')}
        </p>
      </div>
    </div>
  )
}
