import { postRequest } from "./base";

const getPageNumber = (data) => {
  return postRequest("/articles/getPageNumber", data);
};

const paging = (data) => {
  return postRequest("/articles/paging", data);
};

const getDraftPageNumber = (data) => {
  return postRequest("/articles/getDraftPageNumber", data);
};

const draftPaging = (data) => {
  return postRequest("/articles/draftPaging", data);
};

const getPublicPageNumber = (data) => {
  return postRequest("/articles/getPublicPageNumber", data);
};

const publicPaging = (data) => {
  return postRequest("/articles/publicPaging", data);
};

const getArticle = (data) => {
  return postRequest("/articles/getArticle", data);
};

const deleteArticle = (data) => {
  return postRequest("/articles/deleteArticle", data);
};

const toDraftArticle = (data) => {
  return postRequest("/articles/toDraftArticle", data);
};

const toPublicArticle = (data) => {
  return postRequest("/articles/toPublicArticle", data);
};

const createArticle = (data) => {
  return postRequest("/articles/createArticle", data);
};

const updateArticle = (data) => {
  return postRequest("/articles/updateArticle", data);
};

export {
  getPageNumber,
  paging,
  getDraftPageNumber,
  draftPaging,
  getPublicPageNumber,
  publicPaging,
  getArticle,
  deleteArticle,
  toDraftArticle,
  toPublicArticle,
  createArticle,
  updateArticle,
};
