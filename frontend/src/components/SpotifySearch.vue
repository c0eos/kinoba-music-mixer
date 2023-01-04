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
  <form @submit.prevent="submit">
    <input
      type="text"
      v-model="query"
      placeholder="Search"
      class="text-black"
    />
  </form>
  <ul class="overflow-y-scroll h-64">
    <li
      v-for="track in searchResults"
      class="py-1 border-b-slate-500 border-b"
      :key="track.uri"
    >
      <Track :track="track" action="add" />
    </li>
  </ul>
</template>
