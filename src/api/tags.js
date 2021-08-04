import { getRequest } from "./base";

const filterTags = () => {
  return getRequest("/tags/filterTags");
};

const getTags = () => {
  return getRequest("/tags/getTags");
};

export { getTags, filterTags };
