import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { products } from '@/data/products'
import AddProductModal from '@/components/admin/AddProductModal'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Edit, 
  Trash2, 
  Plus, 
  Search,
  Package
} from 'lucide-react'

export default function AdminProducts() {
  const { t } = useTranslation('admin-products')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="p-8">
      {/* Add Product Modal */}
      <AddProductModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-causten font-bold text-gray-900 mb-2">{t('title')}</h1>
        <p className="text-gray-600 mb-4">{t('subtitle')}</p>
        <Button
          size="lg"
          className="w-full sm:w-auto min-w-[200px] bg-primary hover:bg-primary/90 text-base px-6 py-6 sm:py-5"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          {t('addProduct')}
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t('tableProduct')}</TableHead>
              <TableHead>{t('tableType')}</TableHead>
              <TableHead>{t('tablePrice')}</TableHead>
              <TableHead>{t('tableSizes')}</TableHead>
              <TableHead>{t('tableStock')}</TableHead>
              <TableHead>{t('tableFeatured')}</TableHead>
              <TableHead className="text-right">{t('tableActions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center overflow-hidden">
                      {product.images[0] ? (
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {product.type}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium">
                  AED {product.price}
                </TableCell>
                <TableCell>
                  <span className="text-sm text-gray-600">{t('sizesCount', { count: product.sizes.length })}</span>
                </TableCell>
                <TableCell>
                  {product.inStock ? (
                    <Badge className="bg-green-100 text-green-800">{t('inStock')}</Badge>
                  ) : (
                    <Badge className="bg-red-100 text-red-800">{t('outOfStock')}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {product.featured ? (
                    <Badge className="bg-accent/20 text-accent">{t('featured')}</Badge>
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-700">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">{t('noProducts')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
