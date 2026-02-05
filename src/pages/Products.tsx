import { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/data/products'
import type { ProductType } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Filter } from 'lucide-react'

const SCROLL_OFFSET = 220

export default function Products() {
  const { t } = useTranslation('products')
  const [searchParams, setSearchParams] = useSearchParams()
  const location = useLocation()
  const typeParam = searchParams.get('type')
  const [filter, setFilter] = useState<'all' | ProductType>(() =>
    typeParam === 'chicken' || typeParam === 'tuna' || typeParam === 'combo' ? typeParam : 'all'
  )
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'name'>('featured')

  useEffect(() => {
    const t = searchParams.get('type')
    setFilter(t === 'chicken' || t === 'tuna' || t === 'combo' ? t : 'all')
    const shouldScroll = location.hash === '#top' || t === 'chicken' || t === 'tuna' || t === 'combo'
    if (shouldScroll) {
      window.scrollTo({ top: SCROLL_OFFSET, behavior: 'smooth' })
    }
  }, [searchParams, location.hash])

  const setFilterAndUrl = (value: 'all' | ProductType) => {
    setFilter(value)
    const next = new URLSearchParams(searchParams)
    if (value === 'all') next.delete('type')
    else next.set('type', value)
    setSearchParams(next, { replace: true })
  }

  // Filter products
  const filteredProducts = products.filter(p => 
    filter === 'all' ? true : p.type === filter
  )

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'name':
        return a.name.localeCompare(b.name)
      case 'featured':
      default:
        return b.featured ? 1 : -1
    }
  })

  return (
    <div id="top" className="min-h-screen bg-gray-50 scroll-mt-0">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-causten font-bold mb-4">
              {t('hero.title')}
            </h1>
            <p className="text-xl text-white/90 mb-2">
              {t('hero.subtitle')}
            </p>
            <p className="text-white/80">
              {t('hero.intro')}
            </p>
          </div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12 overflow-x-hidden">
        <div className="container mx-auto px-4 min-w-0">
          {/* Filter Bar */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8 min-w-0 overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Type Filters */}
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <Filter className="w-5 h-5 shrink-0 text-gray-500" />
                <span className="font-semibold text-gray-700 shrink-0">{t('filter')}</span>
                <div className="flex flex-wrap gap-2 min-w-0">
                  <Button
                    onClick={() => setFilterAndUrl('all')}
                    variant={filter === 'all' ? 'default' : 'outline'}
                    className={filter === 'all' ? 'bg-primary hover:bg-primary/90' : ''}
                  >
                    {t('filters.allProductsCount', { count: products.length })}
                  </Button>
                  <Button
                    onClick={() => setFilterAndUrl('chicken')}
                    variant={filter === 'chicken' ? 'default' : 'outline'}
                    className={filter === 'chicken' ? 'bg-primary hover:bg-primary/90' : ''}
                  >
                    🍗 {t('filters.chicken')}
                  </Button>
                  <Button
                    onClick={() => setFilterAndUrl('tuna')}
                    variant={filter === 'tuna' ? 'default' : 'outline'}
                    className={filter === 'tuna' ? 'bg-primary hover:bg-primary/90' : ''}
                  >
                    🐟 {t('filters.tuna')}
                  </Button>
                  <Button
                    onClick={() => setFilterAndUrl('combo')}
                    variant={filter === 'combo' ? 'default' : 'outline'}
                    className={filter === 'combo' ? 'bg-primary hover:bg-primary/90' : ''}
                  >
                    📦 {t('filters.combo')}
                  </Button>
                </div>
              </div>

              {/* Sort */}
              <div className="flex flex-wrap items-center gap-2 min-w-0">
                <span className="font-semibold text-gray-700 shrink-0">{t('sort')}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-low' | 'price-high' | 'name')}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="featured">{t('sortBy.featured')}</option>
                  <option value="name">{t('sortBy.name')}</option>
                  <option value="price-low">{t('sortBy.priceLow')}</option>
                  <option value="price-high">{t('sortBy.priceHigh')}</option>
                </select>
              </div>
            </div>
          </div>

          {/* Products Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {t('showing', { count: sortedProducts.length })}
            </p>
          </div>

          {/* Products Grid */}
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {sortedProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">{t('noProducts')}</p>
            </div>
          )}

          {/* Info Section */}
          <div className="mt-16 bg-white rounded-lg shadow-md p-8">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="font-causten font-bold text-lg mb-2">{t('info.halalTitle')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('info.halalDesc')}
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🚚</span>
                </div>
                <h3 className="font-causten font-bold text-lg mb-2">{t('info.deliveryTitle')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('info.deliveryDesc')}
                </p>
              </div>
              <div>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">💯</span>
                </div>
                <h3 className="font-causten font-bold text-lg mb-2">{t('info.qualityTitle')}</h3>
                <p className="text-gray-600 text-sm">
                  {t('info.qualityDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
