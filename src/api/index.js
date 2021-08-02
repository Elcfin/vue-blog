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

const getPageNumber = (data) => {
  return instance({
    url: "/articles/getPageNumber",
    data,
    method: "POST",
  });
};

const paging = (data) => {
  return instance({
    url: "/articles/paging",
    data,
    method: "POST",
  });
};

const getDraftPageNumber = (data) => {
  return instance({
    url: "/articles/getDraftPageNumber",
    data,
    method: "POST",
  });
};

const draftPaging = (data) => {
  return instance({
    url: "/articles/draftPaging",
    data,
    method: "POST",
  });
};

const getPublicPageNumber = (data) => {
  return instance({
    url: "/articles/getPublicPageNumber",
    data,
    method: "POST",
  });
};

const publicPaging = (data) => {
  return instance({
    url: "/articles/publicPaging",
    data,
    method: "POST",
  });
};

export {
  login,
  current,
  getPageNumber,
  paging,
  getDraftPageNumber,
  draftPaging,
  getPublicPageNumber,
  publicPaging,
};
