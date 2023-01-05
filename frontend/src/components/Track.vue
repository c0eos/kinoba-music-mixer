<script setup lang="ts">
import { ref } from "vue";
import { usePlaylistStore } from "@/stores/playlist";

const props = defineProps(["track", "action"]);
const playlistStore = usePlaylistStore();

const selectedPlaylist = ref(-1);

function onDrag() {
  if (props.action === "add") {
    playlistStore.setTrackDragged(props.track);
  }
}

function onSelect() {
  playlistStore.addTrackToPlaylist(selectedPlaylist.value, props.track);
}

function play() {
  if (props.action !== "add") {
    playlistStore.play(props.track);
  }
}

function remove() {
  playlistStore.deleteTrack(props.track);
}
</script>

<template>
  <div class="flex items-center hover:bg-gray-800" @dragstart="onDrag">
    <div class="w-12 mr-4">
      <img
        :src="props.track.image"
        @dblclick="play"
        alt="Track cover art"
        class="object-cover rounded-md"
      />
    </div>
    <div class="flex-1">
      <h2 class="font-bold leading-tight">{{ props.track.name }}</h2>
      <div class="text-gray-600 text-sm">
        <span>{{ props.track.artists }}</span>
        <span class="mx-2">•</span>
        <span>{{ props.track.album }}</span>
      </div>
    </div>
    <div>
      <template v-if="props.action === 'add'">
        <label for="select" class="text-xl pr-1">+</label>
        <select
          id="select"
          v-model="selectedPlaylist"
          @change="onSelect"
          class="bg-gray-700"
        >
          <option
            v-for="(playlist, index) in playlistStore.playlists"
            :key="playlist.id"
            :value="playlist.id"
          >
            Playlist {{ index + 1 }}
          </option>
        </select>
      </template>
      <template v-else-if="props.action === 'del'">
        <button
          type="button"
          @click="remove"
          class="text-3xl px-2 py-1 mr-4 rounded"
        >
          -
        </button>
      </template>
    </div>
  </div>
</template>
