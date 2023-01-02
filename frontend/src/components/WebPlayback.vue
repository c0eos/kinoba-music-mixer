<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useSpotifyStore } from "@/stores/spotify";
import { transfertPlayback } from "@/backend/spotify";

const spotifyStore = useSpotifyStore();

const token = spotifyStore.accessToken;

const track = {
  name: "",
  album: {
    images: [{ url: "" }],
  },
  artists: [{ name: "" }],
};

let isActive = ref(false);
let isPaused = ref(false);
let currentTrack = ref(track);
let player = ref<any>(undefined);

function transfert(device_id) {
  transfertPlayback(device_id).then((response) => console.log(response));
}

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://sdk.scdn.co/spotify-player.js";
  script.async = true;

  document.body.appendChild(script);

  window.onSpotifyWebPlaybackSDKReady = () => {
    player.value = new window.Spotify.Player({
      name: "Kinoba - Music Mixer",
      getOAuthToken: (cb) => {
        cb(token);
      },
      volume: 1,
    });

    player.value.addListener("ready", ({ device_id }) => {
      console.log("Ready with Device ID", device_id);
      spotifyStore.setDeviceId(device_id);
      setTimeout(() => transfert(device_id), 2000);
    });

    player.value.addListener("not_ready", ({ device_id }) => {
      console.log("Device ID has gone offline", device_id);
    });

    player.value.addListener("player_state_changed", (state) => {
      if (!state) {
        return;
      }

      currentTrack.value = state.track_window.current_track;
      isPaused.value = state.paused;

      player.value.getCurrentState().then((state) => {
        isActive.value = !!state;
      });
    });

    player.value.connect();
  };
});

onUnmounted(() => {
  player.value.disconnect();
});
</script>

<template>
  <div class="container">
    <div class="main-wrapper">
      <template v-if="!isActive">
        <b>
          Instance not active. Transfer your playback using your Spotify app
        </b>
      </template>
      <template v-else>
        <img
          :src="currentTrack.album.images[0].url"
          class="now-playing__cover"
          alt=""
        />
        <div class="now-playing__side">
          <div class="now-playing__name">{{ currentTrack.name }}</div>
          <div class="now-playing__artist">
            {{ currentTrack.artists[0].name }}
          </div>
          <button class="" @click="player.previousTrack()">&lt;&lt;</button>
          <button class="" @click="player.togglePlay()">
            {{ isPaused ? "PLAY" : "PAUSE" }}
          </button>
          <button class="" @click="player.nextTrack()">&gt;&gt;</button>
        </div>
      </template>
    </div>
  </div>
</template>
