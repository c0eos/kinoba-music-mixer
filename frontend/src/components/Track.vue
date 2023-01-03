<script setup lang="ts">
import { play } from "@/backend/spotify";
const props = defineProps(["track"]);

const track = props.track;
const album = track.album;
const artists = track.artists;

function hello() {
  console.log(track.name);
}

function bye() {
  console.log(album.name);
}
</script>

<template>
  <div
    class="flex items-center hover:bg-gray-800"
    @dragstart="hello"
    @dragenter="bye"
  >
    <div class="w-12 mr-4">
      <img
        :src="album.images.at(0).url"
        @dblclick="play(track.id)"
        alt="Track cover art"
        class="object-cover rounded-md"
      />
    </div>
    <div class="flex-1">
      <h2 class="font-bold leading-tight">{{ track.name }}</h2>
      <div class="text-gray-600 text-sm">
        <span>{{ artists.map((elt) => elt.name).join(", ") }}</span>
        <span class="mx-2">•</span>
        <span>{{ album.name }}</span>
      </div>
    </div>
  </div>
</template>
