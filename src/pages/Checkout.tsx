import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useCartStore } from '@/store/cartStore'
import { EMIRATES } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ShoppingBag, CheckCircle } from 'lucide-react'

const checkoutSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(9, 'Phone number must be at least 9 digits'),
  emirate: z.string().min(1, 'Please select an emirate'),
  city: z.string().min(2, 'City is required'),
  address: z.string().min(10, 'Please provide a detailed address'),
  notes: z.string().optional(),
  paymentMethod: z.enum(['cod', 'online'], {
    required_error: 'Please select a payment method'
  })
})

type CheckoutFormData = z.infer<typeof checkoutSchema>

export default function Checkout() {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'cod'
    }
  })

  const totalPrice = getTotalPrice()
  const shippingCost = totalPrice >= 100 ? 0 : 20
  const finalTotal = totalPrice + shippingCost

  // Redirect if cart is empty
  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-causten font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Please add items to your cart before proceeding to checkout.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Success screen
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-12">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-4xl font-causten font-bold mb-4">Order Placed Successfully!</h1>
            <p className="text-xl text-gray-600 mb-2">Thank you for your order</p>
            <p className="text-gray-500 mb-8">
              We'll contact you shortly via WhatsApp to confirm your order and delivery details.
            </p>
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Total</p>
              <p className="text-3xl font-bold text-primary">AED {finalTotal.toFixed(2)}</p>
              <p className="text-sm text-gray-500 mt-2">Payment: Cash on Delivery</p>
            </div>
            <div className="space-y-3">
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/products">Continue Shopping</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Order Data:', {
      customer: data,
      items,
      totalPrice,
      shippingCost,
      finalTotal
    })

    // Clear cart and show success
    clearCart()
    setOrderPlaced(true)
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/cart">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl md:text-4xl font-causten font-bold">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order</p>
        </div>
      </div>

      {/* Checkout Form */}
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      {...register('fullName')}
                      placeholder="Ahmed Mohammed"
                      className={errors.fullName ? 'border-red-500' : ''}
                    />
                    {errors.fullName && (
                      <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register('email')}
                        placeholder="ahmed@example.com"
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone (WhatsApp) *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        {...register('phone')}
                        placeholder="+971 50 123 4567"
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Delivery Address</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emirate">Emirate *</Label>
                      <Select onValueChange={(value) => setValue('emirate', value)}>
                        <SelectTrigger className={errors.emirate ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select emirate" />
                        </SelectTrigger>
                        <SelectContent>
                          {EMIRATES.map((emirate) => (
                            <SelectItem key={emirate} value={emirate}>
                              {emirate}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.emirate && (
                        <p className="text-sm text-red-500 mt-1">{errors.emirate.message}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        {...register('city')}
                        placeholder="e.g., Dubai Marina"
                        className={errors.city ? 'border-red-500' : ''}
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500 mt-1">{errors.city.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Full Address *</Label>
                    <Textarea
                      id="address"
                      {...register('address')}
                      placeholder="Building name, street, area, landmarks..."
                      rows={3}
                      className={errors.address ? 'border-red-500' : ''}
                    />
                    {errors.address && (
                      <p className="text-sm text-red-500 mt-1">{errors.address.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      {...register('notes')}
                      placeholder="Any special instructions for delivery..."
                      rows={2}
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                <RadioGroup
                  defaultValue="cod"
                  onValueChange={(value) => setValue('paymentMethod', value as 'cod' | 'online')}
                >
                  <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex-1 cursor-pointer">
                      <div className="font-semibold">Cash on Delivery (COD)</div>
                      <p className="text-sm text-gray-500">Pay when you receive your order</p>
                    </Label>
                    <span className="text-green-600 font-semibold">Recommended</span>
                  </div>

                  <div className="flex items-center space-x-3 border rounded-lg p-4 opacity-50">
                    <RadioGroupItem value="online" id="online" disabled />
                    <Label htmlFor="online" className="flex-1">
                      <div className="font-semibold">Online Payment</div>
                      <p className="text-sm text-gray-500">Coming soon - Visa, Mastercard</p>
                    </Label>
                    <span className="text-gray-400 text-sm">Coming Soon</span>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 text-sm">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = 'https://placehold.co/100x100/008080/FFFFFF?text=Hurayra'
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium line-clamp-2">{item.product.name}</p>
                        <p className="text-gray-500">{item.selectedSize.size} × {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-primary">
                        AED {item.total.toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">AED {totalPrice.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="font-semibold text-green-600">FREE</span>
                    ) : (
                      <span className="font-semibold">AED {shippingCost.toFixed(2)}</span>
                    )}
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary text-2xl">AED {finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-white py-6 text-lg font-bold"
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
