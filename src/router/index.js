import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: "/home", //重定向
  },
  {
    path: "/home",
    name: "home",
    component: () => Promise.resolve(require("@/components/Home.vue")),
  },
  {
    path: "/about",
    name: "about",
    component: () => Promise.resolve(require("@/components/About.vue")),
  },
  {
    path: "/category",
    name: "category",
    component: () => Promise.resolve(require("@/components/Category.vue")),
  },
  {
    path: "/article",
    name: "article",
    component: () => Promise.resolve(require("@/components/Article.vue")),
  },
  {
    path: "/login",
    name: "login",
    component: () => Promise.resolve(require("@/components/Login.vue")),
  },
  {
    path: "/manager",
    name: "manager",
    component: () => Promise.resolve(require("@/components/Manager.vue")),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
