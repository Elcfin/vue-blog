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

const getTags = (data) => {
  return instance({
    url: "/tags/getTags",
    data,
    method: "GET",
  });
};

const filterTags = () => {
  return instance({
    url: "/tags/filterTags",
    method: "GET",
  });
};

const filterHomeArticle = (data) => {
  return instance({
    url: "/articles/filterHomeArticle",
    data,
    method: "POST",
  });
};

const getArticle = (data) => {
  return instance({
    url: "/articles/getArticle",
    data,
    method: "POST",
  });
};

const deleteArticle = (data) => {
  return instance({
    url: "/articles/deleteArticle",
    data,
    method: "POST",
  });
};

const toDraftArticle = (data) => {
  return instance({
    url: "/articles/toDraftArticle",
    data,
    method: "POST",
  });
};

const toPublicArticle = (data) => {
  return instance({
    url: "/articles/toPublicArticle",
    data,
    method: "POST",
  });
};

const createArticle = (data) => {
  return instance({
    url: "/articles/createArticle",
    data,
    method: "POST",
  });
};

const updateArticle = (data) => {
  return instance({
    url: "/articles/updateArticle",
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
  getTags,
  filterTags,
  filterHomeArticle,
  getArticle,
  deleteArticle,
  toDraftArticle,
  toPublicArticle,
  createArticle,
  updateArticle,
};
