"use client";

import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, MapPin, CreditCard, AlertCircle } from 'lucide-react';

interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
  image?: string;
}

interface ShippingAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'Pakistan'
  });

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        setCartItems(cart);
        const total = cart.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
        setTotalAmount(total);
      }
    }
  }, []);

  const handleCODOrder = async () => {
    if (!user) {
      router.push('/sign-in');
      return;
    }

    // Validate required fields
    if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.state) {
      alert('Please fill in all required shipping address fields');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cod`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cartItems,
          customer: {
            clerkId: user.id,
            name: user.fullName || 'Unknown',
            email: user.emailAddresses[0]?.emailAddress || 'unknown@example.com'
          },
          shippingAddress,
          totalAmount
        })
      });

      const data = await response.json();
      
      if (data.success) {
        // Clear cart
        localStorage.removeItem('cart');
        setCartItems([]);
        
        // Redirect to success page
        router.push(`/payment_success?orderId=${data.orderId}&method=cod`);
      } else {
        alert('Order failed: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('COD order failed:', error);
      alert('Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      const updatedCart = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      const total = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalAmount(total);
    } else {
      const updatedCart = cartItems.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      const total = updatedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      setTotalAmount(total);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h1>
          <p className="text-gray-600 mb-6">Please sign in to complete your order.</p>
          <button
            onClick={() => router.push('/sign-in')}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products to your cart before checkout.</p>
          <button
            onClick={() => router.push('/')}
            className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order with Cash on Delivery</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                      {item.image && (
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                        {item.color && ` • Color: ${item.color}`}
                        {item.size && ` • Size: ${item.size}`}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm text-gray-600">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-sm hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-gray-900">${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress({...shippingAddress, street: e.target.value})}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.state}
                      onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.postalCode}
                      onChange={(e) => setShippingAddress({...shippingAddress, postalCode: e.target.value})}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value="Pakistan"
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 text-gray-700 font-semibold cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Method
              </h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">PKR</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-green-800">Cash on Delivery (COD)</h3>
                    <p className="text-sm text-green-700">Pay with cash when your order is delivered</p>
                  </div>
                </div>
              </div>
            </div>

            {/* COD Notice */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-800 mb-1">Important Notice</h3>
                  <p className="text-sm text-yellow-700">
                    Please have the exact amount of <strong>${totalAmount.toFixed(2)}</strong> ready when your order is delivered. 
                    You'll pay in cash to the delivery person.
                  </p>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handleCODOrder}
              disabled={loading}
              className="w-full bg-red-600 text-white py-4 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Placing Order...
                </div>
              ) : (
                `Place Order - Pay PKR${totalAmount.toFixed(2)} on Delivery`
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 