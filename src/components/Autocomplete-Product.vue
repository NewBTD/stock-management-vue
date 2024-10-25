<template>
  <div class="relative">
    <input
      type="text"
      v-model="searchTerm.category"
      @input="onInput"
      @focus="isOpen = true"
      class="border p-2 w-full rounded"
      placeholder="Search..."
    />
    <ul
      v-if="isOpen && filteredResults.length"
      class="absolute z-10 bg-white border border-gray-300 w-full rounded mt-1"
    >
      <li
        v-for="(result, index) in filteredResults"
        :key="index"
        @click="selectResult(result)"
        class="p-2 cursor-pointer hover:bg-gray-200"
      >
        {{ result }}
      </li>
    </ul>
    <ul
      v-if="isOpen && !filteredResults.length"
      class="absolute z-10 bg-white border border-gray-300 w-full rounded mt-1"
    >
      <li class="p-2">No results found</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  newProductValue: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:value"]);
const searchTerm = ref(props.newProductValue);

const updateParent = () => {
  emit("update:value", searchTerm.value);
};

// Watch for changes in the prop to update local state
watch(
  () => props.newProductValue,
  (newVal) => {
    searchTerm.value.category = newVal;
  }
);

const isOpen = ref(false);
const filteredResults = computed(() => {
  return props.items.filter((item) =>
    item.toLowerCase().includes(searchTerm.value.category.toLowerCase())
  );
});

const onInput = () => {
  isOpen.value = searchTerm.value.category.length > 0;
};

const selectResult = (result) => {
  searchTerm.value.category = result;
  isOpen.value = false;
};

onMounted(() => {
  console.log(searchTerm.value);
});
</script>

<style scoped></style>
