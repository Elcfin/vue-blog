import { reactive } from "vue";
import about from "@/store/about";

const currentPage = window.location.hash.slice(2);

const state = reactive({
  author: "Elcfin",
  title: "Elcfin's Blog",
  subTitle: "仲夏夜茫 七月未央",
  description: "",
  about,
  chart: require("@/assets/chart.jpg"),
  pagingSize: 6,
  currentPage,
});

export default state;
