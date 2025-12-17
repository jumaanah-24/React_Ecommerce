import {Navigate} from "react-router"
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({children})=>{
    const { isAuthenticated } = useAuth();

  if(!isAuthenticated){
    return <Navigate to="/"/>;
  }
  return children;
};
export default AdminRoute;