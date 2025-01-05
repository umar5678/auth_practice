import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { getQuote } from "../services/quoteApi";

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quote, setQuote] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    if (!token)
      setIsLoggedIn(false)
    else setIsLoggedIn(true)
  })

  const handleGetQuote = () => {
    setLoading(true)
    getQuote().then((response) => {
      console.log(response)
      setQuote(response.data)
      setLoading(false)
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <div className="w-full mx-auto">
      <Container>
        {isLoggedIn ? (
          <>
          <h1>User is logged in</h1>
          <button className="p-4 bg-violet-700 rounded-xl mt-6" onClick={handleGetQuote}>Get Quote of the day</button>
              <p>{quote }</p>
          </>
        ) : (
            <>
            <h1>User is not logged in, please login</h1>
              
            </>
        )}
      </Container>
    </div>
  );
};

export default HomePage;
