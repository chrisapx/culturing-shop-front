
import React, { useState } from "react";
import { Product, useStore } from "@/contexts/StoreContext";
import ProductDetails from "./ProductDetails";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();
  const [showDetails, setShowDetails] = useState(false);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleProductClick = () => {
    setShowDetails(true);
  };
  
  return (
    <>
      <div className="product-card group animate-fadeIn">
        <div 
          className="overflow-hidden mb-3 cursor-pointer relative" 
          onClick={handleProductClick}
        >
          <img 
            src={product.images[currentImageIndex]} 
            alt={product.name} 
            className="product-image transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Image navigation dots */}
          <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImageIndex === index ? "bg-black" : "bg-white/70"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <h3 
          className="product-title cursor-pointer" 
          onClick={handleProductClick}
        >
          {product.name}
        </h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button 
          onClick={() => addToCart(product)}
          className="btn-primary w-full"
        >
          Add to Cart
        </button>
      </div>
      
      <ProductDetails 
        product={product} 
        isOpen={showDetails} 
        onClose={() => setShowDetails(false)} 
      />
    </>
  );
};

export default ProductCard;
