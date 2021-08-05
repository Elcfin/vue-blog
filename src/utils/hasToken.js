import { current as apiCurrent } from "@/api";
import { awaitWraper, processApiError } from "@/utils/";

/* 判断是否持有有效 token */
const hasToken = async () => {
  const res = await awaitWraper(apiCurrent());
  if (res[0]) {
    processApiError(res[0]);
    return false;
  } else {
    console.log("has token");
    return true;
  }
};

export default hasToken;
