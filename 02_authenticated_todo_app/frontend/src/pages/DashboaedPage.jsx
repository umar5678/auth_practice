import React from "react";
import { useAuth } from "../context/AuthContext";

const DashboaedPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard Page</h1>
      <p>User id: {user?._id}</p>
      <p>User email: {user?.email}</p>
    </div>
  );
};

export default DashboaedPage;
