import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 
import Loader from "./Loader"

const Protected = ({ children }) => {

  const { auth } = useAuth() 
  console.log(auth.isLoggedIn, auth.loading);


  if(auth.loading) return <Loader/>

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children; // Return Outlet if logged in
};

export default Protected;
