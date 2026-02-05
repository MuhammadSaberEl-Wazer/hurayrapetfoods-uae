import { useState, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useTranslation } from 'react-i18next'
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useToast } from '@/hooks/use-toast'
import contactData from '@/data/contact.json'

type ContactFormData = {
  name: string
  email: string
  phone: string
  subject: string
  message: string
}

export default function Contact() {
  const { t } = useTranslation('contact')
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const contactSchema = useMemo(() => z.object({
    name: z.string().min(3, t('form.nameMin')),
    email: z.string().email(t('form.emailInvalid')),
    phone: z.string().min(9, t('form.phoneMin')),
    subject: z.string().min(1, t('form.subjectRequired')),
    message: z.string().min(10, t('form.messageMin'))
  }), [t])

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    toast({
      title: t('toast.success'),
      description: t('toast.successDesc'),
      duration: 5000
    })
    reset()
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-causten font-bold mb-4">
              {t('hero.title')}
            </h1>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            {/* Contact Information */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-xl shadow-md p-6 text-start rtl:text-right">
                <h2 className="text-2xl font-causten font-bold mb-6">{t('contactInfoTitle')}</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4 rtl:flex-row-reverse">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('email')}</h3>
                      <a href={`mailto:${contactData.contactInfo.email.value}`} className="text-primary hover:underline">
                        {contactData.contactInfo.email.value}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4 rtl:flex-row-reverse">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('phone')}</h3>
                      <a href={`tel:${contactData.contactInfo.phone.value}`} className="text-primary hover:underline">
                        {contactData.contactInfo.phone.value}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-4 rtl:flex-row-reverse">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('whatsapp')}</h3>
                      <a 
                        href={`https://wa.me/${contactData.contactInfo.whatsapp.value.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 hover:underline"
                      >
                        {contactData.contactInfo.whatsapp.value}
                      </a>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-4 rtl:flex-row-reverse">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{t('address')}</h3>
                      <p className="text-gray-600">{contactData.contactInfo.address.value}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-xl shadow-md p-6 text-start rtl:text-right">
                <h3 className="font-bold mb-4">{t('followUs')}</h3>
                <div className="flex gap-3">
                  {contactData.socialMedia.platforms.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
                      aria-label={social.name}
                    >
                      <span className="text-sm font-bold">
                        {social.name.charAt(0)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md p-8 text-start rtl:text-right">
                <h2 className="text-2xl font-causten font-bold mb-6">{t('formTitle')}</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name">{t('form.nameLabel')}</Label>
                      <Input
                        id="name"
                        {...register('name')}
                        placeholder={t('form.namePlaceholder')}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">{t('form.emailLabel')}</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder={t('form.emailPlaceholder')}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="phone">{t('form.phoneLabel')}</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder={t('form.phonePlaceholder')}
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="subject">{t('form.subjectLabel')}</Label>
                      <Select onValueChange={(value) => setValue('subject', value)}>
                        <SelectTrigger className={errors.subject ? 'border-red-500' : ''}>
                          <SelectValue placeholder={t('form.subjectPlaceholder')} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">{t('subjectOptions.general')}</SelectItem>
                          <SelectItem value="order">{t('subjectOptions.order')}</SelectItem>
                          <SelectItem value="product">{t('subjectOptions.product')}</SelectItem>
                          <SelectItem value="feedback">{t('subjectOptions.feedback')}</SelectItem>
                          <SelectItem value="other">{t('subjectOptions.other')}</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.subject && (
                        <p className="text-sm text-red-500 mt-1">{errors.subject.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message">{t('form.messageLabel')}</Label>
                    <Textarea
                      id="message"
                      {...register('message')}
                      placeholder={t('form.messagePlaceholder')}
                      rows={6}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500 mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 py-6"
                  >
                    <Send className="w-5 h-5 mr-2 rtl:ml-2 rtl:mr-0" />
                    {isSubmitting ? t('form.sending') : t('form.submit')}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
