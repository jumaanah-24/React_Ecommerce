import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import ProductList from "./ProductList";
import { useCart } from "../context/CartContext";
import { Link } from "react-router";

const Products = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:2000/products")
            .then((res) => res.json())
            .then((data) => setProducts(data))
            .catch((err) => console.error(err));
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product._id);
    };

    return (
        <div className="bg-white min-h-screen">
            <h1 className="text-center font-bold text-3xl mt-10">Products</h1>
            <Link to="/cart">
            <ProductList products={products} onAddToCart={handleAddToCart} />
            </Link>
        </div>
    );
};

export default Products;
