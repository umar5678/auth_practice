import axios from "axios";

const url = import.meta.env.VITE_SERVER_URI;

const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export const signupService = async (data) => {
  try {
    const response = await axios.post(`${url}/user/signup`, data);
    return response;
  } catch (error) {
    console.log("service", error);
    throw error;
  }
};

export const loginService = async (data) => {
  try {
    const response = await axios.post(`${url}/user/login`, data, config);
    sessionStorage.removeItem('accessToken')
    const accessToken = response.data.data.accessToken
    sessionStorage.setItem('accessToken', accessToken)
    return response;
  } catch (error) {
    console.error("Login error", error);
    throw error;
  }
};

export const logoutService = async () => {
  try {
    const response = await axios.post(`${url}/user/logout`, {
      withCredentials: true,
    });
    sessionStorage.clear()
    window.location.href = "/login"
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
