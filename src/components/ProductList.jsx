import ProductCard from "./ProductCard";

const ProductList = ({products,onAddToCart }) => {
    return (
        <div className="w-full mx-auto flex flex-wrap gap-6 p-10 justify-center">

            {products.map((product) => (
    <ProductCard 
        key={product._id}
        product={product}
        onAddToCart={onAddToCart} 
    />
))}

        </div>
    );
};

export default ProductList;