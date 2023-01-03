import { useSpotifyStore } from "@/stores/spotify";
import axios from "axios";

const baseURL = "https://api.spotify.com/v1";

export async function transfertPlayback(device_id: string) {
  const spotifyStore = useSpotifyStore();
  return axios.put(
    `${baseURL}/me/player`,
    {
      device_ids: [device_id],
      play: false,
    },
    {
      headers: {
        Authorization: `Bearer ${spotifyStore.accessToken}`,
      },
    }
  );
}

export async function play(uri: string) {
  const spotifyStore = useSpotifyStore();
  return axios.put(
    `${baseURL}/me/player/play?device_id=${spotifyStore.deviceId}`,
    {
      uris: ["spotify:track:" + uri],
    },
    {
      headers: {
        Authorization: `Bearer ${spotifyStore.accessToken}`,
      },
    }
  );
}

export async function search(query: string) {
  const spotifyStore = useSpotifyStore();
  return axios
    .get(`${baseURL}/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${spotifyStore.accessToken}`,
      },
    })
    .then((response) => response.data);
}
