import instance from "./axios";

const login = (data) => {
  return instance({
    url: "/users/login",
    data,
    method: "POST",
  });
};

const current = () => {
  return instance({
    url: "/users/current",
    method: "GET",
  });
};

export { login, current };
