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
    path: "/write",
    name: "write",
    component: () => Promise.resolve(require("@/components/WriteArticle.vue")),
  },
  {
    path: "/article/:id",
    name: "article",
    component: () => Promise.resolve(require("@/components/Article.vue")),
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

/* 全局路由守卫 */
router.beforeEach(async (to, from, next) => {
  if (to.name === "manager") {
    const isToken = await hasToken();
    if (!isToken) {
      state.currentPage = "login";
      return next({ name: "login" });
    }
  }
  next();
});

export default router;
