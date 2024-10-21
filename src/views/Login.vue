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
const headers = {
  "Content-Type": "application/json",
};

const handleLogin = () => {
  if (userDetail.value.username && userDetail.value.password) {
    console.log(userDetail.value);
    // Simulate an API call for authentication (replace with real API call)
    axios
      .post("https://dummyjson.com/auth/login", userDetail.value, { headers })
      .then((response) => {
        console.log(response.data);
        authStore.login(userDetail.value.username);
        errorMessage.value = "";
        const returnUrl = authStore.returnUrl || "/";
        router.push(returnUrl);
      })
      .catch((error) => {
        console.error(error);
        errorMessage.value = "Invalid username or password";
      });
  }
};
</script>

<style scoped></style>
