import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/Dashboard.vue";
import Inventory from "../views/Inventory.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Itemdetail from "../views/Itemdetail.vue";
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
    children: [
      {
        path: "item/:id",
        name: "itemdetail",
        component: Itemdetail
      },
    ]
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
  }
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();
  console.log("hello from before each")
  console.log(authStore.token);
  // Redirect to login if accessing protected routes without being authenticated
  if (to.path !== '/login' && !authStore.token) {
    return '/login';
  }
});


export default router;
