import React from 'react'
import { getCollections, getProduct } from '@/lib/actions/actions'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

interface CollectionPageProps {
  params: Promise<{ collectionName: string }>
}

const CollectionPage = async ({ params }: CollectionPageProps) => {
  const { collectionName } = await params
  const collectionId = decodeURIComponent(collectionName)
  
  const collections = await getCollections()
  const allProducts = await getProduct()
  
  // Find the collection by ID
  const collection = collections.find((col: any) => col._id === collectionId)
  
  if (!collection) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Collection Not Found</h1>
          <p className="text-gray-600 mb-6">The collection doesn't exist or has no products.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/collections"
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
            >
              View All Collections
            </Link>
            <Link 
              href="/"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  // Filter products that belong to this collection
  const collectionProducts = allProducts.filter((product: ProductType) => 
    product.collections && product.collections.some((col: any) => col._id === collectionId)
  )

  if (collectionProducts.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Collection Not Found</h1>
          <p className="text-gray-600 mb-6">The collection doesn't exist or has no products.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/collections"
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
            >
              View All Collections
            </Link>
            <Link 
              href="/"
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/collections"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-red-600 transition-colors font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Collections
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight">
            {collection.title} <span className="text-red-600">Collection</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            {collection.description || `Discover our amazing ${collection.title.toLowerCase()} selection`}
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
            <span>{collectionProducts.length} {collectionProducts.length === 1 ? 'product' : 'products'} available</span>
            <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
            <span>Premium quality</span>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mt-4"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {collectionProducts.map((product: ProductType, index: number) => (
            <div
              key={product._id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Love This Collection?
            </h2>
            <p className="text-gray-600 mb-6">
              Explore more collections or check out our full product catalog
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/collections"
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
              >
                View All Collections
              </Link>
              <Link 
                href="/"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionPage 