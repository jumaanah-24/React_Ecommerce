import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductsContext = createContext();

export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error('useProducts must be used within a ProductsProvider');
    }
    return context;
};

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:2000/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, fetchProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};
