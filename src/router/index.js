import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/welcome",
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "grade",
        component: () => import("$views/home/childViews/Grade.vue"),
      },
      {
        path: "welcome",
        component: () => import("$views/home/childViews/HomeWelcome.vue"),
      },
      {
        path: "explore",
        component: () => import("$views/home/childViews/Explore.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
