import axios from "axios";
import { useUserStore } from "@/stores/user";
import type { Playlist, Track } from "@/types";

export async function getPlaylists(): Promise<Playlist[]> {
  const userStore = useUserStore();
  return axios
    .get(`/api/playlists/user/${userStore.user_id}`, {
      headers: {
        Authorization: `Bearer ${userStore.token}`,
      },
    })
    .then((response) => response.data);
}

export async function addTrackToPlaylist(track: Track) {
  const userStore = useUserStore();
  return axios.post(`/api/tracks`, track, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
    },
  });
}

export async function deleteTrack(track: Track) {
  const userStore = useUserStore();
  return axios.delete(`/api/tracks/${track.id}`, {
    headers: {
      Authorization: `Bearer ${userStore.token}`,
    },
  });
}
