import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Database,
  Package,
  ShoppingCart,
  FileText,
  Mail,
  Settings,
  Globe,
  MessageSquare,
  BookOpen,
  Store,
  ChevronRight,
  Server,
  Key,
  Code2,
  Shield,
  Zap,
  FolderTree,
  ExternalLink,
  Info,
} from 'lucide-react'

export default function Dev() {
  const { t } = useTranslation('admin-dev')
  const [activeTab, setActiveTab] = useState('database')

  const dbProducts = t('database.products', { returnObjects: true }) as { label: string; title: string; desc: string; items: string[] }
  const dbOrders = t('database.orders', { returnObjects: true }) as { label: string; title: string; desc: string; items: string[] }
  const dbBlog = t('database.blog', { returnObjects: true }) as { label: string; title: string; desc: string; items: string[] }
  const dbContent = t('database.content', { returnObjects: true }) as { label: string; title: string; desc: string; items: string[] }
  const dbMessages = t('database.messages', { returnObjects: true }) as { label: string; title: string; desc: string }
  const dbNewsletter = t('database.newsletter', { returnObjects: true }) as { label: string; title: string; desc: string }
  const apiPublic = t('apiPublic', { returnObjects: true }) as { method: string; path: string; desc: string }[]
  const apiAdmin = t('apiAdmin', { returnObjects: true }) as { method: string; path: string; desc: string }[]
  const libraries = t('libraries', { returnObjects: true }) as { lib: string; use: string }[]
  const summaryItems = t('database.summaryItems', { returnObjects: true }) as string[]
  const recommendations = t('backend.recommendations', { returnObjects: true }) as string[]

  const roadmap = [
    { week: 1, titleKey: 'backend.week1', itemsKey: 'backend.week1Items' },
    { week: 2, titleKey: 'backend.week2', itemsKey: 'backend.week2Items' },
    { week: 3, titleKey: 'backend.week3', itemsKey: 'backend.week3Items' },
    { week: 4, titleKey: 'backend.week4', itemsKey: 'backend.week4Items' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur mb-4">
            <Code2 className="w-5 h-5" />
            <span className="font-semibold">{t('hero.badge')}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-causten font-bold mb-3">
            {t('hero.title')}
          </h1>
          <p className="text-base md:text-lg opacity-90 max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 h-14 bg-gray-100 p-1.5 rounded-xl">
            <TabsTrigger
              value="database"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md gap-2 text-base"
            >
              <Database className="w-5 h-5" />
              {t('tabs.database')}
            </TabsTrigger>
            <TabsTrigger
              value="backend"
              className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md gap-2 text-base"
            >
              <Code2 className="w-5 h-5" />
              {t('tabs.backend')}
            </TabsTrigger>
          </TabsList>

          {/* ═══ TAB: قاعدة البيانات ═══ */}
          <TabsContent value="database" className="mt-10 space-y-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-causten font-bold text-gray-900 mb-2">
                {t('database.introTitle')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('database.introDesc')}
              </p>
            </div>

            {/* Data Structure Cards */}
            <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
              <CardHeader className="bg-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-6 h-6 text-primary" />
                  {t('database.structureTitle')}
                </CardTitle>
                <CardDescription>{t('database.structureDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="relative rounded-xl border-2 border-teal-200 bg-teal-50/50 p-6">
                    <div className="absolute -top-3 end-4 px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                      {dbProducts.label}
                    </div>
                    <Package className="w-12 h-12 text-primary mb-4" />
                    <h3 className="font-bold text-lg mb-2">{dbProducts.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{dbProducts.desc}</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      {(dbProducts.items || []).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative rounded-xl border-2 border-amber-200 bg-amber-50/50 p-6">
                    <div className="absolute -top-3 end-4 px-3 py-1 bg-amber-600 text-white text-sm font-bold rounded-full">
                      {dbOrders.label}
                    </div>
                    <ShoppingCart className="w-12 h-12 text-amber-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{dbOrders.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{dbOrders.desc}</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      {(dbOrders.items || []).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative rounded-xl border-2 border-violet-200 bg-violet-50/50 p-6">
                    <div className="absolute -top-3 end-4 px-3 py-1 bg-violet-600 text-white text-sm font-bold rounded-full">
                      {dbBlog.label}
                    </div>
                    <BookOpen className="w-12 h-12 text-violet-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{dbBlog.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{dbBlog.desc}</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      {(dbBlog.items || []).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-6">
                    <div className="absolute -top-3 end-4 px-3 py-1 bg-emerald-600 text-white text-sm font-bold rounded-full">
                      {dbContent.label}
                    </div>
                    <FileText className="w-12 h-12 text-emerald-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{dbContent.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{dbContent.desc}</p>
                    <ul className="text-sm text-gray-500 space-y-1">
                      {(dbContent.items || []).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="relative rounded-xl border-2 border-blue-200 bg-blue-50/50 p-6">
                    <div className="absolute -top-3 end-4 px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full">
                      {dbMessages.label}
                    </div>
                    <MessageSquare className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{dbMessages.title}</h3>
                    <p className="text-gray-600 text-sm">{dbMessages.desc}</p>
                  </div>

                  <div className="relative rounded-xl border-2 border-rose-200 bg-rose-50/50 p-6">
                    <div className="absolute -top-3 end-4 px-3 py-1 bg-rose-600 text-white text-sm font-bold rounded-full">
                      {dbNewsletter.label}
                    </div>
                    <Mail className="w-12 h-12 text-rose-600 mb-4" />
                    <h3 className="font-bold text-lg mb-2">{dbNewsletter.title}</h3>
                    <p className="text-gray-600 text-sm">{dbNewsletter.desc}</p>
                  </div>
                </div>

                {/* Bilingual */}
                <div className="mt-10 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Globe className="w-8 h-8 text-primary shrink-0" />
                    <h4 className="font-bold text-lg">{t('database.bilingualTitle')}</h4>
                  </div>
                  <p className="text-gray-600">{t('database.bilingualDesc')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Table Details — More technical for clarity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  {t('database.tableDetailsTitle')}
                </CardTitle>
                <CardDescription>
                  {t('database.tableDetailsDesc')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg border bg-gray-50/50">
                  <h4 className="font-semibold text-primary mb-2">{t('database.tableProducts')}</h4>
                  <p className="text-sm text-gray-600">{t('database.tableProductsDetail')}</p>
                </div>
                <div className="p-4 rounded-lg border bg-gray-50/50">
                  <h4 className="font-semibold text-primary mb-2">{t('database.tableProductSizes')}</h4>
                  <p className="text-sm text-gray-600">{t('database.tableProductSizesDetail')}</p>
                </div>
                <div className="p-4 rounded-lg border bg-gray-50/50">
                  <h4 className="font-semibold text-primary mb-2">{t('database.tableOrders')}</h4>
                  <p className="text-sm text-gray-600">{t('database.tableOrdersDetail')}</p>
                </div>
                <div className="p-4 rounded-lg border bg-gray-50/50">
                  <h4 className="font-semibold text-primary mb-2">{t('database.tableOrderItems')}</h4>
                  <p className="text-sm text-gray-600">{t('database.tableOrderItemsDetail')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-6 h-6 text-primary" />
                  {t('database.settingsTitle')}
                </CardTitle>
                <CardDescription>{t('database.settingsDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                    <Store className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold">{t('database.settingsStore')}</p>
                      <p className="text-sm text-gray-600">{t('database.settingsStoreDetail')}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50">
                    <Zap className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold">{t('database.settingsShipping')}</p>
                      <p className="text-sm text-gray-600">{t('database.settingsShippingDetail')}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="border-primary/30 bg-primary/5">
              <CardContent className="pt-6">
                <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                  <ChevronRight className="w-5 h-5 text-primary" />
                  {t('database.summaryTitle')}
                </h4>
                <ul className="space-y-2 text-gray-700">
                  {summaryItems.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ═══ TAB: Backend API ═══ */}
          <TabsContent value="backend" className="mt-10 space-y-10">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-causten font-bold text-gray-900 mb-2">
                {t('backend.introTitle')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('backend.introDesc')}
              </p>
            </div>

            {/* Structure */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FolderTree className="w-6 h-6 text-primary" />
                  {t('backend.structureTitle')}
                </CardTitle>
                <CardDescription>{t('backend.structureDesc')}</CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-xl text-sm overflow-x-auto font-mono">
{`hurayrapetfoods-backend/
├── src/
│   ├── config/        # db, auth, upload
│   ├── controllers/   # products, orders, content, blog, contact, auth...
│   ├── middleware/    # auth, validation, errorHandler
│   ├── routes/        # api.routes, admin.routes
│   ├── services/      # order.service, notification.service
│   └── app.js
├── uploads/
├── .env
└── package.json`}
                </pre>
              </CardContent>
            </Card>

            {/* API Endpoints */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-6 h-6 text-primary" />
                  {t('backend.endpointsTitle')}
                </CardTitle>
                <CardDescription>{t('backend.endpointsDesc')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    {t('backend.publicLabel')}
                  </h4>
                  <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-end py-3 px-4 font-semibold">Method</th>
                          <th className="text-end py-3 px-4 font-semibold">Endpoint</th>
                          <th className="text-end py-3 px-4 font-semibold">{t('apiColumnDesc')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {apiPublic.map((row, i) => (
                          <tr key={i}>
                            <td className="py-2 px-4">{row.method}</td>
                            <td className="py-2 px-4 font-mono text-primary">{row.path}</td>
                            <td className="py-2 px-4">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                    <Key className="w-4 h-4" />
                    {t('backend.adminLabel')}
                  </h4>
                  <div className="overflow-x-auto rounded-lg border">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-end py-3 px-4 font-semibold">Method</th>
                          <th className="text-end py-3 px-4 font-semibold">Endpoint</th>
                          <th className="text-end py-3 px-4 font-semibold">{t('apiColumnDesc')}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {apiAdmin.map((row, i) => (
                          <tr key={i}>
                            <td className="py-2 px-4">{row.method}</td>
                            <td className="py-2 px-4 font-mono text-primary">{row.path}</td>
                            <td className="py-2 px-4">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Query params */}
                <div className="flex flex-wrap gap-4 p-4 rounded-lg bg-gray-50">
                  <code className="text-sm">{t('backend.pagination')}</code>
                  <code className="text-sm">{t('backend.filtering')}</code>
                  <code className="text-sm">{t('backend.sorting')}</code>
                </div>
              </CardContent>
            </Card>

            {/* Bilingual */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-6 h-6 text-primary" />
                  {t('backend.bilingualTitle')}
                </CardTitle>
                <CardDescription>{t('backend.bilingualExample')}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-gray-50 font-mono text-sm">
                  <span className="text-gray-500">GET</span> /api/products<span className="text-primary">?lang=ar</span>
                </div>
                <p className="text-gray-600">{t('backend.bilingualDesc')}</p>
              </CardContent>
            </Card>

            {/* Libraries */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-6 h-6 text-primary" />
                  {t('backend.librariesTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {libraries.map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="font-mono font-semibold">{item.lib}</span>
                      <span className="text-sm text-gray-500">{item.use}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Response Format */}
            <Card>
              <CardHeader>
                <CardTitle>{t('backend.responseTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{t('backend.responseSuccess')}</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`{
  "success": true,
  "data": { ... },
  "meta": { "page": 1, "total": 10 }
}`}
                  </pre>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 mb-2">{t('backend.responseError')}</p>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto font-mono">
{`{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [...]
  }
}`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Roadmap */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-primary" />
                  {t('backend.roadmapTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roadmap.map((phase) => {
                    const items = t(phase.itemsKey, { returnObjects: true }) as string[]
                    return (
                      <div key={phase.week} className="flex gap-4 p-4 rounded-lg border">
                        <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold shrink-0">
                          {phase.week}
                        </div>
                        <div>
                          <h4 className="font-bold">{t(phase.titleKey)}</h4>
                          <ul className="text-sm text-gray-600 mt-1 flex flex-wrap gap-2">
                            {(items || []).map((item, i) => (
                              <li key={i} className="bg-gray-100 px-2 py-0.5 rounded">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-primary/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  {t('backend.recommendationsTitle')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  {recommendations.map((item, i) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>

      <div className="max-w-6xl mx-auto px-4 pb-12 text-center text-sm text-gray-500">
        <p>{t('footer')}</p>
      </div>
    </div>
  )
}
