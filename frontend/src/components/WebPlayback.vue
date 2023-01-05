<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useSpotifyStore } from "@/stores/spotify";
import { transfertPlayback, formatTrack } from "@/backend/spotify";
import { usePlaylistStore } from "@/stores/playlist";
import type { Track as ITrack } from "@/types";
import Track from "@/components/Track.vue";

const spotifyStore = useSpotifyStore();
const playlistStore = usePlaylistStore();

const token = spotifyStore.accessToken;

const emptyTrack: Track = {
  name: "",
  artists: "",
  album: "",
  uri: "",
  image: "",
  id: -1,
  playlist_id: -1,
};

let isActive = ref(false);
let isPaused = ref(false);
let currentTrack = ref<ITrack>(emptyTrack);
let player = ref<any>(undefined);

function transfert(device_id) {
  transfertPlayback(device_id).then((response) => console.log(response));
}

function choosePlay() {
  // start new queue
  if (playlistStore.queueIdx === -1) {
    playlistStore.playNext();
  } else {
    player.value.togglePlay();
  }
}

function playNext(state) {
  if (state.position >= state.duration) {
    playlistStore.playNext();
  }
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

      playNext(state);

      currentTrack.value = formatTrack(state.track_window.current_track);
      isPaused.value = state.paused;
      playlistStore.isPaused = state.paused;

      isActive.value = !!state;
    });

    player.value.connect();
  };
});

onUnmounted(() => {
  player.value.disconnect();
});
</script>

<template>
  <div class="mx-auto w-1/2">
    <template v-if="!isActive">
      <b>
        Instance not active. Wait for connection or transfer your playback using
        your Spotify app.
      </b>
      <div class="mx-auto w-fit">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          width="64px"
          height="64px"
          viewBox="0 0 50 50"
          style="enable-background: new 0 0 50 50"
          xml:space="preserve"
        >
          <path
            fill="#22c55e"
            d="M43.935,25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615c8.072,0,14.615,6.543,14.615,14.615H43.935z"
          >
            <animateTransform
              attributeType="xml"
              attributeName="transform"
              type="rotate"
              from="0 25 25"
              to="360 25 25"
              dur="1.0s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </template>
    <template v-else>
      <div class="mx-auto">
        <div class="mx-auto w-fit">
          <Track :track="currentTrack" action="none" />
        </div>
        <div class="mx-auto w-fit mt-4">
          <button class="" @click="playlistStore.playPrevious()">❮</button>
          <button class="w-24" @click="choosePlay()">
            {{ isPaused ? "PLAY" : "PAUSE" }}
          </button>
          <button class="" @click="playlistStore.playNext()">❯</button>
        </div>
      </div>
    </template>
  </div>
</template>
