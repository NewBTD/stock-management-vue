<template>
    <div>
    </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "../stores/authStore.ts";

const authStore = useAuthStore();

authStore.logout();

</script>

<style scoped>

</style>