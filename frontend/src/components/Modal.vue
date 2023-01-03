<script setup lang="ts">
import { ref, watch, inject } from "vue";
const props = defineProps(["message"]);

const show = ref(false);
const message = inject("message");

watch(props, (props) => (props.message ? (show.value = true) : false));

function remove() {
  show.value = false;
  message.value = "";
}
</script>

<template>
  <div
    v-if="show"
    class="absolute top-4 left-4 z-50 bg-red-600 opacity-100 rounded p-2 flex"
  >
    <p class="font-bold">{{ props.message }}</p>
    <button @click="remove" type="button" class="ml-4 align-top">x</button>
  </div>
</template>
