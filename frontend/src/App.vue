<script setup lang="ts">
import { RouterView } from "vue-router";
import HeaderView from "@/views/HeaderView.vue";
</script>

<template>
  <HeaderView />

  <main class="container mx-auto">
    <RouterView />
  </main>
</template>
