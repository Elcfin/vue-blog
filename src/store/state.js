import { reactive } from "vue";
import about from "./about";

const currentPage = window.location.hash.slice(2);

const state = reactive({
  title: "Elcfin's Blog",
  subTitle: "仲夏夜茫 七月未央",
  author: "Elcfin",
  profile: require("@/assets/leaf.jpg"),
  description: "简介",
  about,
  chart: require("@/assets/chart.jpg"),
  pagingSize: 8,
  currentPage,
});

export default state;
