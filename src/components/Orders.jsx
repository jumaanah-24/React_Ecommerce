import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const Orders = () => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        if (res.status === 401) {
          setOrders([]);
          return;
        }
        if (!res.ok) throw new Error("Failed to fetch orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleDeleteProduct = async (orderId, itemIndex) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders/${orderId}/items/${itemIndex}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete item');

      setOrders(orders.map(order => {
        if (order.id === orderId) {
          order.items.splice(itemIndex, 1);
        }
        return order;
      }));
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders/${orderId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Failed to delete order');

      setOrders(orders.filter(order => order.id !== orderId));
    } catch (err) {
      alert('Failed to delete order');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Your Orders</h1>

        {loading ? (
          <p className="text-gray-500">Loading orders...</p>
        ) : orders.length === 0 ? (
          <div className="bg-white p-8 rounded shadow-sm text-center">
            <p className="text-lg font-medium text-gray-600">You have no orders yet.</p>
            <p className="text-sm text-gray-400 mt-2">Browse products and place an order to see it here.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-semibold">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{new Date(order.date).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="text-red-500 hover:text-red-700 text-sm mb-2"
                    >
                      Delete Order
                    </button>
                    <p className="text-lg font-bold">₹{order.total}</p>
                    <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
                    <p className={`text-sm font-medium ${order.status === 'Processing' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {order.status || 'Delivered'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 space-y-4">
                    {order.items && order.items.map((it, idx) => (
                      <div key={idx} className="flex items-center gap-4 border border-gray-100 p-3 rounded">
                        <img src={it.image || it.product?.image} alt={it.name || it.product?.name} className="w-20 h-20 object-contain rounded" />
                        <div className="flex-1">
                          <p className="font-semibold">{it.name || it.product?.name}</p>
                          <p className="text-sm text-gray-500">Qty: {it.quantity ?? it.qty ?? 1}</p>
                        </div>
                        <div className="text-right flex items-center gap-3">
                          <div>
                            <p className="font-medium">₹{(it.sellingprice || it.price || it.product?.sellingprice) ?? 0}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteProduct(order.id, idx)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <aside className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-600">Order Summary</p>
                    <div className="mt-2 flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₹{order.total}</span>
                    </div>
                  </aside>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;