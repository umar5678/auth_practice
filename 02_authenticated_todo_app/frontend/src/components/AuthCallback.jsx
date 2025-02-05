import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { setIsLoggedIn, setUser, setLoading } = useAuth();

  const accessToken = searchParams.get("accessToken");
   
  console.log(accessToken)
    
  useEffect(() => {
      setLoading(true)

    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
  

      try {
        const decodedUser = jwtDecode(accessToken);
        setUser(decodedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }

      // Redirect to the dashboard after setting the token
      navigate("/dashboard");
    } else {
      navigate("/login"); // Redirect to login if no token is found
    }
      setLoading(false)
  }, [searchParams, navigate, setIsLoggedIn, setUser]);

  return <p>Processing login...</p>;
};

export default AuthCallback;
