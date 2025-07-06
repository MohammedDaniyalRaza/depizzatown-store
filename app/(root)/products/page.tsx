"use client"
import React, { useState, useEffect } from 'react'
import { Search, Filter, Grid3X3, List, Star } from 'lucide-react'
import ProductCard from '@/components/ProductCard'

// Use the existing ProductType from types.d.ts

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products')
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status}`)
        }
        const data = await response.json()
        setProducts(data)
        setFilteredProducts(data)
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Sort products with simplified logic
    let sortedProducts = [...filtered]
    
    if (sortBy === 'name') {
      sortedProducts.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === 'price-low') {
      sortedProducts.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      sortedProducts.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'newest') {
      sortedProducts.sort((a, b) => {
        const aDate = new Date(a.createdAt || '').getTime()
        const bDate = new Date(b.createdAt || '').getTime()
        return bDate - aDate
      })
    }



    setFilteredProducts(sortedProducts)
  }, [products, searchTerm, selectedCategory, sortBy])

  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight">
            Our <span className="text-red-600">Products</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our delicious menu featuring fresh ingredients and authentic flavors.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full mt-4"></div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white appearance-none cursor-pointer"
              >
                <option value="name">Sort by Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="newest">Newest First</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* View Mode */}
            <div className="flex gap-2 justify-center sm:justify-start">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-xl border transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-red-600 text-white border-red-600 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                title="Grid View"
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-xl border transition-colors ${
                  viewMode === 'list'
                    ? 'bg-red-600 text-white border-red-600 shadow-md'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                title="List View"
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Count and Sort Info */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
          <div className="flex items-center gap-2 text-sm">
            {sortBy !== 'name' && (
              <>
                <span className="text-gray-500">Sorted by:</span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
                  {sortBy === 'price-low' && 'Price: Low to High'}
                  {sortBy === 'price-high' && 'Price: High to Low'}
                  {sortBy === 'newest' && 'Newest First'}
                </span>
                {filteredProducts.length > 0 && (
                  <span className="text-xs text-gray-500">
                    (First: Rs. {filteredProducts[0]?.price}, Last: Rs. {filteredProducts[filteredProducts.length - 1]?.price})
                  </span>
                )}
              </>
            )}

          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length > 0 ? (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6'
              : 'space-y-4'
          }>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria.</p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('all')
              }}
              className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-16">
            <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Can't find what you're looking for?
              </h2>
              <p className="text-gray-600 mb-6">
                Contact us and we'll be happy to help you find the perfect meal.
              </p>
              <a 
                href="/contact"
                className="bg-red-600 text-white px-8 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold inline-block"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage 