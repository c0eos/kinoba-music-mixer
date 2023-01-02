<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useSpotifyStore } from "@/stores/spotify";

const route = useRoute();
const router = useRouter();

const searchParams = new URLSearchParams(route.hash.slice(1));
const access_token = searchParams.get("access_token");

const spotify = useSpotifyStore();
if (access_token && access_token !== "") {
  spotify.renew(access_token);
  router.push("/");
}
</script>

<template>
  <p>Code: {{ searchParams }}</p>
</template>
