import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCircle, PawPrint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

type FaqItem = { question: string; answer: string }
type QuoteItem = { text: string; ref: string }
type CtaButton = { text: string; url: string }

export default function WhyHalal() {
  const { t } = useTranslation('whyHalal')
  const faq = t('faq', { returnObjects: true }) as FaqItem[]
  const quotes = t('islamSays.quotes', { returnObjects: true }) as QuoteItem[]
  const values = t('whyItMatters.values', { returnObjects: true }) as string[]
  const meatPoints = t('meatDerivatives.points', { returnObjects: true }) as string[]
  const choosingPoints = t('choosingHalal.points', { returnObjects: true }) as string[]
  const paragraphs = t('moreThanTradition.paragraphs', { returnObjects: true }) as string[]
  const ctaButtons = t('cta.buttons', { returnObjects: true }) as CtaButton[]

  const blockquoteBorder = 'border-l-4 border-primary rtl:border-l-0 rtl:border-r-4'
  const blockquoteBorderSecondary = 'border-l-4 border-secondary rtl:border-l-0 rtl:border-r-4'

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-causten font-bold mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/90 font-cairo">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* What is Halal */}
      <section className="py-16 bg-teal-light text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-causten font-bold mb-6">
              {t('whatIsHalal.title')}
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-start rtl:text-right">
              {t('whatIsHalal.body')}
            </p>
          </div>
        </div>
      </section>

      {/* Why It Matters for Muslims */}
      <section id="why-it-matters-for-muslims" className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="text-start rtl:text-right">
                <h2 className="text-3xl font-causten font-bold text-gray-800 mb-6">
                  {t('whyItMatters.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('whyItMatters.intro')}
                </p>
                <p className="font-semibold text-gray-800 mb-4">
                  {t('whyItMatters.subtitle')}
                </p>
                <div className="space-y-4">
                  {values.map((value, i) => (
                    <div
                      key={i}
                      className={`flex items-start gap-3 p-4 rounded-2xl rtl:flex-row-reverse ${
                        i === 0 ? 'bg-primary/20' : 'bg-accent/30'
                      }`}
                    >
                      <CheckCircle className="w-6 h-6 shrink-0 mt-0.5 text-primary" />
                      <span className="text-gray-800 font-medium">{value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-gray-700 leading-relaxed mt-6">
                  {t('whyItMatters.closing')}
                </p>
              </div>
              <div className="bg-primary/10 rounded-2xl aspect-[4/5] max-h-[500px] flex items-center justify-center">
                <PawPrint className="w-24 h-24 text-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meat Derivatives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div className="bg-gray-50 rounded-3xl p-8 md:p-10 text-start rtl:text-right">
                <h2 className="text-2xl md:text-3xl font-causten font-bold text-gray-800 mb-4">
                  {t('meatDerivatives.title')}
                </h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  {t('meatDerivatives.body')}
                </p>
                <p className="font-semibold text-gray-800 mb-4">
                  {t('meatDerivatives.perspective')}
                </p>
                <ul className="space-y-3">
                  {meatPoints.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 rtl:flex-row-reverse">
                      <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center text-accent shrink-0">
                        <CheckCircle className="w-4 h-4" />
                      </span>
                      <span className="text-gray-700">{point}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-700 leading-relaxed mt-6">
                  {t('meatDerivatives.closing')}
                </p>
              </div>
              <div className="bg-primary/5 rounded-2xl aspect-square max-h-[400px] flex items-center justify-center">
                <PawPrint className="w-20 h-20 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Islam Says - Quotes */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-causten font-bold text-gray-800 mb-4">
              {t('islamSays.title')}
            </h2>
            <p className="text-gray-700 text-start rtl:text-right">{t('islamSays.intro')}</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {quotes.map((q, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 md:p-8 border border-primary/10 text-start rtl:text-right"
              >
                <p className="text-gray-800 font-medium italic mb-2">"{q.text}"</p>
                <p className="text-sm text-gray-600">{q.ref}</p>
              </div>
            ))}
          </div>
          <p className="text-center rtl:text-right text-gray-700 mt-8 max-w-2xl mx-auto">
            {t('islamSays.closing')}
          </p>
        </div>
      </section>

      {/* Pork Haram, Qur'anic Approach, Prophet's Teaching - Quote cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm text-start rtl:text-right">
              <h2 className="text-2xl font-causten font-bold text-gray-800 mb-4">
                {t('porkHaram.title')}
              </h2>
              <p className="text-gray-700 mb-4">{t('porkHaram.body')}</p>
              <blockquote className={`bg-primary/10 rounded-xl p-6 my-4 ${blockquoteBorder}`}>
                <p className="text-gray-800 font-medium">"{t('porkHaram.quote')}"</p>
                <cite className="text-sm text-gray-600 not-italic">{t('porkHaram.ref')}</cite>
              </blockquote>
              <p className="text-gray-700">{t('porkHaram.closing')}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-secondary/20 text-start rtl:text-right">
              <h2 className="text-2xl font-causten font-bold text-gray-800 mb-4">
                {t('quranicApproach.title')}
              </h2>
              <p className="text-gray-700 mb-4">{t('quranicApproach.body')}</p>
              <blockquote className={`bg-secondary/10 rounded-xl p-6 my-4 ${blockquoteBorderSecondary}`}>
                <p className="text-gray-800 font-medium">"{t('quranicApproach.quote')}"</p>
                <cite className="text-sm text-gray-600 not-italic">{t('quranicApproach.ref')}</cite>
              </blockquote>
              <p className="text-gray-700">{t('quranicApproach.closing')}</p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm text-start rtl:text-right">
              <h2 className="text-2xl font-causten font-bold text-gray-800 mb-4">
                {t('prophetTeaching.title')}
              </h2>
              <p className="text-gray-700 mb-4">{t('prophetTeaching.body')}</p>
              <blockquote className={`bg-primary/10 rounded-xl p-6 my-4 ${blockquoteBorder}`}>
                <p className="text-gray-800 font-medium">"{t('prophetTeaching.quote')}"</p>
                <cite className="text-sm text-gray-600 not-italic">{t('prophetTeaching.ref')}</cite>
              </blockquote>
              <p className="text-gray-700">{t('prophetTeaching.closing')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Choosing Halal For Your Pet */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-start rtl:text-right">
                <h2 className="text-3xl font-causten font-bold mb-6">
                  {t('choosingHalal.title')}
                </h2>
                <p className="text-white/90 leading-relaxed mb-6">
                  {t('choosingHalal.body')}
                </p>
                <ul className="space-y-4">
                  {choosingPoints.map((point, i) => (
                    <li key={i} className="flex items-center gap-3 rtl:flex-row-reverse">
                      <span className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                        <CheckCircle className="w-5 h-5" />
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/10 rounded-2xl aspect-[4/3] flex items-center justify-center">
                <PawPrint className="w-24 h-24 text-white/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hear from Scholars */}
      <section id="hear-from-scholars" className="py-16 bg-[#60BABF] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-center justify-between">
            <div className="lg:max-w-md text-start rtl:text-right">
              <h2 className="text-3xl font-causten font-bold mb-4">
                {t('scholars.title')}
              </h2>
              <p className="text-white/90">
                {t('scholars.subtitle')}
              </p>
            </div>
            <div className="w-full max-w-xl aspect-video bg-black/20 rounded-2xl flex items-center justify-center">
              <p className="text-white/70 text-sm">{t('scholars.videoPlaceholder')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* More than Just a Tradition */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-causten font-bold text-gray-800 mb-8">
              {t('moreThanTradition.title')}
            </h2>
            <div className="prose prose-lg text-gray-700 text-left rtl:text-right max-w-none space-y-4">
              {paragraphs.map((p, i) => (
                <p key={i} className="leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-causten font-bold text-center text-gray-800 mb-10">
              {t('faqTitle')}
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {Array.isArray(faq) && faq.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left rtl:text-right font-semibold text-gray-800 hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-start rtl:text-right">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-10 items-center justify-between">
            <div className="text-start rtl:text-right">
              <h2 className="text-3xl md:text-4xl font-causten font-bold mb-2">
                {t('cta.title')}{' '}
                <span className="text-accent">{t('cta.titleHighlight')}</span>
              </h2>
              <p className="text-white/90">{t('cta.subtitle')}</p>
            </div>
            <div className="flex flex-wrap gap-4">
              {Array.isArray(ctaButtons) && ctaButtons.map((btn, i) => (
                <Button
                  key={i}
                  asChild
                  className="bg-accent hover:bg-accent/90 text-gray-900 font-semibold px-8 py-6 rounded-xl"
                >
                  <Link to={btn.url}>{btn.text}</Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
