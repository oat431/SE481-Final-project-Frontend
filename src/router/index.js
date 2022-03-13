import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Search from "../views/SearchBar.vue";
import RecipeDetails from "../views/RecipeDetails.vue";
import Profile from "../views/Profile.vue";
import FoodAPI from "../services/FoodAPI.js";
import GlobalState from "../store/index.js";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/search",
    name: "ssearch",
    component: Search,
  },
  {
    path: "/details/:id",
    name: "recipeDetails",
    component: RecipeDetails,
    props: true,
    beforeEnter: (to) => {
      return FoodAPI.getById(to.params.id) // Return and params.id
        .then((response) => {
          // Still need to set the data here
          console.log(response);
          GlobalState.details = response; // <--- Store the event
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: Profile,
    props: true,
    beforeEnter: (to) => {
      return FoodAPI.getUserById(to.params.id)
        .then((response) => {
          console.log(response);
          GlobalState.mark = response.mark;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
