import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Container from "../components/Container";
import { getQuote } from "../services/quoteApi";
import { Link } from "react-router-dom";
import { generalApi } from "../services/api";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quote, setQuote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const initializeAuthState = async () => {
      try {
        const token = sessionStorage.getItem("accessToken");
        console.log("this is token: ", token);
        setError("");

        if (token) {
          try {
            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            if (decodedToken.exp > currentTime) {
              setIsLoggedIn(true);
              console.log("token is valid and returning");
              return; // Token is valid, exit early
            }
          } catch (decodeError) {
            // Token decoding error, remove invalid token
            console.error("Token decoding error:", decodeError);
            sessionStorage.removeItem("accessToken");
          }
        }

        // Only reach here if no token or token is expired/invalid
        try {
          const response = await generalApi.post("/user/refresh-token");
          const newAccessToken = response.data?.data?.accessToken;
          console.log("token refreshed: ", newAccessToken);
          if (newAccessToken) {
            sessionStorage.removeItem("accessToken");
            sessionStorage.setItem("accessToken", newAccessToken);
            setIsLoggedIn(true);
          } else {
            // Refresh failed, clear token and set logged out
            sessionStorage.removeItem("accessToken");
            setIsLoggedIn(false);
            setError("Session expired. Please log in again."); // Set the error
          }
        } catch (refreshError) {
          // Handle refresh error, clear token and set logged out
          console.error("Error refreshing token:", refreshError);
          sessionStorage.removeItem("accessToken");
          setIsLoggedIn(false);
          setError("Session expired. Please log in again."); // Set the error
        }
      } catch (overallError) {
        console.error("Overall authentication error:", overallError);
        sessionStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        setError("An unexpected error occurred. Please try again.");
      }
    };

    initializeAuthState();
  }, []);
  // Add an empty dependency array to run the effect only once on component mount

  const handleGetQuote = async () => {
    setLoading(true);
    setError(""); // Clear previous errors
    try {
      const response = await getQuote();
      setQuote(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch the quote");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto">
      <Container>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {isLoggedIn ? (
          <div className="text-center">
            <h1 className="text-xl font-bold">Welcome back!</h1>
            <button
              className="p-4 bg-violet-700 text-white rounded-xl mt-6 hover:bg-violet-800"
              onClick={handleGetQuote}
              disabled={loading}
            >
              {loading ? "Loading..." : "Get Quote of the Day"}
            </button>
            {quote && (
              <p className="mt-4 text-lg italic dark:text-gray-200">
                "{quote}"
              </p>
            )}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-xl font-bold text-gray-700">
              You are not logged in
            </h1>
            <Link
              to="/login"
              className="text-violet-700 underline hover:text-violet-900"
            >
              Login
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
