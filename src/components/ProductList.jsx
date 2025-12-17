import ProductCard from "./ProductCard";

const ProductList = ({products,onAddToCart }) => {
    return (
        <div className="w-3/4 mx-auto flex gap-6 flex-wrap p-10">
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