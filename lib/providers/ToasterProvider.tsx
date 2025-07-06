"use client"

import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import useCart from '../hooks/useCart'

const ToasterProvider = () => {
  const cart = useCart()

  // Hydrate cart on client side
  useEffect(() => {
    // Force hydration of cart from localStorage
    if (typeof window !== 'undefined') {
      // This ensures the cart is properly hydrated from localStorage
      // after the component mounts on the client side
      const storedCart = localStorage.getItem('cart-storage')
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart)
          if (parsedCart.state && parsedCart.state.cartItems) {
            console.log('Cart hydrated from localStorage:', parsedCart.state.cartItems.length, 'items')
          }
        } catch (error) {
          console.error('Error parsing stored cart:', error)
        }
      }
    }
  }, [])

  return (
    <Toaster 
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      style: {
        background: '#ffffff',
        color: '#1f2937',
        border: '2px solid #e5e7eb',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
    }}
    />
  )
}

export default ToasterProvider