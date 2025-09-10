import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import CartItem from "@/components/Cart/CartItem";
import { useStore } from "@/contexts/StoreContext";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { getAuthUser } from "@/lib/AuthCookieManager";

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useStore();
  const navigate = useNavigate();
  const ototal = cartTotal;

  const customerId = getAuthUser()?.userId;

  const handleProceedToCheckout = async () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const user = getAuthUser();
      if (!user?.userId) {
        toast.error("Please log in to checkout cart");
        navigate("/login");
        return;
    }

    const orderItems = cartItems.map((item: any) => ({
      quantity: item.quantity,
      unitPrice: item.price,
      productId: item.productId,
      orderId: "", // Backend generates this
    }));

    // Create order payload
    const order = {
      customerId,
      orderItems,
      status: "OPEN",
      totalPrice: cartTotal,
    };

    try {
      const response = await axios.post("https://api.suavemusicpr.com/api/v1/orders", order, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Order created successfully!");
      clearCart();
      navigate("/payment/" + response.data.orderId + "/" + ototal, { state: { orderId: response.data.orderId } });
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error(error.response.data);
    }
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-culturing-gray" />
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-[#5fa9af] mb-8">Looks like you haven't added any products to your cart yet.</p>
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
                    id={item.productId}
                    name={item.name}
                    price={item.price}
                    image={item.images[0]}
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
                  <span>Ush {cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>
              <div className="flex justify-between font-semibold mb-6">
                <span>Total</span>
                <span>Ush {cartTotal.toFixed(2)}</span>
              </div>
              <button 
                className="btn-primary w-full py-3 bg-[#5fa9af] hover:bg-[#4a8f96] text-white font-semibold"
                disabled={cartItems.length === 0}
                onClick={handleProceedToCheckout}
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