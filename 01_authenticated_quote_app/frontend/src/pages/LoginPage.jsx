import React from "react";
import Login from "../components/Login";
import Container from "../components/Container"
const LoginPage = () => {
  return (
    <div className="w-full py-8">
      <Container>
        <div className=" my-auto">
          <Login />
        </div>
      </Container>
    </div>
  );
};

export default LoginPage;
