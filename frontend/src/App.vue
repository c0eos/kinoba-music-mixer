<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" class="font-bold">Home</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
