import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";

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
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
