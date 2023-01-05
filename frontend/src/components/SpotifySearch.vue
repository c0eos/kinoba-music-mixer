<script setup lang="ts">
import { ref } from "vue";
import { search } from "@/backend/spotify";
import Track from "@/components/Track.vue";
import type { Track as ITrack } from "@/types";

const query = ref("");
let searchResults = ref<ITrack[]>([]);

function submit() {
  if (query.value !== "") {
    search(query.value).then((res) => {
      searchResults.value = res;
    });
  }
}
</script>
<template>
  <div class="max-w-2xl mx-auto mt-4">
    <form @submit.prevent="submit" class="flex flex-col w-96 mx-auto">
      <input
        id="search"
        type="text"
        v-model="query"
        placeholder="chercher une musique"
        class="border border-gray-600 rounded p-2 bg-gray-700 focus:outline-none focus:ring focus:ring-gray-400"
      />
      <button
        type="submit"
        class="p-2 mt-2 mx-auto rounded bg-gray-800 w-1/3 hover:ring hover:ring-gray-400"
      >
        Go!
      </button>
    </form>
    <ul class="overflow-y-scroll h-64">
      <li v-for="track in searchResults" class="py-1 mx-2" :key="track.uri">
        <Track :track="track" action="add" />
      </li>
    </ul>
  </div>
</template>
