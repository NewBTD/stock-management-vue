<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="bg-white p-4 w-[30%] rounded-lg">
      <h2>Edit Item</h2>
      <form class="flex flex-col gap-2">
        <input
          v-model="props.editingProduct.title"
          type="text"
          placeholder="Title"
          class="p-2 border"
        />
        <input
          v-model="props.editingProduct.price"
          type="num"
          placeholder="Price"
          class="p-2 border"
        />
        <textarea
          v-model="props.editingProduct.description"
          placeholder="Description..."
          class="p-2 border"
          rows="4"
        ></textarea>
        <AutocompleteProduct
          :items="categories"
          :newProductValue="product"
          @update:value="handleUpdate"
        />
      </form>
      <button @click="editProduct">Edit Product</button>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from "vue";
import axios from "axios";
import AutocompleteProduct from "./Autocomplete-Product.vue";
const props = defineProps({
    editingProduct: {
        type: Object,
        required: true,
    },
    items: {
        type: Array,
        required: true,
    },
})
const emit = defineEmits(['close']);

const close = () => {
  emit('close'); // Emit the close event to the parent
};

const product = ref(props.editingProduct)
const categories = ref(props.items)
const handleUpdate = (newValue) => {
  product.value = newValue;
};

const editProduct = () => {
    axios
        .put(`https://fakestoreapi.com/products/${props.editingProduct.id}`, product.value)
        .then((response) => {
            console.log("Response Status:", response.status);
            console.log("Response Data:", response.data);
            alert("Product edited successfully!");
        })
        .catch((error) => {
            console.error("Error:", error.message);
        });
}


// onMounted(() => {
//     console.log("Editing Product:", props.editingProduct);
//     console.log("Categories:", categories.value);
// })


</script>

<style scoped></style>
