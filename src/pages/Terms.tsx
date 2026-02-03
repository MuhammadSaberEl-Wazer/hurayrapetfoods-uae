import { FileText, CheckCircle, AlertCircle, Scale } from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <FileText className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-causten font-bold mb-4">
              Terms & Conditions
            </h1>
            <p className="text-xl text-white/90">
              Please read these terms carefully before using our service
            </p>
            <p className="text-sm text-white/70 mt-4">
              Last updated: January 28, 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-8">
                Welcome to HurayraPetFood.ae. These Terms and Conditions govern your use of our website and the purchase of products from us. By accessing our website and placing an order, you agree to be bound by these terms.
              </p>

              {/* General Terms */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-causten font-bold m-0">General Terms</h2>
                </div>
                
                <ul className="text-gray-700 space-y-3">
                  <li>You must be at least 18 years old to use our website and make purchases</li>
                  <li>You are responsible for maintaining the confidentiality of your account information</li>
                  <li>You agree to provide accurate and complete information when placing orders</li>
                  <li>We reserve the right to refuse service to anyone for any reason</li>
                  <li>We may modify these terms at any time; continued use constitutes acceptance</li>
                </ul>
              </div>

              {/* Products and Pricing */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Products and Pricing</h2>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Product Information</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>We strive to display product information accurately</li>
                  <li>Colors and images may vary slightly from actual products</li>
                  <li>All products are 100% Halal certified</li>
                  <li>Product availability is subject to change without notice</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">Pricing</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>All prices are in UAE Dirhams (AED)</li>
                  <li>Prices are subject to change without notice</li>
                  <li>The price charged will be the price displayed at the time of order placement</li>
                  <li>We reserve the right to correct pricing errors</li>
                </ul>
              </div>

              {/* Orders and Payment */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-causten font-bold m-0">Orders and Payment</h2>
                </div>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Order Process</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>Placing an order constitutes an offer to purchase</li>
                  <li>We reserve the right to accept or decline any order</li>
                  <li>Order confirmation will be sent via email/WhatsApp</li>
                  <li>Orders are subject to product availability</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">Payment Methods</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Cash on Delivery (COD):</strong> Available for all orders within UAE</li>
                  <li><strong>Online Payment:</strong> Coming soon - Credit/Debit cards</li>
                  <li>Payment is due upon delivery for COD orders</li>
                  <li>All transactions are secure and encrypted</li>
                </ul>
              </div>

              {/* Delivery */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Delivery</h2>
                
                <ul className="text-gray-700 space-y-3">
                  <li>We deliver to all seven Emirates in the UAE</li>
                  <li>Free delivery on orders over AED 100</li>
                  <li>Delivery fee of AED 20 applies to orders under AED 100</li>
                  <li>Standard delivery takes 1-3 business days</li>
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Someone must be present to receive the delivery</li>
                  <li>We will contact you via WhatsApp before delivery</li>
                </ul>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-yellow-800 m-0">
                    <strong>Important:</strong> Please ensure your delivery address and contact information are correct. We are not responsible for delays or non-delivery due to incorrect information.
                  </p>
                </div>
              </div>

              {/* Returns and Refunds */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Returns and Refunds</h2>
                
                <h3 className="text-xl font-bold mt-6 mb-3">30-Day Money-Back Guarantee</h3>
                <p className="text-gray-700">
                  We offer a 30-day money-back guarantee if your cat doesn't love our food. To be eligible for a return:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>The bag must be at least 50% full</li>
                  <li>Original packaging must be intact</li>
                  <li>Contact us within 30 days of purchase</li>
                  <li>Provide proof of purchase</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">Damaged or Defective Products</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>Report damaged items within 48 hours of delivery</li>
                  <li>Provide photos of the damage</li>
                  <li>We will arrange a replacement or full refund</li>
                  <li>Return shipping is free for damaged/defective items</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">Refund Process</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>Refunds will be processed within 7-10 business days</li>
                  <li>Refunds will be issued to the original payment method</li>
                  <li>For COD orders, refunds will be via bank transfer</li>
                </ul>
              </div>

              {/* Product Safety */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-causten font-bold m-0">Product Safety & Use</h2>
                </div>
                
                <ul className="text-gray-700 space-y-3">
                  <li>Our products are intended for cats only</li>
                  <li>Always check the expiration date before feeding</li>
                  <li>Store in a cool, dry place away from direct sunlight</li>
                  <li>Keep out of reach of children</li>
                  <li>Consult your veterinarian before changing your cat's diet</li>
                  <li>Follow feeding guidelines on the packaging</li>
                  <li>Always provide fresh water</li>
                </ul>
              </div>

              {/* Limitation of Liability */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Limitation of Liability</h2>
                <p className="text-gray-700">
                  To the maximum extent permitted by law, HurayraPetFood.ae shall not be liable for:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>Any indirect, incidental, or consequential damages</li>
                  <li>Loss of profits or data</li>
                  <li>Interruption of business</li>
                  <li>Errors or omissions in product information</li>
                  <li>Issues arising from improper use or storage of products</li>
                </ul>
              </div>

              {/* Intellectual Property */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Intellectual Property</h2>
                <ul className="text-gray-700 space-y-2">
                  <li>All content on this website is owned by HurayraPetFood.ae</li>
                  <li>You may not reproduce, distribute, or use our content without permission</li>
                  <li>Trademarks and logos are protected</li>
                  <li>Product images and descriptions are copyrighted</li>
                </ul>
              </div>

              {/* Governing Law */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Governing Law</h2>
                <p className="text-gray-700">
                  These Terms and Conditions are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-primary/5 rounded-xl p-6">
                <h2 className="text-2xl font-causten font-bold mb-4">Questions?</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms and Conditions, please contact us:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Email:</strong> info@hurayrapetfoods.ae</li>
                  <li><strong>Phone:</strong> +971 XX XXX XXXX</li>
                  <li><strong>WhatsApp:</strong> +971 XX XXX XXXX</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
