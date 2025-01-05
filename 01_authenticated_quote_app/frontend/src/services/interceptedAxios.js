import axiosConfig from "./axiosConfig";
import axios from "axios";

const interceptedAxios = axiosConfig;

interceptedAxios.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log("req interceptor", accessToken);
    }
    return config; // Ensure return of modified config
  },
  (error) => {
    return Promise.reject(error);
  }
);

interceptedAxios.interceptors.response.use(
  (response) => {
    console.log("res interceptor step 1", response);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

        try {
          console.log("step 2")
        // sessionStorage.clear();
        const response = await axiosConfig.post(
          `/user/refresh-token`
        );

            const newAccesToken = response.data.data.accessToken;
            console.log(newAccesToken)
        sessionStorage.setItem("accessToken", newAccesToken);
        originalRequest.headers.Authorization = `Bearer ${newAccesToken}`;

        // return axios.get(originalRequest);
      } catch (error) {
        sessionStorage.clear();
        console.log("response interceptor error", error);
        // window.location.href = "/";
        return Promise.reject(error);
      }
    }
  }
);

export default interceptedAxios;
