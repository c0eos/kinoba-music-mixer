import { useSpotifyStore } from "@/stores/spotify";

const baseURL = "https://api.spotify.com/v1";

export async function transfertPlayback(device_id: string) {
  const spotifyStore = useSpotifyStore();
  return fetch(`${baseURL}/me/player`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${spotifyStore.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      device_ids: [device_id],
      play: false,
    }),
  }).catch((err) => console.error(err));
}

export async function search(query: string) {
  const spotifyStore = useSpotifyStore();
  return fetch(`${baseURL}/search?q=${query}&type=track`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${spotifyStore.accessToken}`,
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.error(err));
}

export async function play(uri: string) {
  const spotifyStore = useSpotifyStore();
  return fetch(`${baseURL}/me/player/play?device_id=${spotifyStore.deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${spotifyStore.accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: ["spotify:track:" + uri],
    }),
  }).catch((err) => console.error(err));
}
