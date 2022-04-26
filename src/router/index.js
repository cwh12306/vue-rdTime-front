import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home/Home.vue";
import Login from "../views/login/Login.vue";
import PersonalCenter from "../views/personalCenter/PersonalCenter.vue";
import Insert from "$views/personalCenter/childViews/Insert.vue";
import Delete from "$views/personalCenter/childViews/Delete.vue";
import Update from "$views/personalCenter/childViews/Update.vue";
import Comment from "$views/personalCenter/childViews/Comment.vue";

import UserComment from "$views/personalCenter/childViews/UserComment.vue";
import UserHistory from "$views/personalCenter/childViews/UserHistory.vue";

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
  {
    path: "/personalCenter",
    name: "PersonalCenter",
    component: PersonalCenter,
    children: [
      {
        path: "insert",
        components: {
          personalCenterTab: Insert,
        },
      },
      {
        path: "delete",
        components: {
          personalCenterTab: Delete,
        },
      },
      {
        path: "update",
        components: {
          personalCenterTab: Update,
        },
      },
      {
        path: "comment",
        components: {
          personalCenterTab: Comment,
        },
      },
      {
        path: "userComment",
        components: {
          personalCenterTab: UserComment,
        },
      },
      {
        path: "userHistory",
        components: {
          personalCenterTab: UserHistory,
        },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
    location.reload();
  }
});

export default router;
