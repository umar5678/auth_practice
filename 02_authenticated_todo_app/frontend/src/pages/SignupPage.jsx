import React from "react";
import Signup from "../components/Signup";
import Container from "../components/Container";

const SignupPage = () => {
  return (
    <div className="w-full py-8">
      <Container>
        <div className=" my-auto">
          <Signup/>
        </div>
      </Container>
    </div>
  );
};

export default SignupPage;
