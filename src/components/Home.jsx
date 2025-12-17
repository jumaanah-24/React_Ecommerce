import React from "react";
import { Link } from "react-router";

const topProducts = [
  { id: 1, name: "Speaker", price: "₹1499",image:"https://images-cdn.ubuy.co.in/67f9b9f9195eadc72d08fa37-audioengine-a2-desktop-24-bit-wireless.jpg" },
  { id: 2, name: "DSLR Camera", price: "₹3999",image:"https://cdn.mos.cms.futurecdn.net/uwHcpwnff6LW6AdGCnd9K9.jpg" },
  { id: 3, name: "Webcam", price: "₹1999" ,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5dmLnU0duLoyjmLjswqpOca_qrRiYi0JHjQ&s"},
];

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mb-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-blue-700 mb-4">Welcome to TodaysHop</h1>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
              Discover the best gadgets with fast delivery and secure payments. Shop the latest electronics and accessories at unbeatable prices.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Top Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {topProducts.map((p) => (
                <div key={p.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-xl text-gray-800 mb-2">{p.name}</h3>
                    <p className="text-2xl font-bold text-blue-600">{p.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link to="/products">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl">
                Shop Now
              </button>
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
            <p className="text-gray-600">Get your orders delivered within 24 hours</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="font-bold text-xl mb-2">Secure Payments</h3>
            <p className="text-gray-600">100% secure payment processing</p>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="font-bold text-xl mb-2">Quality Products</h3>
            <p className="text-gray-600">Only the best products from trusted brands</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
