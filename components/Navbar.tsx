"use client"
import useCart from '@/lib/hooks/useCart'
import useOrders from '@/lib/hooks/useOrders';
import { UserButton, useUser } from '@clerk/nextjs'
import { Menu, ShoppingCart, X, Package, LogOut, Home, User, Grid3X3, Users, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { user } = useUser()
  const [dropDownMenu, setDropDownMenu] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathName = usePathname()

  const cart = useCart()
  const { orders, fetchOrders, getOrderCount } = useOrders();

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const navLinks = [
    { label: 'Home', url: '/', icon: <Home className="w-5 h-5" /> },
    { label: 'Products', url: '/products', icon: <Package className="w-5 h-5" /> },
    { label: 'Collections', url: '/collections', icon: <Grid3X3 className="w-5 h-5" /> },
    { label: 'About', url: '/about', icon: <Users className="w-5 h-5" /> },
    { label: 'Contact', url: '/contact', icon: <Mail className="w-5 h-5" /> },
    { label: 'FAQ', url: '/faq', icon: <Package className="w-5 h-5" /> },
    { label: 'Cart', url: '/cart', icon: <ShoppingCart className="w-5 h-5" /> },
    { label: 'Orders', url: '/orders', icon: <Package className="w-5 h-5" /> },
  ]

  return (
    <>
      {/* Desktop Navbar */}
      <header className="sticky top-0 z-50 w-full hidden lg:flex justify-between items-center px-6 py-4 bg-black/90 shadow-2xl border-b border-zinc-900">
        {/* Logo and Brand */}
        <Link href="/">
          <motion.div 
            className="flex items-center gap-3 select-none cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image 
              src="/pizza.png" 
              alt="DePizzaTown Logo" 
              width={50} 
              height={50} 
              className="rounded-full border-2 border-red-800 shadow-md hover:scale-110 transition-transform duration-300" 
            />
            <span className="font-extrabold text-2xl text-white tracking-tight flex items-center gap-2">
              DePizza<span className="text-red-600">Town</span>
              <motion.span 
                className="w-3 h-3 bg-red-600 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.div>
        </Link>

        {/* Desktop Navigation Links */}
        <motion.nav 
          className="flex items-center space-x-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {navLinks.map((link, index) => (
            <Link
              key={link.label}
              href={link.url}

              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 group ${
                pathName === link.url 
                  ? 'text-red-600 bg-white/10 font-bold shadow-lg' 
                  : 'text-white hover:text-red-400 hover:bg-white/5'
              }`}
            >
              {pathName === link.url && (
                <motion.span 
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-full"
                  layoutId="activeTab"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="transition-transform duration-200 group-hover:scale-110">
                {link.label === 'Cart' ? (
                  <div className="relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cart.getUniqueItemsCount() > 0 && (
                      <motion.span 
                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {cart.getUniqueItemsCount()}
                      </motion.span>
                    )}
                  </div>
                ) : link.label === 'Orders' ? (
                  <div className="relative">
                    <Package className="w-5 h-5" />
                    {getOrderCount() > 0 && (
                      <motion.span 
                        className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        {getOrderCount()}
                      </motion.span>
                    )}
                  </div>
                ) : (
                  link.icon
                )}
              </span>
              <span>{link.label}</span>
            </Link>
          ))}
        </motion.nav>

        {/* User Section */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-white font-semibold">{user.firstName}</span>
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "ring-2 ring-red-600 hover:ring-red-500 transition-all duration-200",
                  },
                }}
              />
            </div>
          ) : (
            <Link 
              href="/sign-in"
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors duration-200"
            >
              <User className="w-4 h-4" />
              Sign In
            </Link>
          )}
        </motion.div>
      </header>

      {/* Mobile Navbar */}
      <header className="sticky top-0 z-50 w-full flex justify-between items-center px-4 py-3 bg-black/90 shadow-2xl border-b border-zinc-900 lg:hidden">
        {/* Logo and Brand */}
        <Link href="/">
          <motion.div 
            className="flex items-center gap-2 select-none cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image 
              src="/pizza.png" 
              alt="Logo Not Found" 
              width={44} 
              height={44} 
              className="rounded-full border-2 border-red-800 shadow-md" 
            />
            <span className="font-extrabold text-xl text-white tracking-tight flex items-center gap-1">
              DePizza<span className="text-red-600">Town</span>
              <motion.span 
                className="ml-1 w-2 h-2 bg-red-600 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </span>
          </motion.div>
        </Link>

        {/* Hamburger & User */}
        <div className="flex items-center gap-2">
          <motion.button
            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 shadow-lg hover:bg-zinc-800 transition-colors duration-200 focus:outline-none flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open navigation menu"
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-7 h-7 text-white" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-7 h-7 text-white" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
          <div className="ml-1">
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "ring-2 ring-red-600",
                },
              }}
            />
          </div>
        </div>

        {/* Animated Dropdown Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div 
                className="fixed top-0 left-0 w-full h-full bg-black/40 backdrop-blur-sm z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsMobileMenuOpen(false)}
              />
              <motion.nav
                className="fixed top-0 right-0 mt-0 mr-0 w-72 h-full bg-white/80 backdrop-blur-xl shadow-2xl border-l border-zinc-200 z-50 flex flex-col pt-8 px-6"
                style={{boxShadow: '0 8px 32px 0 rgba(0,0,0,0.25)'}}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.button
                  className="absolute top-4 right-4 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-zinc-800" />
                </motion.button>
                
                <div className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Link
                        href={link.url}
                        className={`relative flex items-center gap-3 px-5 py-3 text-lg rounded-lg font-semibold transition-all duration-200 ${
                          pathName === link.url 
                            ? 'text-red-600 bg-white font-bold shadow' 
                            : 'text-black hover:bg-zinc-100'
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {/* Red accent bar for active link */}
                        {pathName === link.url && (
                          <motion.span 
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-red-600 rounded-full"
                            layoutId="mobileActiveTab"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                        <span className="transition-transform duration-200 group-hover:scale-110">
                          {link.label === 'Cart' ? (
                            <div className="relative">
                              <ShoppingCart className="w-5 h-5" />
                              {cart.getUniqueItemsCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                  {cart.getUniqueItemsCount()}
                                </span>
                              )}
                            </div>
                          ) : link.label === 'Orders' ? (
                            <div className="relative">
                              <Package className="w-5 h-5" />
                              {getOrderCount() > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                  {getOrderCount()}
                                </span>
                              )}
                            </div>
                          ) : (
                            link.icon
                          )}
                        </span>
                        <span>{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div 
                  className="mt-auto mb-8 flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <span className="text-xs text-zinc-500">&copy; {new Date().getFullYear()} DePizzaTown</span>
                </motion.div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

export default Navbar