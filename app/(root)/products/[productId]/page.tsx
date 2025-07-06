import Gallery from '@/components/Gallery';
import ProductInfo from '@/components/ProductInfo';
import RelatedProducts from '@/components/RelatedProducts';
import { getProductDetails, getProduct } from '@/lib/actions/actions'
import React from 'react'

const ProductDetails = async ({params}: {params: Promise<{productId: string}>}) => {
    const { productId } = await params;
    
    try {
    const productDeatails = await getProductDetails(productId);
    const allProducts = await getProduct();
  
        
        if (!productDeatails || !productDeatails._id) {
            throw new Error('Product not found');
        }
        
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black mb-2 tracking-tight">
            Product <span className="text-red-600">Details</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-black mx-auto rounded-full"></div>
        </div>
        
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Gallery Section */}
          <div className="w-full max-w-lg animate-fade-in-left">
            <Gallery productMedia={productDeatails.media} />
          </div>
          
          {/* Product Info Section */}
          <div className="w-full max-w-lg animate-fade-in-right">
            <ProductInfo productInfo={productDeatails} />
          </div>
        </div>
        
        {/* Related Products */}
        <div className="mt-16 animate-fade-in-up">
          <RelatedProducts currentProduct={productDeatails} allProducts={allProducts} />
        </div>
        
        {/* Bottom Decoration */}
        <div className="flex justify-center mt-12 animate-fade-in-up">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-red-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </div>
    </div>
        );
    } catch (error) {
        console.error('Error loading product details:', error);
        return (
            <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 flex items-center justify-center px-4">
                <div className="text-center max-w-md mx-auto">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
                    <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
                    <a 
                        href="/"
                        className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors font-semibold"
                    >
                        Back to Shop
                    </a>
                </div>
            </div>
        );
  }
}

export default ProductDetails