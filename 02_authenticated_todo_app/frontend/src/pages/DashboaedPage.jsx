import React from "react";
import { useAuth } from "../context/AuthContext";

const DashboaedPage = () => {
  const { auth } = useAuth();

  console.log(auth.userData)

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>User id: {auth.userId ? auth.userId : ""}</p>
      <p>User email: {auth.userData?.email}</p>
    </div>
  );
};

export default DashboaedPage;
