import { RotateCcw, Heart, CheckCircle, AlertCircle, Mail, Clock } from 'lucide-react'

export default function Returns() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <RotateCcw className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-causten font-bold mb-4">
              Returns & Refunds
            </h1>
            <p className="text-xl text-white/90">
              30-Day Money-Back Guarantee - Your cat's happiness is our priority
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Money-Back Guarantee */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-500 rounded-xl p-8 mb-12">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-causten font-bold text-green-800 m-0">
                    30-Day Money-Back Guarantee
                  </h2>
                  <p className="text-green-700 text-lg mt-1">
                    If your cat doesn't love it, we'll refund you - no questions asked!
                  </p>
                </div>
              </div>
              <p className="text-green-800">
                We're so confident in the quality of our products that we offer a full refund if your cat doesn't enjoy our food within 30 days of purchase.
              </p>
            </div>

            {/* Return Policy */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-causten font-bold mb-6">Return Policy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    Eligibility Requirements
                  </h3>
                  <ul className="space-y-2 ml-8">
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Product must be returned within 30 days of purchase</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Bag must be at least 50% full (to ensure it was genuinely tried)</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Original packaging must be intact and sealed</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Proof of purchase (receipt or order confirmation) required</span>
                    </li>
                    <li className="text-gray-700 flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>Product must not be expired</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-blue-800 font-semibold mb-1">
                        Why do we require the bag to be 50% full?
                      </p>
                      <p className="text-sm text-blue-700">
                        We want to ensure your cat has actually tried the food. This policy protects both us and helps us maintain our quality standards while still offering you peace of mind.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* How to Return */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-causten font-bold mb-6">How to Return a Product</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Contact Us</h3>
                    <p className="text-gray-700">
                      Email us at <a href="mailto:returns@hurayrapetfoods.ae" className="text-primary hover:underline">returns@hurayrapetfoods.ae</a> or WhatsApp us at +971 XX XXX XXXX
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Include your order number and reason for return
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Get Return Authorization</h3>
                    <p className="text-gray-700">
                      Our team will review your request and provide a Return Authorization (RA) number
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Usually processed within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Pack the Product</h3>
                    <p className="text-gray-700">
                      Securely pack the product in its original packaging with the RA number clearly visible
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Include your order details inside the package
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Ship or Schedule Pickup</h3>
                    <p className="text-gray-700">
                      We'll arrange a free pickup from your address in UAE, or you can ship it to us
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Return shipping is FREE for all returns
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                      5
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Receive Your Refund</h3>
                    <p className="text-gray-700">
                      Once we receive and inspect the product, your refund will be processed within 7-10 business days
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Damaged or Defective */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-causten font-bold m-0">Damaged or Defective Products</h2>
              </div>
              
              <p className="text-gray-700 mb-4">
                If you receive a damaged, defective, or incorrect product:
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Contact us within 48 hours of delivery
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Provide photos of the damaged/defective item and packaging
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    We'll arrange immediate replacement or full refund
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Return pickup is FREE for damaged/defective items
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">
                    Priority processing - usually resolved within 24-48 hours
                  </span>
                </li>
              </ul>
            </div>

            {/* Refund Process */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-causten font-bold m-0">Refund Process</h2>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
                  <h3 className="font-bold mb-2">Processing Time</h3>
                  <p className="text-gray-700 text-sm">
                    Refunds are processed within 7-10 business days after we receive and inspect the returned product
                  </p>
                </div>

                <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
                  <h3 className="font-bold mb-2">Refund Method</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    Refunds will be issued to the original payment method:
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1 ml-4">
                    <li>• Cash on Delivery (COD): Bank transfer to your account</li>
                    <li>• Credit/Debit Card: Credited back to your card</li>
                    <li>• Online Payment: Refunded to your payment account</li>
                  </ul>
                </div>

                <div className="border-l-4 border-primary bg-primary/5 p-4 rounded-r-lg">
                  <h3 className="font-bold mb-2">Refund Confirmation</h3>
                  <p className="text-gray-700 text-sm">
                    You'll receive an email confirmation once your refund has been processed
                  </p>
                </div>
              </div>
            </div>

            {/* Non-Returnable Items */}
            <div className="bg-white rounded-xl shadow-md p-8 mb-8">
              <h2 className="text-2xl font-causten font-bold mb-6">Non-Returnable Items</h2>
              
              <p className="text-gray-700 mb-4">
                The following items cannot be returned or refunded:
              </p>
              
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">Products with less than 50% remaining</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">Products without original packaging</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">Products returned after 30 days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">Products without proof of purchase</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-500 mt-1">✗</span>
                  <span className="text-gray-700">Expired products (unless defective upon receipt)</span>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div className="bg-primary/5 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-causten font-bold m-0">Need Help with a Return?</h2>
              </div>
              <p className="text-gray-700 mb-4">
                Our customer service team is here to help:
              </p>
              <ul className="text-gray-700 space-y-2">
                <li><strong>Email:</strong> returns@hurayrapetfoods.ae</li>
                <li><strong>WhatsApp:</strong> +971 XX XXX XXXX (Fastest response)</li>
                <li><strong>Phone:</strong> +971 XX XXX XXXX</li>
                <li><strong>Hours:</strong> Sunday - Thursday, 9 AM - 6 PM</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
