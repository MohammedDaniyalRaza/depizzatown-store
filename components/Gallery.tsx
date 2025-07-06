"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

const Gallery = ({productMedia} : {productMedia:string[]}) => {
    const [mainImage, setMainImage] = useState(productMedia[0]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentModalImage, setCurrentModalImage] = useState(0);

    const openModal = (imageIndex: number) => {
        setCurrentModalImage(imageIndex);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const nextImage = () => {
        setCurrentModalImage((prev) => (prev + 1) % productMedia.length);
    };

    const prevImage = () => {
        setCurrentModalImage((prev) => (prev - 1 + productMedia.length) % productMedia.length);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    };

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-2 w-full max-w-lg mx-auto bg-white rounded-3xl shadow-2xl p-6 sm:p-8 animate-fade-in-up border border-gray-100">
        <div className="relative w-full flex justify-center">
          <div className="rounded-3xl overflow-hidden shadow-xl bg-white p-1">
            <Image
              src={mainImage}
              alt='Product Image'
              width={800}
              height={800}
              className="object-cover rounded-2xl w-full max-w-md h-72 sm:h-96 transition-all duration-500 ease-in-out border-4 border-black/90 shadow-xl hover:shadow-red-500/40 hover:scale-105 hover: animate-pulse cursor-pointer"
              priority
              onClick={() => openModal(productMedia.indexOf(mainImage))}
            />
            <div className="absolute inset-0 pointer-events-none rounded-3xl border-2 border-transparent group-hover:border-red-500 transition-colors duration-300" />
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2 overflow-x-auto w-full justify-center animate-fade-in-up custom-scrollbar">
          {productMedia.map((image, index) => (
            <button
              key={index}
              className={`focus:outline-none group transition-transform duration-300 flex-shrink-0 ${mainImage === image ? 'scale-110' : 'opacity-80 hover:scale-105'}`}
              onClick={() => setMainImage(image)}
              aria-label={`Show product image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`Product Image ${index + 1}`}
                width={90}
                height={90}
                className={`object-cover rounded-xl w-16 h-16 sm:w-20 sm:h-20 shadow-md border-2 transition-all duration-300 cursor-pointer ${mainImage === image ? 'border-red-600 shadow-red-400/40 animate-glow' : 'border-gray-200'}`}
                onClick={() => openModal(index)}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-red-500 transition-colors duration-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-red-500 transition-colors duration-300 z-10 bg-black/50 rounded-full p-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-red-500 transition-colors duration-300 z-10 bg-black/50 rounded-full p-2"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image */}
            <div onClick={(e) => e.stopPropagation()}>
              <Image
                src={productMedia[currentModalImage]}
                alt={`Product Image ${currentModalImage + 1}`}
                width={800}
                height={800}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                priority
              />
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-4 py-2 rounded-full text-sm">
              {currentModalImage + 1} / {productMedia.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto custom-scrollbar max-w-full">
              {productMedia.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => { e.stopPropagation(); setCurrentModalImage(index); }}
                  className={`flex-shrink-0 transition-all duration-300 ${currentModalImage === index ? 'scale-110 ring-2 ring-red-500' : 'opacity-70 hover:opacity-100'}`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    width={60}
                    height={60}
                    className="w-12 h-12 object-cover rounded-lg border-2 border-white"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #dc2626 #f3f4f6;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 4px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to right, #dc2626, #991b1b);
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to right, #b91c1c, #7f1d1d);
        }
      `}</style>
    </>
  )
}

export default Gallery