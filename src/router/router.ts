import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Inventory from "../views/Inventory.vue";
import Login from "../views/Login.vue";
import { useAuthStore } from "../stores/authStore.ts";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/inventory",
    name: "inventory",
    component: Inventory,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to) => {
  const auth = useAuthStore();
  auth.initialize(); // Initialize user state from localStorage

  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);

  if (authRequired && !auth.user) {
    auth.returnUrl = to.fullPath; // Store the intended route for redirection after login
    return '/login'; // Redirect to login page
  }
});


export default router;
