import React from "react";

const uri = import.meta.env.VITE_SERVER_URI;

const Login = () => {
  const handleLogin = () => {
    window.location.href = `${uri}/user/auth/google`;
    // Redirect to the Google Auth route on your backend
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
