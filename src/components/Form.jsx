// import { useState } from "react";
// const Form = ({addProducts}) => {
//     const [pname,setName]=useState("");
//     const [url,setURL] = useState("");
//     const [sprice,setsprice] = useState();
//     const [oprice,setoprice] = useState();
//     const [category,setCategory] = useState("");
//     const handleAddProducts = () => {
//         addProducts(pname,url,sprice,oprice,category)
//     }
//     return(
//         <div>
//             <form className="bg-white w-1/4 mx-auto p-6 rounded-lg">
//                 <h1 className="text-center font-bold text-xl mb-2">Add Products</h1>
//                 <label htmlFor="productName" className="block mb-2">Name</label>
//                 <input type="text" value={pname} onChange={(e)=>{setName(e.target.value)}} className="block mb-3 border-2 border-gray-300 w-full p-2 rounded-lg"/>
//                 <label htmlFor="url" className="block mb-2">Image URL</label>
//                 <input type="url" value={url} onChange={(e)=>setURL(e.target.value)} className="block mb-3 mb-3 border-2 border-gray-300 w-full p-2 rounded-lg"/>
//                 <label htmlFor="sprice" className="block mb-2">Selling Price</label>
//                 <input type="number" value={sprice} onChange={(e)=>setsprice(e.target.value)} className="block mb-3 mb-3 border-2 border-gray-300 w-full p-2 rounded-lg"/>
//                 <label htmlFor="oprice" className="block mb-2">Original Price</label>
//                 <input type="number" value={oprice} onChange={(e)=>setoprice(e.target.value)} className="block mb-3 mb-3 border-2 border-gray-300 w-full p-2 rounded-lg"/>
//                 <label htmlFor="category" className="block mb-2">Category</label>
//                 <input type="text" value={category} onChange={(e)=>setCategory(e.target.value)} className="block mb-3 mb-3 border-2 border-gray-300 w-full p-2 rounded-lg"/>
//                 <button type="button" onClick={handleAddProducts} className="block mx-auto my-3 bg-blue-800 rounded-lg px-4 py-2 mt-6">Add Product</button>
//             </form>
//         </div>
//     )
// }
// export default Form;