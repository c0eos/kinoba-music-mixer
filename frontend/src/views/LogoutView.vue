<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

const user = useUserStore();
const router = useRouter();

function submit() {
  user.logout();
  router.push("/");
}
</script>

<template>
  <div
    class="mx-auto max-w-lg bg-gray-800 rounded-lg p-4 mt-4 flex flex-col items-center"
  >
    <h1 class="font-bold">Logout ?</h1>

    <button
      type="button"
      @click="submit"
      class="mt-6 p-2 rounded bg-gray-900 w-1/3 hover:bg-gray-800 hover:ring hover:ring-gray-400"
    >
      Valider
    </button>
  </div>
</template>
