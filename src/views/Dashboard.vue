<template>
    <div>
        <h1 class="text-red-600">Dashboard</h1>
    </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "../stores/authStore.ts" 

const authStore = useAuthStore();

</script>

<style scoped>

</style>