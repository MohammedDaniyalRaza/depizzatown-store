"use client"
import useCart from '@/lib/hooks/useCart'
import { CheckCircle, Home, Package } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, Suspense } from 'react'

const PaymentSuccessContent = () => {
    const cart = useCart() 
    const searchParams = useSearchParams()
    const orderNumber = searchParams.get('orderNumber')

    useEffect(()=>{
        cart.clearCart();
    }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Order Placed Successfully!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your order. We'll start preparing it right away!
        </p>

        {/* Order Number */}
        {orderNumber && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Package className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">Order Number</span>
            </div>
            <p className="text-lg font-bold text-gray-900">{orderNumber}</p>
          </div>
        )}

        {/* COD Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <p className="text-blue-800 text-sm">
            <strong>Cash on Delivery:</strong> Please have the exact amount ready when your order arrives.
          </p>
        </div>

        {/* Continue Shopping Button */}
        <Link 
          href="/"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105"
        >
          <Home className="w-5 h-5" />
            Continue Shopping
        </Link>
      </div>
    </div>
  )
}

const SuccessfulPayment = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  )
}

export default SuccessfulPayment 