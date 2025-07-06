import { getProduct } from '@/lib/actions/actions'
import React from 'react'
import ProductCard from './ProductCard'

const ProductList = async () => {
  try {
    const products = await getProduct()
    
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-600">Products</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our handcrafted pizzas made with the finest ingredients and authentic recipes
            </p>
          </div>

          {/* Products Grid */}
          {!products || products.length === 0 ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900">No Products Found</h3>
                <p className="text-gray-500 max-w-md">We're currently preparing some amazing pizzas for you. Check back soon!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-5">
              {products.map((product: ProductType, index: number) => (
                <div 
                  key={product._id}
                  style={{ animationDelay: `${index * 100}ms` }}
                  className="animate-fade-in"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}

          {/* Bottom Stats */}
          {products && products.length > 0 && (
            <div className="mt-16 text-center">
              <div className="inline-flex items-center space-x-8 text-gray-600">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span className="text-sm font-medium">{products.length} Products Available</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm font-medium">Fresh Daily</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error loading products:', error)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Something went wrong</h3>
          <p className="text-gray-500">We're having trouble loading the products. Please try again later.</p>
        </div>
      </div>
    )
  }
}

export default ProductList