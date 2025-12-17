// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);
//   const { token } = useAuth();

//   const fetchCart = async () => {
//     if (!token) return;

//     const res = await fetch("http://localhost:2000/carts", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();

//     if (data.cart?.products) {
//       const formatted = data.cart.products.map((item) => ({
//         id: item.product._id,
//         name: item.product.name,
//         image: item.product.image,
//         sellingprice: item.product.sellingprice,
//         originalprice: item.product.originalprice,
//         quantity: item.quantity,
//       }));
//       setCart(formatted);
//     } else {
//       setCart([]);
//     }
//   };

// const addToCart = async (productId) => {
//   console.log("addToCart called with productId:", productId);
//   console.log("token:", token);
//   if (!token) {
//     console.log("No token found");
//     alert("Please login to add items to cart");
//     return;
//   }

//   await fetch("http://localhost:2000/carts", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({
//       productId,
//       quantity: 1,
//     }),
//   });

//   // IMPORTANT: refresh cart after adding
//   fetchCart();
// };

// const removeFromCart = async (productId) => {
//   if (!token) {
//     console.log("No token found");
//     return;
//   }

//   await fetch(`http://localhost:2000/carts/${productId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // Refresh cart after removing
//   fetchCart();
// };

// const updateQuantity = async (productId, quantity) => {
//   if (!token) {
//     console.log("No token found");
//     return;
//   }

//   await fetch(`http://localhost:2000/carts/${productId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify({ quantity }),
//   });

//   // Refresh cart after updating
//   fetchCart();
// };


//   useEffect(() => {
//     fetchCart();
//   }, [token]);

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { token } = useAuth();

  const fetchCart = async () => {
    if (!token) return;

    try {
      const res = await fetch("http://localhost:2000/carts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    console.log("token:", token);
    if (!token) {
      console.log("No token found");
      alert("Please login to add items to cart");
      return;
    }

    try {
      const res = await fetch("http://localhost:2000/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

      // Refresh cart after adding
      await fetchCart();
    } catch (error) {
      console.error("Error in addToCart:", error);
      alert("Error adding product to cart");
    }
  };

  const removeFromCart = async (productId) => {
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const res = await fetch(`http://localhost:2000/carts/${productId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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
    if (!token) {
      console.log("No token found");
      return;
    }

    try {
      const res = await fetch(`http://localhost:2000/carts/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
