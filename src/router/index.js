import { createRouter, createWebHashHistory } from "vue-router";
import { hasToken } from "@/utils";
import { state } from "@/store";

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
    path: "/login",
    name: "login",
    component: () => Promise.resolve(require("@/components/Login.vue")),
  },
  {
    path: "/manager",
    name: "manager",
    component: () => Promise.resolve(require("@/components/Manager.vue")),
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => Promise.resolve(require("@/components/Article.vue")),
  },
  {
    path: "/write",
    name: "write",
    component: () => Promise.resolve(require("@/components/WriteArticle.vue")),
  },
  {
    path: "/edit/:id",
    name: "edit",
    component: () => Promise.resolve(require("@/components/EditArticle.vue")),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const isToken = await hasToken();

  if (to.name === "manager" && !isToken) {
    next({ name: "login" });
    state.currentPage = "login";
  } else next();
});

export default router;
