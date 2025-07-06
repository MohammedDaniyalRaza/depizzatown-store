import { getCollections, getProduct } from '@/lib/actions/actions'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const Collections = async () => {
  try {
    const collections = await getCollections()
    const products = await getProduct()
    
    // Create collection data with product count and sample image
    const collectionsWithCounts = collections.map((collection: any) => {
      // Count products that belong to this collection
      const collectionProducts = products.filter((product: ProductType) => 
        product.collections && product.collections.some((col: any) => col._id === collection._id)
      )
      
      return {
        _id: collection._id,
        title: collection.title,
        count: collectionProducts.length,
        image: collection.image?.[0] || '/pizza.png',
        description: collection.description || `Explore our amazing ${collection.title.toLowerCase()} collection`
      }
    })

    if (!collectionsWithCounts || collectionsWithCounts.length === 0) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">No Collections Found</h3>
            <p className="text-gray-500 max-w-md">We're currently preparing some amazing foods collections for you. Check back soon!</p>
          </div>
        </div>
      )
    }

    return (
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-red-600">Collections</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our carefully curated pizza collections, each crafted with passion and premium ingredients
            </p>
          </div>

          {/* Collections Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {collectionsWithCounts.map((collection: any, index: number) => (
                              <Link 
                  href={`/collections/${encodeURIComponent(collection._id)}`} 
                  key={collection._id}  
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <Image 
                    src={collection.image} 
                    alt={collection.title} 
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-600 text-white">
                      {collection.count} Items
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {collection.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {collection.description}
                  </p>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent  transition-colors duration-300 pointer-events-none" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  } catch (error) {
    console.error('Error loading collections:', error)
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Something went wrong</h3>
          <p className="text-gray-500">We're having trouble loading the collections. Please try again later.</p>
        </div>
      </div>
    )
  }
}

export default Collections