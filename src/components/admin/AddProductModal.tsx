import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/hooks/use-toast'
import { X, Plus } from 'lucide-react'

interface AddProductModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface ProductSize {
  size: string
  price: number
  sku: string
  inStock: boolean
}

export default function AddProductModal({ open, onOpenChange }: AddProductModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    nameAr: '',
    type: 'chicken',
    description: '',
    descriptionAr: '',
    price: 25,
    compareAtPrice: 30,
    featured: false,
    inStock: true
  })

  const [sizes, setSizes] = useState<ProductSize[]>([
    { size: '400g', price: 25, sku: 'HRP-NEW-400', inStock: true }
  ])

  const [features, setFeatures] = useState<string[]>([
    '100% Halal Certified',
    'High Protein Content',
    'Grain-Free Formula'
  ])

  const addSize = () => {
    setSizes([...sizes, { size: '1kg', price: 55, sku: 'HRP-NEW-1K', inStock: true }])
  }

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index))
  }

  const addFeature = () => {
    setFeatures([...features, ''])
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    toast({
      title: "Product Added!",
      description: `${formData.name} has been added successfully.`,
      duration: 3000
    })

    setIsLoading(false)
    onOpenChange(false)
    
    // Reset form
    setFormData({
      name: '',
      nameAr: '',
      type: '',
      description: '',
      descriptionAr: '',
      price: 25,
      compareAtPrice: 30,
      featured: false,
      inStock: true
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Fill in the details to add a new product to your catalog
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Product Name (English) *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Premium Halal Cat Food"
                  required
                />
              </div>
              <div>
                <Label htmlFor="nameAr" className="font-cairo">Product Name (Arabic)</Label>
                <Input
                  id="nameAr"
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder="طعام قطط حلال فاخر"
                  className="font-cairo"
                  dir="rtl"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="type">Product Type (Food Type) *</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value.trim() })}
                placeholder="e.g. chicken, tuna, combo, lamb, goat, plant-based, supplements"
                required
              />
              <p className="text-xs text-muted-foreground mt-1">
                Enter any food type: chicken, tuna, combo, lamb, goat meat, plant-based, supplements, etc.
              </p>
            </div>

            <div>
              <Label htmlFor="description">Description (English)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed product description..."
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="descriptionAr" className="font-cairo">Description (Arabic)</Label>
              <Textarea
                id="descriptionAr"
                value={formData.descriptionAr}
                onChange={(e) => setFormData({ ...formData, descriptionAr: e.target.value })}
                placeholder="وصف تفصيلي للمنتج..."
                className="font-cairo"
                dir="rtl"
                rows={3}
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Pricing</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Base Price (AED) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <Label htmlFor="compareAtPrice">Compare at Price (AED)</Label>
                <Input
                  id="compareAtPrice"
                  type="number"
                  value={formData.compareAtPrice}
                  onChange={(e) => setFormData({ ...formData, compareAtPrice: Number(e.target.value) })}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Product Sizes</h3>
              <Button type="button" variant="outline" size="sm" onClick={addSize}>
                <Plus className="w-4 h-4 mr-1" />
                Add Size
              </Button>
            </div>
            
            {sizes.map((size, index) => (
              <div key={index} className="grid grid-cols-4 gap-3 items-end p-3 bg-gray-50 rounded-lg">
                <div>
                  <Label>Size</Label>
                  <Input
                    value={size.size}
                    onChange={(e) => {
                      const newSizes = [...sizes]
                      newSizes[index].size = e.target.value
                      setSizes(newSizes)
                    }}
                    placeholder="1kg"
                  />
                </div>
                <div>
                  <Label>Price (AED)</Label>
                  <Input
                    type="number"
                    value={size.price}
                    onChange={(e) => {
                      const newSizes = [...sizes]
                      newSizes[index].price = Number(e.target.value)
                      setSizes(newSizes)
                    }}
                    min="0"
                  />
                </div>
                <div>
                  <Label>SKU</Label>
                  <Input
                    value={size.sku}
                    onChange={(e) => {
                      const newSizes = [...sizes]
                      newSizes[index].sku = e.target.value
                      setSizes(newSizes)
                    }}
                    placeholder="HRP-CHK-1K"
                  />
                </div>
                <div className="flex gap-2">
                  <Switch
                    checked={size.inStock}
                    onCheckedChange={(checked) => {
                      const newSizes = [...sizes]
                      newSizes[index].inStock = checked
                      setSizes(newSizes)
                    }}
                  />
                  {sizes.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeSize(index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-900">Product Features</h3>
              <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-1" />
                Add Feature
              </Button>
            </div>
            
            {features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Enter product feature..."
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900">Settings</h3>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Featured Product</p>
                <p className="text-sm text-gray-500">Show on homepage</p>
              </div>
              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
              />
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">In Stock</p>
                <p className="text-sm text-gray-500">Product availability</p>
              </div>
              <Switch
                checked={formData.inStock}
                onCheckedChange={(checked) => setFormData({ ...formData, inStock: checked })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-primary hover:bg-primary/90">
              {isLoading ? 'Adding...' : 'Add Product'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
