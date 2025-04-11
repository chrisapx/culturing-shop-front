
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import CartItem from "@/components/Cart/CartItem";
import { useStore } from "@/contexts/StoreContext";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useStore();

  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    clearCart();
  };
  
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-culturing-gray" />
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-culturing-gray mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-medium mb-4">Cart Items</h2>
              
              <div>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    quantity={item.quantity}
                  />
                ))}
              </div>
              
              <div className="mt-6 flex justify-between">
                <Link to="/" className="text-culturing-DEFAULT hover:underline">
                  Continue Shopping
                </Link>
                <button 
                  onClick={clearCart}
                  className="text-culturing-gray hover:text-culturing-red"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-xl font-medium mb-4">Order Summary</h2>
              
              <div className="mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between font-semibold mb-6">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              
              <button 
                className="btn-primary w-full py-3"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default CartPage;
