<template>
    <div>
        <button @click="toggleTheme" class="px-4 py-2 bg-red-200">
            Toggle Theme
        </button>
    </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from "../stores/settingsStore";

const settingsStore = useSettingsStore();

const toggleTheme = () => {
    settingsStore.toggleTheme();
};


</script>

<style scoped>

</style>