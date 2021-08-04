import { postRequest, getRequest } from "./base";

const current = () => {
  return getRequest("/users/current");
};

const login = (data) => {
  return postRequest("/users/login", data);
};

export { login, current };
