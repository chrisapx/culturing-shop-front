import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout/Layout";
import { Package2, TruckIcon, ClockIcon, CheckCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { getAuthUser } from "@/lib/AuthCookieManager";

interface OrderItem {
  id: number;
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface Order {
  orderId: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  orderItems: OrderItem[];
}

const OrderStatusIcon = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case "shipped":
      return <TruckIcon className="h-6 w-6 text-blue-500" />;
    case "processing":
      return <ClockIcon className="h-6 w-6 text-amber-500" />;
    case "open":
      return <Package2 className="h-6 w-6 text-gray-500" />;
    default:
      return <Package2 className="h-6 w-6 text-gray-500" />;
  }
};

const OrderStatusText = ({ status }: { status: string }) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return <span className="text-green-500 font-medium">Delivered</span>;
    case "shipped":
      return <span className="text-blue-500 font-medium">Shipped</span>;
    case "processing":
      return <span className="text-amber-500 font-medium">Processing</span>;
    case "open":
      return <span className="text-gray-500 font-medium">Pending</span>;
    default:
      return <span className="text-gray-500 font-medium">{status}</span>;
  }
};

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = getAuthUser();
      if (!user?.userId) {
        toast.error("Please log in to view your orders");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("https://api.suavemusicpr.com/api/v1/orders", {
          params: {
            page: 0,
            size: 300,
          },
          headers: { "Content-Type": "application/json" },
        });

        // Filter orders by customerId client-side if backend doesn't support filtering
        const userOrders = response.data.filter(
          (order: any) => order.customerId === user.userId
        );
        setOrders(userOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error(error.response.data);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      {isLoading ? (
        <div className="text-center py-16">
          <p className="text-gray-500">Loading orders...</p>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-gray-400" />
          <h2 className="text-2xl font-medium mb-4">No orders yet</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't placed any orders yet.</p>
          <Link to="/" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.orderId} className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order placed</p>
                    <p className="font-medium">{formatDate(order.createdAt)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{order.orderId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">Ush {order.totalPrice.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <OrderStatusIcon status={order.status} />
                    <OrderStatusText status={order.status} />
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-medium mb-4">Order Items</h3>
                <div className="space-y-4">
                  {order.orderItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded"></div>
                        <div className="ml-4">
                          <p className="font-medium">Product ID: {item.productId}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p>Ush {item.unitPrice.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default OrdersPage;