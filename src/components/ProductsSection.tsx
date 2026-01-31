import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'

const ProductsSection = () => {
  return (
    <section className="py-20 bg-gray-50/80">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Premium halal cat food — Chicken and Tuna. Natural, trusted ingredients for your cat's health and happiness.
          </p>
          {/* <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link to="/products" className="inline-flex items-center gap-2">
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button> */}
        </div>

        {/* Products Grid - 2 products */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA to full products page */}
        <div className="text-center mt-12">
          <Button asChild className="bg-primary hover:bg-primary/90 text-white">
            <Link to="/products" className="inline-flex items-center gap-2">
              Browse All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProductsSection
