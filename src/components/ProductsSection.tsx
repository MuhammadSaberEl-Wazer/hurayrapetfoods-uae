import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import { products } from '@/data/products'

const ProductsSection = () => {
  return (
    <section className="py-20 bg-gray-50/80">
      <div className="container mx-auto px-4">
        {/* Section Header — like "The Good Stuff We Offer" */}
        <div className="text-center mb-12">
          <h2 className="font-causten text-3xl md:text-4xl font-bold text-foreground mb-3">
            The Good Stuff We Offer
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Meals that they'll love to finish.
          </p>
        </div>

        {/* Products Grid — 3 per row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

        {/* Note — like reference footer text */}
        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          Hurayra Pet Foods produces Halal-certified dry cat food. We do not sell wet food or pouch products.
        </p>
      </div>
    </section>
  )
}

export default ProductsSection
