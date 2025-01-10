import React, { useEffect, useState } from "react";
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
        setError("");

        if (token) {
          // If token exists, set isLoggedIn and attempt a refresh
          const response = await generalApi.post("/user/refresh-token");
          const newAccessToken = response.data?.data?.accessToken;

          if (newAccessToken) {
            sessionStorage.setItem("accessToken", newAccessToken);
            setIsLoggedIn(true);
          } else {
            sessionStorage.removeItem("accessToken");
            setIsLoggedIn(false);
          }
        } else {
          // Attempt to refresh even without a token in sessionStorage
          const response = await generalApi.post("/user/refresh-token");
          const newAccessToken = response.data?.data?.accessToken;

          if (newAccessToken) {
            sessionStorage.setItem("accessToken", newAccessToken);
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        }
      } catch (error) {
        if (error.response?.status === 401) {
          console.error("Authentication error:", error);
        } else {
          console.error("Network or other error:", error);
        }
        sessionStorage.removeItem("accessToken");
        setIsLoggedIn(false);
        // setError(
        //   error.response?.data?.message + " login again" ||
        //     "Authentication error:"
        // );
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
