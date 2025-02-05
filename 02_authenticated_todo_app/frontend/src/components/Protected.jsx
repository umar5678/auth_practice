import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import Loader from "./Loader"

const Protected = ({ children }) => {

  const { isLoggedIn, loading } = useAuth() 
  console.log(isLoggedIn, loading);


  if(loading) return <Loader/>

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children; // Return Outlet if logged in
};

export default Protected;
