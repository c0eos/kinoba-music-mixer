<script setup lang="ts">
import { ref, onMounted } from "vue";
import Platine from "@/components/Platine.vue";
import WebPlayback from "@/components/WebPlayback.vue";
import { usePlaylistStore } from "@/stores/playlist";

const playlistStore = usePlaylistStore();

onMounted(() => {
  playlistStore.load();
});
</script>

<template>
  <div class="max-w-5xl mx-auto p-4 mt-4 border-2 rounded-xl border-gray-700">
    <WebPlayback />
    <div class="grid grid-cols-2 mt-8">
      <Platine
        :playlist="playlist"
        v-for="playlist in playlistStore.playlists"
        :key="playlist.id"
      />
    </div>
  </div>
</template>
