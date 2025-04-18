
import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "sonner";

export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  category: "inhouse" | "mmpd" | "artist";
  selectedColor?: string;
  selectedSize?: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreContextProps {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartItemsCount: number;
}

const StoreContext = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Generate a unique ID for the product with selected variants
      const variantId = product.selectedColor || product.selectedSize 
        ? `${product.id}-${product.selectedColor || ''}-${product.selectedSize || ''}`
        : product.id;
      
      // Check if item with same variant already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => {
        if (product.selectedColor || product.selectedSize) {
          return item.id === product.id && 
                 item.selectedColor === product.selectedColor && 
                 item.selectedSize === product.selectedSize;
        }
        return item.id === product.id;
      });
      
      if (existingItemIndex !== -1) {
        // Item exists, increment quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        
        const variantText = product.selectedColor || product.selectedSize 
          ? `(${product.selectedColor || ''} ${product.selectedSize || ''})`
          : '';
          
        toast.success(`Added another ${product.name} ${variantText} to your cart`);
        return updatedItems;
      } else {
        // Item doesn't exist, add new item with quantity 1
        const variantText = product.selectedColor || product.selectedSize 
          ? `(${product.selectedColor || ''} ${product.selectedSize || ''})`
          : '';
          
        toast.success(`Added ${product.name} ${variantText} to your cart`);
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) => {
      const removedItem = prevItems.find(item => item.id === productId);
      if (removedItem) {
        toast.info(`Removed ${removedItem.name} from your cart`);
      }
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart has been cleared");
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const cartItemsCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemsCount,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
