import React from "react";
import { useAuth } from "../context/AuthContext";

const DashboaedPage = () => {
  const { userId, userData } = useAuth();

  console.log(userData)

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>User id: {userId ? userId : ""}</p>
      <p>User email: {userData?.email}</p>
    </div>
  );
};

export default DashboaedPage;
