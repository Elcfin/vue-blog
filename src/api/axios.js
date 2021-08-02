import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

instance.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }
  console.log(config.url + " loading");
  console.log();
  return config;
});

instance.interceptors.response.use((config) => {
  console.log(config.config.url + " finished");
  return config;
});

export default instance;
