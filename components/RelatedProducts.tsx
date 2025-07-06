"use client"
import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'

interface RelatedProductsProps {
  currentProduct: ProductType
  allProducts: ProductType[]
  maxProducts?: number
}

const RelatedProducts = ({ currentProduct, allProducts, maxProducts = 4 }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const findRelatedProducts = () => {
      try {
        setLoading(true)
        
        if (!allProducts || allProducts.length === 0) {
          setRelatedProducts([])
          return
        }
        
        // Filter out the current product and find related ones
        const filtered = allProducts.filter((product: ProductType) => 
          product._id !== currentProduct._id
        )

        // Score products based on similarity
        const scoredProducts = filtered.map((product: ProductType) => {
          let score = 0
          
          // Same category gets highest score
          if (product.category === currentProduct.category) {
            score += 10
          }
          
          // Similar tags get points
          if (currentProduct.tags && product.tags) {
            const commonTags = currentProduct.tags.filter(tag => 
              product.tags.includes(tag)
            )
            score += commonTags.length * 3
          }
          
          // Similar price range gets points
          const priceDiff = Math.abs(product.price - currentProduct.price)
          if (priceDiff < 200) score += 2
          else if (priceDiff < 500) score += 1
          
          return { ...product, score }
        })

        // Sort by score and take top products
        const sorted = scoredProducts
          .sort((a: any, b: any) => b.score - a.score)
          .slice(0, maxProducts)

        setRelatedProducts(sorted)
      } catch (error) {
        console.error('Error finding related products:', error)
        setRelatedProducts([])
      } finally {
        setLoading(false)
      }
    }

    findRelatedProducts()
  }, [currentProduct._id, currentProduct.category, currentProduct.tags, currentProduct.price, allProducts, maxProducts])

  if (loading) {
    return (
      <div className="w-full py-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Related Products</h2>
          <div className="w-16 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg p-4 animate-pulse">
              <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
              <div className="bg-gray-200 h-4 rounded mb-2"></div>
              <div className="bg-gray-200 h-3 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <div className="w-full py-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          You Might Also <span className="text-red-600">Like</span>
        </h2>
        <p className="text-gray-600 mb-4">Discover more amazing products</p>
        <div className="w-16 h-1 bg-red-600 mx-auto rounded-full"></div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default RelatedProducts 