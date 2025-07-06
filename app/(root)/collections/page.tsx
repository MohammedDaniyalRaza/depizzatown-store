import React from 'react'
import { getCollections, getProduct } from '@/lib/actions/actions'
import Link from 'next/link'
import Image from 'next/image'

const CollectionsPage = async () => {
  const collections = await getCollections()
  const products = await getProduct()
  
  // Create collection data with product count and sample image
  const collectionData = collections.map((collection: any) => {
    // Count products that belong to this collection
    const collectionProducts = products.filter((product: ProductType) => 
      product.collections && product.collections.some((col: any) => col._id === collection._id)
    )
    
    return {
      _id: collection._id,
      name: collection.title,
      count: collectionProducts.length,
      image: collection.image?.[0] || '/pizza.png',
      description: collection.description || `Explore our amazing ${collection.title.toLowerCase()} collection`
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight">
            Our <span className="text-red-600">Collections</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated collections of delicious food and beverages
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mt-4"></div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collectionData.map((collection: any, index: number) => (
            <div
              key={collection.name}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/collections/${encodeURIComponent(collection._id)}`}>
                <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden cursor-pointer">
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image 
                      src={collection.image}
                      alt={collection.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Collection Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-gray-800 backdrop-blur-sm">
                        {collection.count} Products
                      </span>
                    </div>

                    {/* View Collection Button */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-bold bg-red-600 text-white shadow-lg">
                        View Collection
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                      {collection.name}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {collection.description}
                    </p>

                    {/* Product Count */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {collection.count} {collection.count === 1 ? 'product' : 'products'} available
                      </span>
                      <div className="w-2 h-2 bg-red-600 rounded-full group-hover:scale-150 transition-transform duration-300"></div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-red-200 transition-colors duration-300 pointer-events-none" />
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-gray-600 mb-6">
              Explore all our products or contact us for custom orders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/"
                className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
              >
                View All Products
              </Link>
              <Link 
                href="/contact"
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CollectionsPage 