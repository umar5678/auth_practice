import { generalApi } from "./api";

// user auth endpoint

const userAuthEndpoint = "/user/auth";

// Service for user signup
export const signupService = async (data) => {
  try {
    const response = await generalApi.post(`${userAuthEndpoint}/signup`, data);
    return response;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error;
  }
};

// Service for user login
export const loginService = async (data) => {
  try {
    const response = await generalApi.post(`${userAuthEndpoint}/login`, data);

    // Handle token storage
    const accessToken = response?.data?.data?.accessToken;
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
    } else {
      console.warn("No access token found in login response");
    }
    return response;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// Service for user logout
export const logoutService = async () => {
  try {
    const response = await generalApi.post(`${userAuthEndpoint}/logout`);

    // Clear session storage and redirect
    sessionStorage.clear();
    window.location.href = "/login";

    return response;
  } catch (error) {
    console.error("Logout error:", error.message);
    throw error;
  }
};

// later , this time  i am waiting for redirect url from backend

// class SSOAuthService {
//   constructor() {
//     this.baseEndpoint = "/auth";
//   }

//   // Service for Google login
//   googleLogin = async () => {
//     try {
//       const response = await generalApi.get(`${this.baseEndpoint}/google`);
//       return response;
//     } catch (error) {
//       console.error("Google login error:", error.message);
//       throw error;
//     }
//   };

//   // Service for Github login
//   githubLogin = async () => {
//     try {
//       const response = await generalApi.get(`${this.baseEndpoint}/github`);
//       return response;
//     } catch (error) {
//       console.error("Github login error:", error.message);
//       throw error;
//     }
//   };
// }

// generalApi baseURL: import.meta.env.VITE_SERVER_URI >> http://localhost:3000/api/v1

class SSOAuthService {
  GOOGLE_SSO_REDIRECT_URL = `${userAuthEndpoint}/google`;
  GITHUB_SSO_REDIRECT_URL = `${userAuthEndpoint}/github`;
}

export const ssoAuthService = new SSOAuthService();
