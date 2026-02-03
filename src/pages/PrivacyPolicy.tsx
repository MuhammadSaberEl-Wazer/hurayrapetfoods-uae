import { Shield, Lock, Eye, Database, UserCheck, Mail } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-causten font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl text-white/90">
              Your privacy is important to us
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
                At HurayraPetFood.ae, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
              </p>

              {/* Information We Collect */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Database className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-causten font-bold m-0">Information We Collect</h2>
                </div>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Personal Information</h3>
                <p className="text-gray-700">When you place an order or register on our site, we may collect:</p>
                <ul className="text-gray-700 space-y-2">
                  <li>Name and contact information (email address, phone number)</li>
                  <li>Delivery address and billing information</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                  <li>Order history and preferences</li>
                </ul>

                <h3 className="text-xl font-bold mt-6 mb-3">Automatic Information</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent on our site</li>
                  <li>Referring website addresses</li>
                </ul>
              </div>

              {/* How We Use Information */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-causten font-bold m-0">How We Use Your Information</h2>
                </div>
                
                <p className="text-gray-700">We use the information we collect to:</p>
                <ul className="text-gray-700 space-y-2">
                  <li>Process and fulfill your orders</li>
                  <li>Send order confirmations and shipping updates</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Improve our website and services</li>
                  <li>Send promotional emails (with your consent)</li>
                  <li>Prevent fraudulent transactions</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              {/* Data Security */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-causten font-bold m-0">Data Security</h2>
                </div>
                
                <p className="text-gray-700">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-blue-800 m-0">
                    <strong>Note:</strong> We never store your complete credit card information on our servers. All payment processing is handled by secure, PCI-compliant payment providers.
                  </p>
                </div>
              </div>

              {/* Cookies */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Cookies and Tracking</h2>
                <p className="text-gray-700">
                  We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user behavior. You can control cookies through your browser settings.
                </p>
                
                <h3 className="text-xl font-bold mt-6 mb-3">Types of Cookies We Use:</h3>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Essential Cookies:</strong> Required for the website to function properly</li>
                  <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our site</li>
                  <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                  <li><strong>Marketing Cookies:</strong> Track your browsing to show relevant ads</li>
                </ul>
              </div>

              {/* Third-Party Disclosure */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Third-Party Disclosure</h2>
                <p className="text-gray-700">
                  We do not sell, trade, or transfer your personal information to third parties without your consent, except:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li>To trusted service providers who assist us in operating our website and conducting our business</li>
                  <li>To shipping companies for order delivery</li>
                  <li>To payment processors for transaction processing</li>
                  <li>When required by law or to protect our rights</li>
                </ul>
              </div>

              {/* Your Rights */}
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-causten font-bold m-0">Your Rights</h2>
                </div>
                
                <p className="text-gray-700">You have the right to:</p>
                <ul className="text-gray-700 space-y-2">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Request restriction of processing</li>
                  <li>Withdraw consent at any time</li>
                  <li>Opt-out of marketing communications</li>
                </ul>
              </div>

              {/* Children's Privacy */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Children's Privacy</h2>
                <p className="text-gray-700">
                  Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
                </p>
              </div>

              {/* Changes to Policy */}
              <div className="mb-10">
                <h2 className="text-2xl font-causten font-bold mb-4">Changes to This Policy</h2>
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.
                </p>
              </div>

              {/* Contact */}
              <div className="bg-primary/5 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-causten font-bold m-0">Contact Us</h2>
                </div>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <ul className="text-gray-700 space-y-2">
                  <li><strong>Email:</strong> privacy@hurayrapetfoods.ae</li>
                  <li><strong>Phone:</strong> +971 XX XXX XXXX</li>
                  <li><strong>Address:</strong> Dubai, United Arab Emirates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
