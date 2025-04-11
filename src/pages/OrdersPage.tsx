
import React from "react";
import Layout from "@/components/Layout/Layout";
import { Package2, TruckIcon, ClockIcon, CheckCircle, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

// Mock orders data
const mockOrders = [
  {
    id: "ORD-12345",
    date: "2025-04-10",
    total: 129.99,
    status: "delivered",
    items: [
      { id: "1", name: "Classic T-Shirt", price: 29.99, quantity: 2 },
      { id: "2", name: "Denim Jacket", price: 69.99, quantity: 1 }
    ]
  },
  {
    id: "ORD-12346",
    date: "2025-04-08",
    total: 79.99,
    status: "shipped",
    items: [
      { id: "3", name: "Printed Hoodie", price: 49.99, quantity: 1 },
      { id: "4", name: "Baseball Cap", price: 29.99, quantity: 1 }
    ]
  },
  {
    id: "ORD-12347",
    date: "2025-04-05",
    total: 149.99,
    status: "processing",
    items: [
      { id: "5", name: "Leather Jacket", price: 149.99, quantity: 1 }
    ]
  }
];

const OrderStatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case "delivered":
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case "shipped":
      return <TruckIcon className="h-6 w-6 text-blue-500" />;
    case "processing":
      return <ClockIcon className="h-6 w-6 text-amber-500" />;
    default:
      return <Package2 className="h-6 w-6 text-gray-500" />;
  }
};

const OrderStatusText = ({ status }: { status: string }) => {
  switch (status) {
    case "delivered":
      return <span className="text-green-500 font-medium">Delivered</span>;
    case "shipped":
      return <span className="text-blue-500 font-medium">Shipped</span>;
    case "processing":
      return <span className="text-amber-500 font-medium">Processing</span>;
    default:
      return <span className="text-gray-500 font-medium">Pending</span>;
  }
};

const OrdersPage: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      {mockOrders.length === 0 ? (
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
          {mockOrders.map((order) => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-md overflow-hidden">
              <div className="bg-gray-50 p-4 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order placed</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="font-medium">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total</p>
                    <p className="font-medium">${order.total.toFixed(2)}</p>
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
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gray-100 rounded"></div>
                        <div className="ml-4">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p>${item.price.toFixed(2)}</p>
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
