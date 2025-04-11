
import React from "react";
import { useStore } from "@/contexts/StoreContext";
import { Trash } from "lucide-react";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, image, quantity }) => {
  const { updateQuantity, removeFromCart } = useStore();
  
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b border-gray-200 last:border-b-0">
      <div className="w-full sm:w-24 h-24 mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="flex-grow sm:mr-4">
        <h3 className="text-lg font-medium">{name}</h3>
        <p className="text-culturing-gray">${price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center mt-2 sm:mt-0">
        <div className="flex border border-gray-300">
          <button
            onClick={() => updateQuantity(id, quantity - 1)}
            disabled={quantity <= 1}
            className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100 disabled:opacity-50"
          >
            -
          </button>
          <span className="px-3 py-1">{quantity}</span>
          <button
            onClick={() => updateQuantity(id, quantity + 1)}
            className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100"
          >
            +
          </button>
        </div>
        
        <button
          onClick={() => removeFromCart(id)}
          className="ml-4 text-culturing-gray hover:text-culturing-red"
          aria-label="Remove item"
        >
          <Trash className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
