import { Link } from "react-router";
const ProductCard = ({product,onAddToCart}) => {
    return(
        <div className="p-4 text-center transition duration-700 hover:scale-110">
           <img src={product.imageurl} alt={product.name} className="w-65 h-45"/>

            <p className="font-semibold text-md mt-3 tracking-widest text-gray-500">{product.name}</p>
            <div className="flex justify-center items-center gap-2">
                <p className="text-2xl font-bold"> &#8377;{product.sellingprice}</p>
                <p className="text-blue-600 line-through text-md"> &#8377;{product.originalprice}</p>
            </div>
            <button className="mt-3 bg-blue-800 px-4 py-2 rounded-md font-bold text-white transition duration-700 hover:text-blue-800 hover:bg-gray-300" onClick={()=>onAddToCart(product)}>Add To Cart</button>
        </div>
    )
}
export default ProductCard;