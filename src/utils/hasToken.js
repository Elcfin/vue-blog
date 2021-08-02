import { current as apiCurrent } from "@/api";

const hasToken = async () => {
  try {
    await apiCurrent();
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
};

export default hasToken;
