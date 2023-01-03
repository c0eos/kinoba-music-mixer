<script setup lang="ts">
import { RouterLink } from "vue-router";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
</script>

<template>
  <header class="bg-gray-800">
    <RouterLink to="/">
      <h1 class="mx-auto text-center text-3xl pt-4">Music Mixer</h1>
    </RouterLink>
    <div>
      <nav class="flex justify-end pb-2">
        <div class="flex">
          <RouterLink
            to="/login"
            v-if="!user.isLogged"
            class="font-bold hover:rotate-1 px-4"
            >Login
          </RouterLink>
          <RouterLink
            to="/register"
            v-if="!user.isLogged"
            class="font-bold hover:rotate-1 px-4"
            >Register
          </RouterLink>
          <RouterLink
            to="/logout"
            v-if="user.isLogged"
            class="font-bold hover:rotate-1 px-4"
            >Logout
          </RouterLink>
        </div>
      </nav>
    </div>
  </header>
</template>
