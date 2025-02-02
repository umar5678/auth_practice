import React from "react";
import Login from "../components/Login";
import Container from "../components/Container"
import SSOLogins from "../components/SSOLogins";
const LoginPage = () => {
  return (
    <div className="w-full py-8">
      <Container>
        <div className=" my-auto">
          <SSOLogins/>
          <Login />
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
