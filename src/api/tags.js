import { getRequest } from "./base";

const filterTags = () => {
  return getRequest("/tags/filterTags");
};

const getTags = () => {
  return getRequest("/tags/getTags");
};

const getPublicTags = () => {
  return getRequest("/tags/getPublicTags");
};

export { getTags, filterTags, getPublicTags };
