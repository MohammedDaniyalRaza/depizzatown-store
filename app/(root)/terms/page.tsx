import React from 'react'
import { FileText, Shield, AlertTriangle } from 'lucide-react'

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight">
            Terms of <span className="text-red-600">Service</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mt-4"></div>
        </div>

        {/* Last Updated */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-red-600" />
            <h2 className="text-xl font-bold text-gray-900">Last Updated</h2>
          </div>
          <p className="text-gray-600">These Terms of Service were last updated on July 6, 2024.</p>
        </div>

        {/* Acceptance of Terms */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing and using DePizzaTown's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </div>

        {/* Use of Service */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Use of Service</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Our services are provided for personal, non-commercial use. You agree to use our services only for lawful purposes and in accordance with these Terms.
            </p>
            <p className="text-gray-600">
              You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </div>
        </div>

        {/* Ordering and Payment */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ordering and Payment</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              All orders are subject to acceptance and availability. We reserve the right to refuse service to anyone.
            </p>
            <p className="text-gray-600">
              Prices are subject to change without notice. Payment is due at the time of ordering.
            </p>
            <p className="text-gray-600">
              We accept various payment methods as indicated on our website. All payments are processed securely.
            </p>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Delivery times are estimates only. We are not responsible for delays due to circumstances beyond our control.
            </p>
            <p className="text-gray-600">
              Delivery fees may apply based on your location and order value.
            </p>
            <p className="text-gray-600">
              You are responsible for providing accurate delivery information. We are not liable for failed deliveries due to incorrect information.
            </p>
          </div>
        </div>

        {/* Cancellation and Refunds */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Cancellation and Refunds</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              Orders can be cancelled within 10 minutes of placement by contacting us directly.
            </p>
            <p className="text-gray-600">
              Refunds are processed according to our refund policy and may take 3-5 business days.
            </p>
            <p className="text-gray-600">
              We reserve the right to refuse refunds for orders that have been delivered and accepted.
            </p>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Property</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              All content on this website, including text, graphics, logos, and images, is the property of DePizzaTown and is protected by copyright laws.
            </p>
            <p className="text-gray-600">
              You may not reproduce, distribute, or create derivative works from this content without our express written permission.
            </p>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
          </div>
          <div className="space-y-4">
            <p className="text-gray-600">
              DePizzaTown shall not be liable for any indirect, incidental, special, consequential, or punitive damages.
            </p>
            <p className="text-gray-600">
              Our total liability to you for any claims arising from the use of our services shall not exceed the amount you paid for the specific order in question.
            </p>
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-red-600" />
            <h2 className="text-2xl font-bold text-gray-900">Privacy</h2>
          </div>
          <p className="text-gray-600">
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services.
          </p>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
          <p className="text-gray-600">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services constitutes acceptance of the modified terms.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
          <div className="space-y-4">
            <p className="text-gray-600">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="space-y-2">
              <p className="text-gray-600">
                <strong>Email:</strong> legal@depizzatown.com
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

export default TermsPage 