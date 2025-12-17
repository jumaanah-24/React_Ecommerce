// import React from "react";

// const Orders = () => {
//   const orders = [
//     { id: "Laptop", date: "2025-02-17", total: 40000, status: "Delivered",image:"https://5.imimg.com/data5/SELLER/Default/2021/3/YE/VN/KU/112920323/hp-laptop-500x500.jpg" },
//     { id: "Airpods", date: "2025-07-14", total: 500, status: "On the way",image:"https://media.tatacroma.com/Croma%20Assets/Entertainment/Wireless%20Earbuds/Images/262016_okfsmf.png" },
//   ];

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Previous Orders</h2>

//       {orders.length === 0 ? (
//         <p className="text-slate-600">No previous orders found</p>
//       ) : (
//         <div className="space-y-3">
//           {orders.map((o) => (
//             <div key={o.id} className="p-4 bg-white rounded shadow flex justify-between items-center w-100 h-60 transition duration-400 hover:scale-105">
//               <div>
//                 <img src={o.image} alt={o.id} className="w-40 h-40 object-cover mb-2"/>
//                 <div className="font-semibold">{o.id}</div>
//                 <div className="text-sm text-slate-500">{o.date}  {o.status}</div>
//               </div>
//               <div className="font-bold">₹{o.total}</div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const res = await fetch("http://localhost:3000/orders", {
          headers: token ? { Authorization: token } : {},
        });
        if (res.status === 401) {
          // not logged in or token invalid
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
                    <p className="text-lg font-bold">₹{order.total}</p>
                    <p className="text-sm text-gray-500">{order.items?.length || 0} items</p>
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
                        <div className="text-right">
                          <p className="font-medium">₹{(it.sellingprice || it.price || it.product?.sellingprice) ?? 0}</p>
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
