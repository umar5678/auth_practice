import {

  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { jwtDecode }from "jwt-decode";
import { generalApi } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // define initilizeAuthState function

    // get access token from sessionStorage
    //   if token is present>
    // try to decode it and check if it si not expired
    // if valid: set user the decode token
    // setIsLoggedIn true
    // setLoading false and return
    // also use try catch for this login

    // no token availble , try o refresh it
    // call refresh endpoint
    // get nre refreshtken store it in session storage
    // set loading, user and loggedin states
    // else dont set them
    // try to catch errro of this login
    // then catch over all error
    // at the end set loading false

    // call initilizeAuthState at last

    const initializeAuthState = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("accessToken");
        setError("");
        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp > currentTime) {
              setIsLoggedIn(true);
              setUser(decodedToken);
              setLoading(false);
              return;
            }
          } catch (decodeError) {
            console.error("Token decoding error:", decodeError);
            sessionStorage.removeItem("accessToken");
          }
        }
        // No valid token, try to refresh it
        try {
          const response = await generalApi.post("/user/auth/refresh-token");
          const newAccessToken = response.data?.data?.accessToken;

          if (newAccessToken) {
            sessionStorage.setItem("accessToken", newAccessToken);
            const newDecodedToken = jwtDecode(newAccessToken);
            setUser(newDecodedToken); // Update user data
            setIsLoggedIn(true);
          } else {
            sessionStorage.removeItem("accessToken");
            setIsLoggedIn(false);
            setUser(null);
            setError("Session expired. Please log in again.");
          }
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          sessionStorage.removeItem("accessToken");
          setIsLoggedIn(false);
          setUser(null);
          setError("Session expired. Please log in again.");
        }
      } catch (overallError) {
        console.log(
          "overall error from authContext useeffect : ",
          overallError
        );
        sessionStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setError("An unexpected error occurred. Please try again.");
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuthState();
  }, []);

  return (
    // auth provider return authContext provided with these values
    <AuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, loading, error, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
