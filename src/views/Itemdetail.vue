<template>
  <div class="flex flex-col justify-center items-center">
    <img :src="item.image" alt="" class="w-16 h-16" />
    <h1>{{item.title}}</h1>
    <h2>{{item.price}}</h2>
    <p>{{item.description}}</p>
    <p>{{item.category}}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const id = route.params.id;
const item = ref({});

onMounted(() => {
  fetchItem();
});

const fetchItem = async () => {
  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    item.value = response.data;
  } catch (error) {
    alert(error);
  }
};
</script>

<style scoped></style>
