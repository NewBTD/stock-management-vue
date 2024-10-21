<template>
  <div class="container mx-auto">
    <h1 class="text-3xl font-bold my-8">Inventory</h1>
    <div class="flex justify-end gap-4">
      <button @click="handleModal" class="px-4 py-2 bg-red-200">
        Add Product
      </button>
      <button class="px-4 py-2 bg-red-200">Filters</button>
      <button class="px-4 py-2 bg-red-200">Download All</button>
      <button @click="handleEditorMode" class="px-4 py-2 bg-red-200">
        Editor Mode
      </button>
    </div>
    <table class="w-full" :class="loading ? 'animate-pulse' : ''">
      <thead>
        <tr class="bg-gray-600 text-white">
          <th class="px-6 py-3">Title</th>
          <th class="px-6 py-3">Price</th>
          <th class="px-6 py-3">Description</th>
          <th class="px-6 py-3">Category</th>
          <th class="px-6 py-3">Image</th>
          <th class="px-6 py-3" v-if="isEditorMode">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-gray-700 bg-gray-800 text-white"
          v-for="product in products"
          :key="product.id"
        >
          <td class="px-4 py-2">
            {{ product.title }}
          </td>
          <td class="px-4 py-2">{{ product.price }}</td>
          <td class="px-4 py-2">
            {{ product.description }}
          </td>

          <td class="px-4 py-2">{{ product.category }}</td>
          <td class="px-4 py-2">
            <img :src="product.image" alt="" class="w-16 h-16" />
          </td>
          <td v-if="isEditorMode">
            <div class="flex gap-2">
              <button
                @click="removeProduct(product.id)"
                class="px-2 py-1 bg-red-700 text-white"
              >
                x
              </button>
              <button
                @click="editProduct(product.id)"
                class="px-2 py-1 bg-yellow-700 text-white"
              >
                Edit
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

    <Teleport to="body">
        <EditProduct v-if="isEditModalOpen" :editingProduct="editingProduct" @close="closeEditModal" :items="categories" />
        <!-- <div v-if="isEditModalOpen">
            
        </div> -->
    </Teleport>
  <Teleport to="body">
    <div
      v-if="isAddModalOpen"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white p-4 w-[30%] rounded-lg">
        <h2>Add Items</h2>
        <form class="flex flex-col gap-2">
          <input
            v-model="newProduct.title"
            type="text"
            placeholder="Title"
            class="p-2 border"
          />
          <input
            v-model="newProduct.price"
            type="num"
            placeholder="Price"
            class="p-2 border"
          />
          <textarea
            v-model="newProduct.description"
            placeholder="Description..."
            class="p-2 border"
          ></textarea>
          <AutocompleteProduct
            :items="categories"
            :newProductValue="newProduct"
            @update:value="handleUpdate"
          />
        </form>
        <button @click="addProduct">Add Product</button>
        <button @click="handleModal">Close</button>
      </div>
    </div>
  </Teleport>

</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import axios from "axios";
import AutocompleteProduct from "../components/Autocomplete-Product.vue";
import EditProduct from "../components/EditProduct.vue";
import Product from "../types/Product";

const headers = {
  Authorization: "Bearer SOME-VALUE",
};
const loading = ref(false);
const products = ref([]);
const editingProduct = ref({});
const isAddModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isEditorMode = ref(false);

onMounted(() => {
  // Fetch products
  axios
    .get("https://fakestoreapi.com/products", { headers })
    .then((response) => {
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      products.value = response.data;
      loading.value = false;
      console.log(("products", products.value));
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });

  // Fetch categories
  axios
    .get("https://fakestoreapi.com/products/categories", { headers })
    .then((response) => {
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      categories.value = response.data;
      console.log(("categories", categories.value));
    });
});

const handleModal = () => {
  isAddModalOpen.value = !isAddModalOpen.value;
};
const closeEditModal = () => {
    isEditModalOpen.value = !isEditModalOpen.value;
}
const newProduct: Product = ref({
  title: "",
  price: 0,
  description: "",
  category: "",
});
const categories = ref([]);

const handleUpdate = (newValue) => {
  newProduct.value = newValue;
};

const handleEditorMode = () => {
  isEditorMode.value = !isEditorMode.value;
};

const addProduct = () => {
  axios
    .post("https://fakestoreapi.com/products", newProduct.value, { headers })
    .then((response) => {
      console.log("Response Status:", response.status);
      console.log("Response Data:", response.data);
      products.value.push(response.data);
      newProduct.value = {
        title: "",
        price: 0,
        description: "",
        category: "",
      };
      handleModal();
      alert("Product added successfully!");
    })
    .catch((error) => {
      console.error("Error:", error.message);
    });
};

const removeProduct = (id) => {
  const isDelete = confirm("Are you sure you want to remove this product?");
  if (isDelete) {
    axios
      .delete(`https://fakestoreapi.com/products/${id}`, { headers })
      .then((response) => {
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
        products.value = products.value.filter((item) => item.id !== id);
        alert("Product removed successfully!");
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  }
};

const editProduct = (id) => {
    isEditModalOpen.value = !isEditModalOpen.value;
    const product = products.value.filter((item) => item.id === id)[0];
    editingProduct.value = product;
};
</script>

<style scoped></style>
