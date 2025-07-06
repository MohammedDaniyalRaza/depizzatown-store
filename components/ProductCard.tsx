"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductCard = ({product} : {product : ProductType}) => {
  const { user } = useUser();

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      <Link href={`/products/${product._id}`}>
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <Image 
            src={product.media?.[0] || '/pizza.jpg'}
            alt={product.title || 'Product Image'}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
              {product.category}
            </span>
          </div>



          {/* Price Badge */}
          <div className="absolute bottom-4 right-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-red-600 text-white shadow-lg">
              Rs. {product.price}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4 lg:p-6">
          <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
            {product.title}
          </h3>
          
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-3 sm:mb-4 line-clamp-2">
            {product.description}
          </p>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-1 sm:px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Sizes & Colors */}
          <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
            {product.sizes && product.sizes.length > 0 && (
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                <span>{product.sizes.length} Sizes</span>
              </span>
            )}
            
            {product.colors && product.colors.length > 0 && (
              <span className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
                <span>{product.colors.length} Flavors</span>
              </span>
            )}
          </div>
        </div>

        {/* Hover Effect Border */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent  transition-colors duration-300 pointer-events-none" />
      </Link>
    </div>
  )
}

export default ProductCard