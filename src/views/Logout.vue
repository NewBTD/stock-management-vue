<template>
    <div>

    </div>
</template>

<script setup lang="ts">
import {useAuthStore} from "../stores/authStore.ts";

const  authStore = useAuthStore();

authStore.logout();
authStore.log()

</script>

<style scoped>

</style>