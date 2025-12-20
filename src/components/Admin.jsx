import React, { useState } from "react";


const Admin = () => {
  const [form, setForm] = useState({ product_id: "", name: "", imageurl: "", sellingprice: "", originalprice: "", catogory: "", ratings: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://react-ecomm-backend.onrender.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        alert("Product created successfully!");
        setForm({ product_id: "", name: "", imageurl: "", sellingprice: "", originalprice: "", catogory: "", ratings: "" });
      } else {
        alert("Failed to create product.");
      }
    } catch (error) {
      console.error('Error:', error);
      alert("Error creating product.");
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 w-150 rounded-xl" style={{backgroundImage:"url('https://i.pinimg.com/1200x/99/a7/c6/99a7c63a82775544a718c2496b6d8bd9.jpg')",}}>
      <div className="max-w-md w-100">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">Add New Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product ID</label>
              <input
                name="product_id"
                value={form.product_id}
                onChange={handleChange}
                required
                type="number"
                className="mt-1 w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter product name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                name="imageurl"
                value={form.imageurl}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter image URL"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input
                name="catogory"
                value={form.catogory}
                onChange={handleChange}
                required
                className="mt-1 w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter category"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ratings</label>
              <input
                name="ratings"
                value={form.ratings}
                onChange={handleChange}
                required
                type="number"
                step="0.1"
                className="mt-1 w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter ratings"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Selling Price</label>
              <input
                name="sellingprice"
                value={form.sellingprice}
                onChange={handleChange}
                required
                type="number"
                className="mt-1 w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter selling price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Original Price</label>
              <input
                name="originalprice"
                value={form.originalprice}
                onChange={handleChange}
                required
                type="number"
                className="mt-1 w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter original price"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Admin;
