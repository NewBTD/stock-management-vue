<script setup lang="ts">
import Nav from "./components/Nav.vue";
import { useRoute } from 'vue-router';

const route = useRoute();
const isLoginRoute = route.name === 'login'; // Check if the current route is 'Login'

console.log(console.log(route.name));
</script>

<template>
  <div v-if="!isLoginRoute" class="hidden lg:grid lg:grid-cols-12 dark:bg-slate-500 dark:text-white">
    <nav class="lg:col-span-2">
      <Nav></Nav>
    </nav>
    <main class="lg:col-span-10">
      <router-view></router-view >
    </main>
  </div>
  <div v-else class="dark:bg-slate-500 dark:text-white">
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
