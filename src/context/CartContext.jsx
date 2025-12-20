// export const useCart = () => useContext(CartContext);
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();

  const fetchCart = async () => {
    try {
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
        headers,
      });

      const data = await res.json();

      if (data.cart?.products) {
        const formatted = data.cart.products.map((item) => ({
          id: item.product._id,
          name: item.product.name,
          image: item.product.imageurl,
          sellingprice: item.product.sellingprice,
          originalprice: item.product.originalprice,
          quantity: item.quantity,
        }));
        setCart(formatted);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (productId) => {
    console.log("addToCart called with productId:", productId);

    try {
      const headers = {
        "Content-Type": "application/json",
      };
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/carts`, {
        method: "POST",
        headers,
        body: JSON.stringify({
          productId,
          quantity: 1,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error("Error adding to cart:", error);
        alert(`Failed to add product to cart: ${error.message || JSON.stringify(error)}`);
        return;
      }

      const data = await res.json();
      console.log("Product added to cart:", data);

      toast.success("Product added successfully!");

      // Refresh cart after adding
      await fetchCart();
    } catch (error) {
      console.error("Error in addToCart:", error);
      alert("Error adding product to cart");
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/carts/${productId}`, {
        method: "DELETE",
        headers,
      });

      if (!res.ok) {
        console.error("Error removing from cart");
        return;
      }

      // Refresh cart after removing
      await fetchCart();
    } catch (error) {
      console.error("Error in removeFromCart:", error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    const cleanToken = token?.trim();
    if (!cleanToken) {
      toast.error("Please login to update cart items");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/carts/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cleanToken}`,
        },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) {
        console.error("Error updating quantity");
        return;
      }

      // Refresh cart after updating
      await fetchCart();
    } catch (error) {
      console.error("Error in updateQuantity:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  const buyNow = async () => {
  if (cart.length === 0) {
    alert("Your cart is empty");
    return;
  }

  const cleanToken = token?.trim();
  // Allow placing order even without token for demo purposes
  // if (!cleanToken) {
  //   alert("Please login to place an order");
  //   return;
  // }

  const total = cart.reduce((sum, item) => sum + (item.sellingprice * item.quantity), 0);

  try {
    const orderData = {
      products: cart.map(item => ({
        product: item.id,
        _id: item.id,
        quantity: item.quantity,
        name: item.name,
        image: item.image,
        sellingprice: item.sellingprice,
        originalprice: item.originalprice,
        category: item.category || "general",  // Add missing category
        ratings: item.ratings || 0
      })),
      total
    };

    const headers = {
      "Content-Type": "application/json",
    };
    if (cleanToken) {
      headers.Authorization = `Bearer ${cleanToken}`;
    }

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/orders`, {
      method: "POST",
      headers,
      body: JSON.stringify(orderData),
    });

    if (!res.ok) {
      const error = await res.json();
      console.error("Error creating order:", error);
      alert(`Failed to place order: ${error.message || JSON.stringify(error)}`);
      return;
    }

    const data = await res.json();
    console.log("Order created:", data);

    toast.success("Order placed successfully!");

    // Clear the cart after successful order
    setCart([]);

  } catch (error) {
    console.error("Error in buyNow:", error);
    alert("Error placing order");
  }
};

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, buyNow }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
