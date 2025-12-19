import CartItem from "./CartItems";
import { useCart } from "../context/CartContext";
import { Link } from "react-router";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, buyNow } = useCart();

    const total = cart.reduce((sum, item) => {
        return sum + (item.sellingprice * item.quantity);
    }, 0);
    const originalTotal = cart.reduce((sum, item) => {
        return sum + (item.originalprice * item.quantity);
    }, 0);
    const discount = originalTotal - total;

    return (
        <div className="bg-white w-5/6 mx-auto p-6 rounded-lg mb-10">
            <h1 className="text-center font-bold text-xl mb-2">Cart</h1>
            <div className="flex flex-col lg:flex-row justify-start lg:justify-between gap-20">
                <div className="flex-1">
                    {cart.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            removeFromCart={removeFromCart}
                            updateQuantity={updateQuantity}
                        />
                    ))}
                </div>
                {cart.length > 0 && (
                    <div className="shadow-lg border border-gray-200 p-6 rounded-xl w-full lg:w-72 h-fit transform transition duration-400 hover:scale-105">
                        <h3 className="font-bold text-center mb-4 text-xl text-blue-800">Bill Amount</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <p className="font-bold">Total Amount</p>
                                <p className="font-semibold">₹{originalTotal}</p>
                            </div>
                            <div className="flex justify-between">
                                <p className="font-bold">Discount</p>
                                <p className="font-bold text-green-500">-₹{discount}</p>
                            </div>
                            <hr className="border-gray-300" />
                            <div className="flex justify-between text-lg">
                                <p className="font-bold">Final Amount</p>
                                <p className="font-bold text-blue-600">₹{total}</p>
                            </div>
                            <Link to="/orders">
                            <button
                                onClick={buyNow}
                                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-green-700 transition duration-300"
                            >
                                Place Order
                            </button>
                            </Link>
                        </div>
                    </div>
                )}
                {cart.length === 0 && (
                    <div className="w-full text-center">
                        <p className="text-gray-500 text-lg">Your cart is empty.</p>
                        <p className="text-gray-400 mt-2">Add some products to get started!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
