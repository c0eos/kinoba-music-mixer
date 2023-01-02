<script setup lang="ts">
import { ref } from "vue";

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const redirectURI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI;
const scope = import.meta.env.VITE_SPOTIFY_SCOPE;

const url = ref(
  "https://accounts.spotify.com/authorize" +
    "?response_type=token" +
    "&client_id=" +
    encodeURIComponent(clientId) +
    "&redirect_uri=" +
    encodeURIComponent(redirectURI) +
    "&scope=" +
    encodeURIComponent(scope)
);
</script>

<template>
  <p>Obtenir un token Spotify :</p>
  <button type="button" class="italic rounded-full p-2 bg-green-500">
    <a :href="url">Login avec Spotify</a>
  </button>
</template>
