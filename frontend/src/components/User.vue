<script setup lang="ts">
import { ref, defineProps } from "vue";

const props = defineProps(["submit", "title"]);

const email = ref("");
const password = ref("");

function submit() {
  props.submit({ email: email.value, password: password.value });
}
</script>

<template>
  <div class="mx-auto max-w-lg bg-gray-800 rounded-lg p-4 mt-4">
    <h1 class="mx-auto text-center font-bold">{{ title }}</h1>

    <form
      @submit.prevent="submit"
      class="flex flex-col items-center justify-center pt-4 pb-2"
    >
      <input
        type="email"
        v-model="email"
        required
        placeholder="Email"
        class="border border-gray-600 rounded p-2 mb-4 bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
      />
      <input
        type="password"
        v-model="password"
        required
        placeholder="Mot de passe"
        class="border border-gray-600 rounded p-2 mb-4 bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
      />
      <button
        type="submit"
        class="mt-2 p-2 rounded bg-gray-900 w-1/3 hover:bg-gray-800 hover:ring hover:ring-gray-400"
      >
        Valider
      </button>
    </form>
  </div>
</template>
