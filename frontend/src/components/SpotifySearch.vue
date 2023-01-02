<script setup lang="ts">
import { ref } from "vue";
import { search } from "@/backend/spotify";
import Track from "@/components/Track.vue";

const query = ref("");
let response = ref([]);

function submit() {
  console.log(query.value);
  if (query.value !== "") {
    search(query.value).then((res) => {
      response.value = res.tracks.items;
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
      v-for="item in response"
      class="py-1 border-b-slate-500 border-b"
      :key="item.uri"
    >
      <Track :track="item" />
    </li>
  </ul>
</template>
