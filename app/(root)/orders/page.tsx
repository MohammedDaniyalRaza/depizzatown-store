"use client";
import React, { useEffect, useState } from "react";
import useOrders from "@/lib/hooks/useOrders";
import { useUser } from "@clerk/nextjs";
import { Loader2, Package, ChevronDown, ChevronUp, Truck, CheckCircle, Clock, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-300",
  confirmed: "bg-blue-100 text-blue-800 border-blue-300",
  preparing: "bg-orange-100 text-orange-800 border-orange-300",
  out_for_delivery: "bg-purple-100 text-purple-800 border-purple-300",
  delivered: "bg-green-100 text-green-800 border-green-300",
  cancelled: "bg-red-100 text-red-800 border-red-300",
};

const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="w-4 h-4" />,
  confirmed: <CheckCircle className="w-4 h-4" />,
  preparing: <Package className="w-4 h-4" />,
  out_for_delivery: <Truck className="w-4 h-4" />,
  delivered: <CheckCircle className="w-4 h-4" />,
  cancelled: <XCircle className="w-4 h-4" />,
};

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const { orders, loading, error, fetchOrders } = useOrders();
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    if (isLoaded && user) {
      fetchOrders();
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-red-50">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-red-50">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Sign In Required</h1>
          <p className="text-gray-700 mb-6">Please sign in to view your orders.</p>
          <a href="/sign-in" className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition">Sign In</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-red-50 py-10 px-2 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-black mb-8 text-center">
          My <span className="text-red-600">Orders</span>
        </h1>
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 text-red-600 animate-spin" />
          </div>
        ) : error ? (
          <div className="bg-red-100 text-red-800 rounded-xl p-6 text-center font-semibold">{error}</div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-black mb-2">No Orders Yet</h2>
            <p className="text-gray-700 mb-6">You haven't placed any orders yet.</p>
            <a href="/" className="bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition">Start Shopping</a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <div key={order._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4 gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <span className="text-xs font-semibold text-gray-500">Order #</span>
                      <span className="text-lg font-bold text-black">{order.orderNumber}</span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-xs font-semibold ${statusColors[order.status] || 'bg-gray-100 text-gray-700 border-gray-300'}`}>
                        {statusIcons[order.status] || <Clock className="w-4 h-4" />} {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">Placed on {new Date(order.createdAt).toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Total: <span className="text-red-600 font-bold">Rs. {order.totalAmount}</span></div>
                  </div>
                  <button
                    className="flex items-center gap-1 text-red-600 font-semibold hover:underline"
                    onClick={() => setExpanded(expanded === order._id ? null : order._id)}
                  >
                    {expanded === order._id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    {expanded === order._id ? "Hide Details" : "View Details"}
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {expanded === order._id && (
                    <motion.div
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="bg-white px-6 py-4 border-t border-gray-100">
                        <div className="mb-4">
                          <h3 className="text-lg font-bold mb-2 text-red-500">Products</h3>
                          <ul className="divide-y divide-gray-200">
                            {order.products.map((item: any, idx: number) => (
                              <li key={idx} className="py-2 flex items-center gap-4">
                                <img src={item.product.image || "/pizza.jpg"} alt={item.product.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200" />
                                <div className="flex-1">
                                  <div className="font-semibold text-black">{item.product.title}</div>
                                  <div className="text-xs text-gray-500">Qty: {item.quantity} {item.size && `| Size: ${item.size}`} {item.color && `| Flavor: ${item.color}`}</div>
                                </div>
                                <div className="font-bold text-red-500">Rs. {item.product.price}</div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="mb-2">
                          <h3 className="text-lg font-bold mb-2 text-red-500">Shipping Address</h3>
                          <div className="text-sm text-gray-700">
                            {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                          </div>
                          <div className="text-sm text-gray-700">Phone: {order.phoneNumber}</div>
                        </div>
                        <div className="mb-2">
                          <h3 className="text-lg font-bold mb-2 text-red-500">Payment</h3>
                          <div className="text-sm text-gray-700">Method: <span className="font-semibold text-black">{order.paymentMethod}</span></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}