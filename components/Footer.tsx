import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image 
                src="/pizza.png" 
                alt="DePizzaTown Logo" 
                width={40} 
                height={40} 
                className="rounded-full border-2 border-red-600" 
              />
              <span className="font-extrabold text-xl tracking-tight">
                DePizza<span className="text-red-600">Town</span>
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Serving the best food in North Nazimabad since 2020. Fresh ingredients, authentic flavors, and exceptional service.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-red-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-gray-400 hover:text-red-400 transition-colors">
                  Collections
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-red-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-red-400 transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-red-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-red-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  North Nazimabad, Karachi, Pakistan
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-400 flex-shrink-0" />
                <a href="tel:+923001234567" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  +92 300 123 4567
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-400 flex-shrink-0" />
                <a href="mailto:info@depizzatown.com" className="text-gray-400 hover:text-red-400 transition-colors text-sm">
                  info@depizzatown.com
                </a>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Mon-Fri: 11AM-11PM<br />
                  Sat-Sun: 12PM-12AM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-bold text-white mb-3">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates and special offers.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-white placeholder-gray-400"
              />
              <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 DePizzaTown. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <span className="text-gray-400">Made with ❤️ in Pakistan</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
                <span className="text-green-400">Online Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 