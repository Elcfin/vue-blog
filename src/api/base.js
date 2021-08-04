import instance from "./axios";

const postRequest = (url, data) => {
  return instance({
    url,
    data,
    method: "POST",
  });
};

const getRequest = (url) => {
  return instance({
    url,
    method: "GET",
  });
};

export { postRequest, getRequest };
