import React, { useEffect, useState } from "react";

const uri = import.meta.env.VITE_SERVER_URI;

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make a request to your backend to check if the user is logged in and get their info
    fetch(`${uri}/api/user/dashboard`) // Example API endpoint
      .then((res) => res.json())
      .then((userData) => {
        console.log(userData);
        setUser(userData);
      })
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  if (!user) {
    return <div>Loading...</div>; // Or redirect to login
  }

  return (
    <div>
      <h1>Welcome, {user.message}!</h1>
      {/* ... your dashboard content ... */}
    </div>
  );
};

export default Dashboard;
