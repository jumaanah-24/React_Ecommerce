// const Header = () => {
//     return(
//         <div className="flex justify-between items-center font-bold bg-blue-600 p-5 text-white">
//             <p className="text-3xl">ToDaysHop</p>
//             <ul className="flex gap-20">
//                 <li className="hover:bg-white hover:text-rose-900 p-2 rounded-md"><Link to="/products">Products</Link></li>
//                 <li className="hover:bg-white hover:text-rose-900 p-2 rounded-md"><Link to="/carts">Cart</Link></li>
//                 <li className="hover:bg-white hover:text-rose-900 p-2 rounded-md"><Link to="/login">Admin</Link></li>
//                 <li className="hover:bg-white hover:text-rose-900 p-2 rounded-md"><Link to="/login">Login</Link></li>
//             </ul>
//         </div>
//     )
// }
// export default Header;

import { Link } from "react-router";
import { useCart } from "../context/CartContext";

const Header = () => {
    const { cart } = useCart();
    const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    return(
        <div className="flex justify-between items-center font-bold bg-blue-600 p-5 text-white">
            <p className="text-4xl">ToDaysHop</p>
            <div className="flex items-center gap-4">
                <span className="text-lg">{isLoggedIn ? "Authorized" : "Unauthorized"}</span>
                <ul className="flex gap-20">
                    <li className="hover:bg-white hover:text-rose-900 p-2 rounded-md"><Link to="/products">Products</Link></li>
                    <li className="hover:bg-white hover:text-rose-900 p-2 rounded-md relative"><Link to="/cart">Cart ({cart.length})</Link></li>
                    <li className="hover:bg-white hover:text-rose-900 p-2 rounded-md"><Link to="/orders">Orders</Link></li>
                    <li className="hover:bg-white hover:text-rose-900 p-2 rounded-md"><Link to="/login">Login</Link></li>
                    <li className="hover:bg-white hover:text-rose-900 p-2 rounded-md"><Link to="/register">Register</Link></li>
                </ul>
            </div>
        </div>
    )
}
export default Header;
