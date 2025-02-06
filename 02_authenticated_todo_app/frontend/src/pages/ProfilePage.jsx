import React from "react";
import Profile from "../components/Profile";
import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { auth } = useAuth();

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold pb-6">Profile</h1>

      <Profile user={auth.userData} />
      {/* display bio  */}

      {/* update bio */}

    </div>
  );
};

export default ProfilePage;
