import { Truck, MapPin, Clock, Package, CheckCircle, Phone } from 'lucide-react'
import { EMIRATES } from '@/lib/constants'

export default function Shipping() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Truck className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-causten font-bold mb-4">
              Shipping & Delivery
            </h1>
            <p className="text-xl text-white/90">
              Fast, reliable delivery across all UAE Emirates
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Free Shipping Banner */}
            <div className="bg-green-50 border-2 border-green-500 rounded-xl p-6 mb-12 text-center">
              <div className="flex items-center justify-center gap-3 mb-3">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-causten font-bold text-green-800 m-0">
                  FREE Shipping on Orders Over AED 100
                </h2>
              </div>
              <p className="text-green-700 text-lg">
                Enjoy free delivery across all UAE when you spend AED 100 or more
              </p>
            </div>

            {/* Delivery Areas */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-causten font-bold m-0">Delivery Areas</h2>
              </div>
              
              <p className="text-gray-700 mb-6">
                We deliver to all seven Emirates in the United Arab Emirates:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {EMIRATES.map((emirate, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-gray-50 rounded-lg p-4">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-gray-800">{emirate}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Costs */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-causten font-bold m-0">Shipping Costs</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">Orders AED 100 and above</span>
                    <span className="text-2xl font-bold text-green-600">FREE</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Enjoy complimentary shipping on all qualifying orders
                  </p>
                </div>

                <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-lg">Orders below AED 100</span>
                    <span className="text-2xl font-bold text-primary">AED 20</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Standard flat rate shipping fee applies
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-blue-800 m-0">
                  <strong>Tip:</strong> Stock up and save on shipping! Add items to reach AED 100 for free delivery.
                </p>
              </div>
            </div>

            {/* Delivery Time */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-causten font-bold m-0">Delivery Time</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Standard Delivery</h3>
                    <p className="text-gray-700">1-3 business days from order confirmation</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Order Processing</h3>
                    <p className="text-gray-700">Orders placed before 2 PM are processed same day</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Weekend Orders</h3>
                    <p className="text-gray-700">Orders placed on Friday/Saturday will be processed on Sunday</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <p className="text-sm text-yellow-800 m-0">
                  <strong>Note:</strong> Delivery times are estimates and may vary during peak seasons or holidays.
                </p>
              </div>
            </div>

            {/* Delivery Process */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-causten font-bold mb-6">How Delivery Works</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">1</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Order Confirmation</h3>
                    <p className="text-gray-700">
                      You'll receive an order confirmation via email/WhatsApp immediately after placing your order
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">2</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Order Processing</h3>
                    <p className="text-gray-700">
                      Our team prepares and packages your order with care
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">3</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Out for Delivery</h3>
                    <p className="text-gray-700">
                      We'll contact you via WhatsApp before delivery to ensure you're available
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">4</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Delivery Complete</h3>
                    <p className="text-gray-700">
                      Receive your order and pay (if COD). Someone must be present to accept delivery
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-causten font-bold mb-6">Important Information</h2>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Please ensure your delivery address and contact number are correct
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Someone must be present to receive the delivery
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    We deliver during business hours (9 AM - 6 PM, Sunday to Thursday)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    If you're unavailable, we'll reschedule delivery (additional charges may apply)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Inspect your order upon delivery and report any issues immediately
                  </span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-primary/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-causten font-bold m-0">Need Help?</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Have questions about your delivery? Contact us:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li><strong>WhatsApp:</strong> +971 XX XXX XXXX (Fastest response)</li>
                <li><strong>Email:</strong> delivery@hurayrapetfoods.ae</li>
                <li><strong>Phone:</strong> +971 XX XXX XXXX</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
