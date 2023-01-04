<script setup lang="ts">
import { computed } from "vue";
import { usePlaylistStore } from "@/stores/playlist";
import Track from "@/components/Track.vue";

const props = defineProps(["playlist"]);
const playlistStore = usePlaylistStore();

const spinning = computed(() => {
  return (
    !playlistStore.isPaused && playlistStore.playingOn === props.playlist.id
  );
});

function onDrag() {
  if (playlistStore.trackDragged) {
    playlistStore.addTrackToPlaylist(
      props.playlist.id,
      playlistStore.trackDragged,
      true
    );
  }
}
</script>

<template>
  <div>
    <img
      src="/vinyl.png"
      alt="Vinyl"
      class="w-64 mx-auto"
      :class="{ spin: spinning }"
      @dragenter="onDrag"
    />
    <Track
      v-for="track in props.playlist.tracks"
      :key="track.id"
      :track="track"
    />
  </div>
</template>

<style type="text/css" media="all">
.spin {
  animation: spin 2s linear infinite;
}
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
