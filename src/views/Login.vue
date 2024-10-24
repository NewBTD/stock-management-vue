<template>
  <div class="flex justify-center items-center h-screen text-black">
    <form @submit.prevent="handleLogin" class="flex flex-col">
      <input
        v-model="userDetail.username"
        type="text"
        placeholder="Username"
        required
        class="mb-2 p-2 border rounded text-black"
      />
      <input
        v-model="userDetail.password"
        type="password"
        placeholder="Password"
        required
        class="mb-2 p-2 border rounded text-black"
      />
      <button
        @click="handleLogin"
        type="submit"
        class="bg-blue-500 text-white p-2 rounded"
      >
        Login
      </button>
    </form>
    <p v-if="errorMessage" class="text-red-500 mt-2">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import axios from "axios";

const router = useRouter();
const userDetail = ref({
  username: "",
  password: "",
});
const errorMessage = ref("");
const authStore = useAuthStore();


const handleLogin = async () => {
  const {success} = await authStore.login(userDetail.value.username, userDetail.value.password);
  success? router.push("/") : errorMessage.value = "Invalid username or password";
};
</script>

<style scoped></style>
