import React from "react"
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route} from "react-router"
import './index.css'
import App from './App.jsx'
import HomeLayout from "./components/HomeLayout.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import ProductCard from "./components/ProductCard.jsx"
import AdminRoute from "./components/AdminRoute.jsx"
import Admin from "./components/Admin.jsx"
import Login from "./components/Login.jsx"
import Register from "./components/Register.jsx"
import Cart from "./components/Cart.jsx"
import Orders from "./components/Orders.jsx"
import Products from "./components/Products.jsx"
import { CartProvider } from "./context/CartContext.jsx"
import { AuthProvider } from "./context/AuthContext.jsx"
import {ToastContainer} from "react-toastify";


createRoot(document.getElementById('root')).render(
    <>
<AuthProvider>
<CartProvider>
<BrowserRouter>
<Routes>
    <Route element={<HomeLayout/>}>
        <Route path="/" element={<App/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>}/>
        <Route path="/admin" element={<AdminRoute><Admin/></AdminRoute>}/>


    </Route>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
</Routes>
    </BrowserRouter>
</CartProvider>
</AuthProvider>
<ToastContainer position="top-right"/>
</>
);
