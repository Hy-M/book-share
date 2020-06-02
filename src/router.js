// src/router.js
import VueRouter from "vue-router";
import Vue from "vue";
import Home from "./components/Home";
import Profile from "./components/Profile";
import Auth from "./components/Auth";
import ForgotPassword from "./components/ForgotPassword";
import SingleBook from "./views/SingleBook";

const routes = [
  { path: "/", component: Home },
  {
    path: "/browse/:user/:book_title",
    name: "SingleBook",
    component: SingleBook
  },
  { path: "/auth", component: Auth },
  { path: "/profile", component: Profile, meta: { requiresAuth: true } },
  { path: "/ForgotPassword", component: ForgotPassword },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ "./views/About.vue")
  }
];

const router = new VueRouter({
  routes
});

//beforeResolve guard is a built in component from Vue Router, called right before navigation is confirmed
//it checks right before navigation is confirmed to check if user is confirmed
//if authenticated they can go onto to next router or redirected to sign up sign
router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
      .then(data => {
        if (data && data.signInUserSession) {
          user = data;
        }
        next();
      })
      .catch(e => {
        next({
          path: "/auth"
        });
      });
  }
  next();
});

export default router;
