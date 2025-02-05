import React from "react";
const URI = import.meta.env.VITE_SERVER_URI;
import Button from "./ui/Button"

const SSOLogin = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${URI}/user/auth/google`;
  };

  return (
    <div className="flex item center justify-between flex-wrap max-w-sm mx-auto gap-2 pb-6" >
      <Button onClick={handleGoogleLogin}>Continue with Google</Button>
      <Button>Continue with Github</Button>
    </div>
  );
};

export default SSOLogin;
