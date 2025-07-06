"use client";
import React, { useState, useEffect } from "react";
import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";
import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string >(productInfo.colors?.[0] || '');
  const [selectedSize, setSelectedSize] = useState<string >(productInfo.sizes?.[0] || '' );
  const [quantity, setQuantity] = useState<number>(1);
  const [mounted, setMounted] = useState(false);
  
  const cart = useCart()

  // Ensure component is mounted before using cart
  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render cart functionality until mounted
  if (!mounted) {
    return (
      <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-white via-gray-100 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5 animate-fade-in-up border border-gray-200 items-center justify-center">
        <div className="flex justify-between items-center w-full mb-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-black drop-shadow-lg tracking-tight w-full">
            {productInfo.title}
          </h1>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-gray-600  w-full">
          <span className="inline-flex  px-3 py-1 rounded-full bg-gray-200/60 text-gray-800 font-semibold">
            Category:{" "}
            <span className="ml-2 text-black font-bold">
              {productInfo.category}
            </span>
          </span>
          <span className="inline-flex  px-3 py-1 rounded-full bg-red-600 text-white font-bold shadow-md">
            Rs. {productInfo.price}
          </span>
        </div>
        <div className="w-full">
          <h2 className="text-lg font-semibold text-black mb-1">Description</h2>
          <p className="text-gray-700 text-base leading-relaxed bg-white/60 rounded-lg p-3 shadow-inner">
            {productInfo.description}
          </p>
        </div>
        {/* Loading state for cart functionality */}
        <div className="w-full pt-2 relative group">
          <div className="w-full py-5 rounded-2xl font-black text-xl bg-gray-300 text-gray-600 shadow-2xl cursor-not-allowed">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-white via-gray-100 rounded-3xl shadow-2xl p-6 sm:p-8 flex flex-col gap-5 animate-fade-in-up border border-gray-200 items-center justify-center">
      <div className="flex justify-between items-center w-full mb-1">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-black drop-shadow-lg tracking-tight w-full">
          {productInfo.title}
        </h1>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-gray-600  w-full">
        <span className="inline-flex  px-3 py-1 rounded-full bg-gray-200/60 text-gray-800 font-semibold">
          Category:{" "}
          <span className="ml-2 text-black font-bold">
            {productInfo.category}
          </span>
        </span>
        <span className="inline-flex  px-3 py-1 rounded-full bg-red-600 text-white font-bold shadow-md">
          Rs. {productInfo.price}
        </span>
      </div>
      <div className="w-full">
        <h2 className="text-lg font-semibold text-black mb-1">Description</h2>
        <p className="text-gray-700 text-base leading-relaxed bg-white/60 rounded-lg p-3 shadow-inner">
          {productInfo.description}
        </p>
      </div>
      {productInfo.colors && productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-md font-semibold text-black">Colors:</h3>
          <div className="flex gap-2 flex-wrap">
            {productInfo.colors.map((color, index) => (
              <span
                key={index}
                className={`cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 border-2 transition-all duration-300 ${
                  selectedColor === color
                    ? "border-red-600 shadow-lg scale-110 animate-glow"
                    : "border-gray-200 hover:border-black/70 hover:scale-105"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </span>
            ))}
          </div>
        </div>
      )}
      {productInfo.sizes && productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2 w-full">
          <h3 className="text-md font-semibold text-black">Sizes:</h3>
          <div className="flex gap-2 flex-wrap">
            {productInfo.sizes.map((size, index) => (
              <span
                key={index}
                className={`cursor-pointer inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gray-100 to-gray-300 text-gray-900 border-2 transition-all duration-300 ${
                  selectedSize === size
                    ? "border-red-600 shadow-lg scale-110 animate-glow"
                    : "border-gray-200 hover:border-black/70 hover:scale-105"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-col gap-2 w-full">
        <h3 className="text-md font-semibold text-black">Quantity:</h3>
        <div className="flex gap-4 items-center ">
          <MinusCircle
            className="w-7 h-7 hover:text-red-600 cursor-pointer transition-colors duration-200"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <span className="text-lg font-bold text-black px-4 py-1 rounded bg-white/80 border border-gray-200 shadow-inner">
            {quantity}
          </span>
          <PlusCircle
            className="w-7 h-7 hover:text-red-600 cursor-pointer transition-colors duration-200"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>
      <div className="pt-2 w-full relative group ">
        <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
        <button
          className="relative w-full py-5 rounded-2xl font-black text-xl bg-gradient-to-r from-black via-gray-900 to-black text-white shadow-2xl hover:shadow-red-500/50 hover:scale-[1.02] transition-all duration-500 ease-out border-2 border-red-500/20 hover:border-red-500/50 overflow-hidden group cursor-pointer"
          onClick={() => {
            cart.addItem({
              id: productInfo._id,
              title: productInfo.title,
              price: productInfo.price,
              quantity,
              color: selectedColor || undefined,
              size: selectedSize || undefined,
              image: productInfo.media?.[0],
            });
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 via-transparent to-red-600/20 animate-pulse"></div>
          <span className="relative z-10 flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
            Add To Cart
            <ShoppingCart
              className="w-6 h-6 animate-bounce"
              style={{ animationDelay: "0.3s" }}
            />
          </span>
        </button>
        <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
      </div>
    </div>
  );
};

export default ProductInfo;
