import Vue from "vue";
import Router from "vue-router";
import store from "../store/index";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Diaries.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/About.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/Login.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/Register.vue"),
      meta: {
        requiresGuest: true,
      },
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/Profile.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/diaries",
      name: "diaries",
      component: () => import("../views/Diaries.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/diaries/:diaryId",
      name: "diary",
      component: () => import("../views/Diary.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/createDiary",
      name: "createDiary",
      component: () => import("../views/CreateDiary.vue"),
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters.isLoggedIn) {
      // Redirect to Login page
      next("/login");
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (store.getters.isLoggedIn) {
      // Redirect to Profile page
      next("/profile");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
