import React from "react";
import { generalApi } from "../services/api";
import { ssoAuthService } from "../services/authServices";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";

const SSOLogins = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_SERVER_URI}${
      ssoAuthService.GOOGLE_SSO_REDIRECT_URL
    }`;
  };
 

  const handleGithubLogin = () => {
    console.log("Github login");
  };

  return (
    <div className="max-w-sm mx-auto flex flex-col items-center gap-3 pb-4">
      <div className="w-full  py-3 flex justify-center bg-gray-50 hover:bg-gray-100 rounded-md">
        <button onClick={handleGoogleLogin}>
          {<FcGoogle className="text-4xl" text-4xl />}
        </button>
      </div>
      <div className="w-full py-3 flex justify-center bg-gray-50 hover:bg-gray-100 rounded-md">
        <button onClick={handleGithubLogin}>
          {<FaGithub className="text-4xl" />}
        </button>
      </div>
    </div>
  );
};

export default SSOLogins;
