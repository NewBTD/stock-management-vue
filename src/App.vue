<script setup lang="ts">
import Nav from "./components/Nav.vue";
</script>

<template>
  <div class="hidden lg:grid lg:grid-cols-12 dark:bg-slate-500 dark:text-white">
    <nav class="lg:col-span-2">
      <Nav></Nav>
    </nav>
    <main class="lg:col-span-10">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
