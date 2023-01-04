<script setup lang="ts">
import { ref, onMounted } from "vue";
import Platine from "@/components/Platine.vue";
import { usePlaylistStore } from "@/stores/playlist";

const playlistStore = usePlaylistStore();

onMounted(() => {
  playlistStore.load();
});
</script>

<template>
  <p>Player</p>
  <div class="grid grid-cols-2">
    <Platine
      :playlist="playlist"
      v-for="playlist in playlistStore.playlists"
      :key="playlist.id"
    />
  </div>
</template>
