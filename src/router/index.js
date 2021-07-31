import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home", //重定向
  },
  {
    path: "/home",
    name: "Home",
    component: () => Promise.resolve(require("@/components/Home.vue")),
  },
  {
    path: "/about",
    name: "About",
    component: () => Promise.resolve(require("@/components/About.vue")),
  },
  {
    path: "/category",
    name: "Category",
    component: () => Promise.resolve(require("@/components/Category.vue")),
  },
  {
    path: "/article",
    name: "Article",
    component: () => Promise.resolve(require("@/components/Article.vue")),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
