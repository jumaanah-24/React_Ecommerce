import dustbin from "../assets/dustbin.png"

const CartItem = ({item,removeFromCart,updateQuantity}) => {
    const increaseQuantity= () => {
        updateQuantity(item.id, item.quantity + 1);
    }
    const decreaseQuantity= () => {
        if(item.quantity > 1){
            updateQuantity(item.id, item.quantity - 1);
        }
    }

    const handleRemove = () => {
        removeFromCart(item.id);
    }
    return(
        <div className="shadow-lg flex gap-10 border border-gray-200 p-4 rounded-xl mb-5 transform transition duration-400 hover:scale-105 shadow-xl w-80">
            <img src={item.image} alt={item.name} className="w-20 h-20"/>
            <div className="flex-col items-start">
                <p className="font-bold text-lg mb-1 items-center">{item.name}</p>
                <div className="flex justify-start items-center gap-4">
                    <p className="text-xl font-bold">&#8377;{item.sellingprice}</p>
                    <p className="line-through text-blue-500">&#8377;{item.originalprice}</p>
                </div>
                <div className="flex items-center justify-center mt-3">
                    <button onClick={decreaseQuantity} className="bg-indigo-400 font-bold text-sm px-4 py-2 transition duration-400 hover:bg-gray-300 hover:text-blue-800">-</button>
                    <p className="bg-white font-bold text-sm px-4 py-2">{item.quantity}</p>
                    <button onClick={increaseQuantity} className="bg-indigo-400 font-bold text-sm px-4 py-2 transition duration-400 hover:bg-gray-300 hover:text-blue-800">+</button>
                    <button onClick={handleRemove}><img src={dustbin} alt="delete" className="w-10 h-10"/></button>
                </div>
            </div>
        </div>
    )
}
export default CartItem;
