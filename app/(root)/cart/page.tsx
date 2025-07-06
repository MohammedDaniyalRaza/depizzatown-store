"use client"
import useCart from '@/lib/hooks/useCart'
import { useUser } from '@clerk/nextjs'
import { MinusCircle, PlusCircle, Trash, ShoppingBag, ArrowLeft, CreditCard, Truck, Sparkles, Zap, MapPin, Phone, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'

const Cart = () => {
  const router = useRouter();
  const {user} = useUser();
  const cart = useCart()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  
  // Shipping form state
  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Pakistan'
  })
  const [phoneNumber, setPhoneNumber] = useState('')
  
  const total = cart.getTotalPrice();
  const totalRounded = parseFloat(total.toFixed(2));
  const shipping = total > 5000 ? 0 : 200;
  const finalTotal = totalRounded + shipping;

  const [customer, setCustomer] = useState({
    clerkId: user?.id || '',
    email: user?.emailAddresses?.[0]?.emailAddress || '',
    name: user?.fullName || ''
  });

  // Update customer state if user changes (for Clerk login)
  useEffect(() => {
    setCustomer({
      clerkId: user?.id || '',
      email: user?.emailAddresses?.[0]?.emailAddress || '',
      name: user?.fullName || ''
    });
  }, [user]);

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const handleCheckOut = async () => {
    if (!user) {
      toast.error("Please sign in to checkout");
      return;
    }

    if (cart.cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // If checkout form is not shown, show it first
    if (!showCheckoutForm) {
      setShowCheckoutForm(true);
      return;
    }

    // Validate required fields
    if (!shippingAddress.street || !shippingAddress.city || !phoneNumber) {
      toast.error("Please fill in all required shipping information");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartItems: cart.cartItems,
          customer: {
            clerkId: user.id,
            email: user.emailAddresses?.[0]?.emailAddress || '',
            name: user.fullName || 'Guest'
          },
          shippingAddress: {
            street: shippingAddress.street || '',
            city: shippingAddress.city || '',
            state: shippingAddress.state || '',
            country: shippingAddress.country || 'Pakistan',
            zipCode: shippingAddress.zipCode || ''
          },
          phoneNumber: phoneNumber || ''
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create order");
      }

      const data = await res.json();

      if (data.success) {
        toast.success("Order placed successfully!");
        cart.clearCart();
        router.push(`/payment_success?orderNumber=${data.orderNumber}`);
      } else {
        toast.error(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error('Checkout error:', error);
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50/30 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-red-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-black/5 to-transparent rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-red-500/5 to-black/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
        {/* Premium Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6 shadow-lg">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
            <span className="hidden sm:inline">Premium Shopping Experience</span>
            <span className="sm:hidden">Premium Experience</span>
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
            Your <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">Cart</span>
          </h1>
          
          <div className="w-24 sm:w-32 h-1 bg-gradient-to-r from-red-600 via-slate-900 to-red-600 mx-auto rounded-full mb-6 sm:mb-8 shadow-lg"></div>
          
          <Link 
            href="/"
            className="group inline-flex items-center gap-2 sm:gap-3 bg-white/80 backdrop-blur-sm border border-slate-200 text-slate-700 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl font-semibold hover:bg-white hover:border-red-300 hover:text-red-600 transition-all duration-500 transform hover:scale-105 hover:shadow-xl text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="hidden sm:inline">Continue Shopping</span>
            <span className="sm:hidden">Continue</span>
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 group-hover:rotate-12 transition-transform duration-300" />
          </Link>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Premium Cart Items */}
          <div className="xl:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 px-4 sm:px-8 py-4 sm:py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent"></div>
                <div className="relative flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <ShoppingBag className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
      <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-white">Shopping Cart</h2>
                    <p className="text-white/80 text-xs sm:text-sm hidden sm:block">Manage your delicious selections</p>
                  </div>
                  <div className="ml-auto">
                    <span className="bg-white/20 backdrop-blur-sm text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold border border-white/30">
                      {cart.getUniqueItemsCount()} {cart.getUniqueItemsCount() === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-8">
                {cart.cartItems.length === 0 ? (
                  <div className="text-center py-8 sm:py-16">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-slate-100 to-red-50 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                      <ShoppingBag className="w-10 h-10 sm:w-16 sm:h-16 text-slate-400" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3">Your cart is empty</h3>
                    <p className="text-slate-600 mb-6 sm:mb-8 text-base sm:text-lg">Ready to discover amazing flavors?</p>
                    <Link 
                      href="/"
                      className="group inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105"
                    >
                      <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                      Start Shopping
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-12 transition-transform duration-300" />
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4 sm:space-y-6">
                    {cart.cartItems.map((cartItem, index) => (
                      <div 
                        key={cartItem.id} 
                        className="group relative bg-gradient-to-br from-white to-slate-50 rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-slate-200/50 hover:border-red-300/50 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 sm:hover:-translate-y-2 hover:scale-[1.01] sm:hover:scale-[1.02]"
                        style={{ 
                          animationDelay: `${index * 150}ms`,
                          animation: 'slideInUp 0.6s ease-out forwards'
                        }}
                      >
                        {/* Hover Effect Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-6">
                          {/* Premium Product Image */}
                          <div className="relative w-20 h-20 sm:w-32 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl flex-shrink-0 group-hover:shadow-2xl transition-all duration-500">
                            <Image
                              src={cartItem.image || '/pizza.jpg'}
                              alt={cartItem.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          </div>

                          {/* Product Details */}
                          <div className="flex-1 min-w-0 relative z-10">
                            <h3 className="text-lg sm:text-2xl font-bold text-slate-900 mb-2 sm:mb-3 group-hover:text-red-600 transition-colors duration-300">
                              {cartItem.title}
                            </h3>
                            <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 sm:mb-4">
                              {cartItem.color && (
                                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-red-100 text-red-800 border border-red-200">
                                  {cartItem.color}
                                </span>
                              )}
                              {cartItem.size && (
                                <span className="inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                                  {cartItem.size}
                                </span>
                              )}
                            </div>
                            <p className="text-xl sm:text-3xl font-black text-red-600">
                              Rs. {cartItem.price}
                            </p>
                          </div>

                          {/* Premium Quantity Controls */}
                          <div className="flex items-center gap-2 sm:gap-4 w-full lg:w-auto justify-center lg:justify-start relative z-20">
                            <button
                    onClick={() => cart.decreaseQuantity(cartItem.id)}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                            >
                              <MinusCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                            </button>
                            
                            <span className="text-lg sm:text-2xl font-black text-slate-900 px-3 sm:px-6 py-2 sm:py-3 bg-white rounded-xl sm:rounded-2xl border-2 border-slate-200 shadow-inner min-w-[60px] sm:min-w-[80px] text-center">
                    {cartItem.quantity}
                  </span>
                            
                            <button
                    onClick={() => cart.increaseQuantity(cartItem.id)}
                              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                            >
                              <PlusCircle className="w-4 h-4 sm:w-6 sm:h-6" />
                            </button>
                          </div>

                          {/* Premium Remove Button */}
                          <button
                            onClick={() => cart.removeItem(cartItem.id)}
                            className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-red-50 border-2 border-red-200 flex items-center justify-center hover:bg-red-100 hover:border-red-400 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl relative z-20"
                          >
                            <Trash className="w-4 h-4 sm:w-6 sm:h-6 text-red-600" />
                          </button>
                </div>

                        {/* Premium Subtotal */}
                        <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-600 font-semibold text-sm sm:text-base">Subtotal:</span>
                            <span className="text-lg sm:text-2xl font-black text-slate-900">
                              Rs. {cartItem.price * cartItem.quantity}
                            </span>
                          </div>
                        </div>
              </div>
            ))}
          </div>
        )}
      </div>
            </div>
          </div>

          {/* Shipping Form */}
          {showCheckoutForm && (
            <div className="xl:col-span-2 mb-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden">
                <div className="bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 px-4 sm:px-8 py-4 sm:py-6 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent"></div>
                  <div className="relative flex items-center gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-2xl font-bold text-white">Delivery Information</h2>
                      <p className="text-white/80 text-xs sm:text-sm hidden sm:block">Enter your delivery details</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 sm:p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {/* Name */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Name *
                      </label>
                      <input
                        type="text"
                        value={customer.name}
                        onChange={e => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-300"
                        required
                      />
                    </div>
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <span className="inline-block w-4 h-4 mr-2 align-middle">@</span>
                        Email *
                      </label>
                      <input
                        type="email"
                        value={customer.email}
                        onChange={e => setCustomer({ ...customer, email: e.target.value })}
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-300"
                        required
                      />
                    </div>
                    {/* Phone Number */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Phone Number *
                      </label>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-2 bg-slate-100 border-2 border-slate-200 rounded-l-xl font-semibold text-slate-700 select-none">+92</span>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={e => {
                            // Only allow numbers, max 10 digits
                            let val = e.target.value.replace(/\D/g, '').slice(0, 10);
                            setPhoneNumber(val);
                          }}
                          placeholder="Enter 10 digit number"
                          className="w-full px-4 py-3 border-2 border-slate-200 rounded-r-xl focus:border-red-500 focus:outline-none transition-colors duration-300"
                          required
                        />
                      </div>
                      {phoneNumber && phoneNumber.length !== 10 && (
                        <p className="text-red-600 text-xs mt-1">Phone must be exactly 10 digits</p>
                      )}
                      <p className="text-slate-500 text-xs mt-1">Format: +92 xxxxxxxxxx</p>
                    </div>
                    {/* Street Address */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        <MapPin className="w-4 h-4 inline mr-2" />
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.street}
                        onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                        placeholder="Enter your street address"
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-300"
                        required
                      />
                    </div>
                    {/* City */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">City *</label>
                      <select
                        value={shippingAddress.city}
                        onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-red-500 focus:outline-none transition-colors duration-300 bg-white"
                        required
                      >
                        <option value="">Select city</option>
                        <option value="Karachi">Karachi</option>
                        {/* Future: add more cities here */}
                      </select>
                    </div>
                    {/* Country (static) */}
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Country</label>
                      <input
                        type="text"
                        value="Pakistan"
                        readOnly
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl bg-slate-100 text-slate-700 font-semibold cursor-not-allowed"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Premium Order Summary */}
          <div className="xl:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200/50 overflow-hidden sticky top-4 sm:top-8">
              <div className="bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 px-4 sm:px-8 py-4 sm:py-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-transparent"></div>
                <div className="relative flex items-center gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <CreditCard className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg sm:text-2xl font-bold text-white">Order Summary</h2>
                    <p className="text-white/80 text-xs sm:text-sm hidden sm:block">Review your order</p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-8 space-y-6 sm:space-y-8">
                {/* Summary Items */}
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex justify-between items-center p-3 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl">
                    <span className="text-slate-600 font-semibold text-sm sm:text-base">Subtotal ({cart.cartItems.length} items)</span>
                    <span className="font-bold text-slate-900 text-base sm:text-lg">Rs. {totalRounded}</span>
      </div>

                  {totalRounded < 5000 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl sm:rounded-2xl p-3 sm:p-4">
                      <div className="flex items-center gap-2 sm:gap-3 text-blue-800">
                        <Truck className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-xs sm:text-sm font-semibold">
                          Add Rs. {5000 - totalRounded} more for free shipping!
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="border-t-2 border-slate-200 pt-4 sm:pt-6">
                    <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-slate-900 to-red-900 rounded-xl sm:rounded-2xl text-white">
                      <span className="text-lg sm:text-xl font-bold">Total</span>
                      <span className="text-2xl sm:text-3xl font-black">Rs. {totalRounded}</span>
                    </div>
                  </div>
        </div>

                {/* Premium Checkout Button */}
                <button 
                  disabled={cart.cartItems.length === 0 || isLoading}
                  className="group w-full bg-gradient-to-r from-slate-900 via-red-900 to-slate-900 text-white py-4 sm:py-6 px-6 sm:px-8 rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none relative overflow-hidden hover:cursor-pointer"
                  onClick={handleCheckOut}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                        {showCheckoutForm ? 'Place Order (COD)' : 'Proceed to Checkout'}
                        <Zap className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>

                {/* Premium Additional Info */}
                <div className="text-center space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-xs sm:text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Cash on Delivery - Pay when you receive</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-xs sm:text-sm">
                    <Truck className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>Free delivery on orders over Rs. 5000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default Cart