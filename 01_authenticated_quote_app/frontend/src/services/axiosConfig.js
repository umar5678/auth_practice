import axios from "axios";

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

export default axiosConfig;
