
import React, { useState } from "react";
import { Product, useStore } from "@/contexts/StoreContext";
import ProductDetails from "./ProductDetails";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useStore();
  const [showDetails, setShowDetails] = useState(false);
  
  const handleProductClick = () => {
    setShowDetails(true);
  };
  
  return (
    <>
      <div className="product-card group animate-fadeIn">
        <div 
          className="overflow-hidden mb-3 cursor-pointer" 
          onClick={handleProductClick}
        >
          <img 
            src={product.image} 
            alt={product.name} 
            className="product-image transition-transform duration-500 group-hover:scale-105"
          />
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
