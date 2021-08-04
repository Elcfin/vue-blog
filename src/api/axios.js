import axios from "axios";

/* 设置基础路径 */
const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

/* 请求拦截 */
instance.interceptors.request.use((config) => {
  /* 设置 token */
  const token = window.sessionStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  }

  console.log(config.url + " loading");
  return config;
});

/* 响应拦截 */
instance.interceptors.response.use((config) => {
  console.log(config.config.url + " finished");
  return config;
});

export default instance;
