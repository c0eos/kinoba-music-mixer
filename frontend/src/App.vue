<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderView from "@/views/HeaderView.vue";
import Modal from "@/components/Modal.vue";
import { provide, ref } from "vue";

const message = ref("");
provide("message", message);
</script>

<template>
  <HeaderView />

  <Modal :message="message" />

  <main class="container mx-auto">
    <RouterView />
  </main>
</template>
