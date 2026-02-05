import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { CheckCircle, Heart, Award, Shield, Sprout, Lightbulb } from 'lucide-react'

const iconMap: Record<string, React.ElementType> = {
  'Shield': Shield,
  'Award': Award,
  'Heart': Heart,
  'Users': Heart,
  'Leaf': Sprout,
  'Zap': Lightbulb
}

export default function About() {
  const { t } = useTranslation('about')
  const storyContent = t('story.content', { returnObjects: true }) as string[]
  const values = t('values', { returnObjects: true }) as { icon: string; title: string; description: string }[]
  const whyChooseUs = t('whyChooseUs', { returnObjects: true }) as { title: string; description: string }[]
  const certifications = t('certifications', { returnObjects: true }) as { name: string; authority: string }[]

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-sans font-bold mb-4">
              {t('hero.title')}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-sans font-bold mb-8 text-center">{t('story.title')}</h2>
            <div className="prose prose-lg max-w-none space-y-6 text-start rtl:text-right">
              {storyContent.map((para, idx) => (
                <p key={idx} className="text-gray-700 leading-relaxed">{para}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-8 text-start rtl:text-right">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-sans font-bold mb-4">{t('mission.title')}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{t('mission.description')}</p>
            </div>
            <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 rounded-2xl p-8 text-start rtl:text-right">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-sans font-bold mb-4">{t('vision.title')}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{t('vision.description')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-sans font-bold mb-12 text-center">{t('coreValuesTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {values.map((value, idx) => {
              const Icon = iconMap[value.icon] || CheckCircle
              return (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow text-start rtl:text-right">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-sans font-bold mb-12 text-center">{t('whyChooseUsTitle')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChooseUs.map((reason, idx) => (
              <div key={idx} className="text-center rtl:text-right">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-accent" />
                </div>
                <h4 className="font-bold mb-2">{reason.title}</h4>
                <p className="text-sm text-gray-600">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-causten font-bold mb-12 text-center">{t('certificationsTitle')}</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-xl transition-shadow text-start rtl:text-right">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-700">{cert.authority}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-causten font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-xl mb-8 text-white/90">{t('cta.subtitle')}</p>
          <Link
            to="/products"
            className="inline-block bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            {t('cta.button')}
          </Link>
        </div>
      </section>
    </div>
  )
}
