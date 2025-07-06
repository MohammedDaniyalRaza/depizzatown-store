import React from 'react'
import { Shield, Lock, Eye, Users } from 'lucide-react'

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight">
            Privacy <span className="text-red-600">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mt-4"></div>
        </div>

        {/* Last Updated */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Last Updated</h2>
          </div>
          <p className="text-gray-600">This Privacy Policy was last updated on July 6, 2024.</p>
        </div>

        {/* Information We Collect */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Eye className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
              <p className="text-gray-600 mb-3">We collect information you provide directly to us, such as:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Name and contact information (email, phone number)</li>
                <li>Delivery address and location data</li>
                <li>Payment information (processed securely through our payment partners)</li>
                <li>Order history and preferences</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
              <p className="text-gray-600 mb-3">When you visit our website, we automatically collect:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Device information (IP address, browser type, operating system)</li>
                <li>Usage data (pages visited, time spent, links clicked)</li>
                <li>Location data (if you enable location services)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Use Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Process and fulfill your orders</li>
              <li>Communicate with you about your orders and account</li>
              <li>Send you promotional offers and updates (with your consent)</li>
              <li>Improve our services and website functionality</li>
              <li>Provide customer support and resolve issues</li>
              <li>Ensure the security and integrity of our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">We Do Not Sell Your Information</h3>
              <p className="text-gray-600">
                We do not sell, trade, or rent your personal information to third parties for marketing purposes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Providers</h3>
              <p className="text-gray-600 mb-3">We may share your information with trusted service providers who help us:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Process payments securely</li>
                <li>Deliver orders to your location</li>
                <li>Send communications and marketing materials</li>
                <li>Analyze website usage and improve our services</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Legal Requirements</h3>
              <p className="text-gray-600">
                We may disclose your information if required by law, court order, or government regulation, or to protect our rights, property, or safety.
              </p>
            </div>
          </div>
        </div>

        {/* Data Security */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">We implement appropriate security measures to protect your information:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Encryption of sensitive data during transmission</li>
              <li>Secure storage of personal information</li>
              <li>Regular security assessments and updates</li>
              <li>Limited access to personal information on a need-to-know basis</li>
              <li>Secure payment processing through trusted partners</li>
            </ul>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights</h2>
          
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Access and review your personal information</li>
              <li>Update or correct inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent for data processing</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cookies and Tracking</h2>
          
          <div className="space-y-4">
            <p className="text-gray-600 mb-4">We use cookies and similar technologies to:</p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li>Remember your preferences and settings</li>
              <li>Analyze website traffic and usage patterns</li>
              <li>Improve website functionality and user experience</li>
              <li>Provide personalized content and recommendations</li>
            </ul>
            
            <p className="text-gray-600 mt-4">
              You can control cookie settings through your browser preferences. However, disabling certain cookies may affect website functionality.
            </p>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Children's Privacy</h2>
          
          <p className="text-gray-600">
            Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
          </p>
        </div>

        {/* Changes to Policy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to This Policy</h2>
          
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Email:</strong> privacy@depizzatown.com
              </p>
              <p className="text-gray-600">
                <strong>Phone:</strong> +92 300 123 4567
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> North Nazimabad, Karachi, Pakistan
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage 