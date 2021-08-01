import { reactive } from "vue";
import { current as apiCurrent } from "@/api";

const currentPage = window.location.hash.slice(2);

const token_status = async () => {
  try {
    await apiCurrent();
    return true;
  } catch (e) {
    console.log(e);
  }
  return false;
};

const state = reactive({
  currentPage,
  token_status,
});

export default state;
