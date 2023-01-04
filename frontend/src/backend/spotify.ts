import { useSpotifyStore } from "@/stores/spotify";
import type { Track } from "@/types";
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

export async function playTrack(track: Track) {
  const spotifyStore = useSpotifyStore();
  return axios.put(
    `${baseURL}/me/player/play?device_id=${spotifyStore.deviceId}`,
    {
      uris: [track.uri],
    },
    {
      headers: {
        Authorization: `Bearer ${spotifyStore.accessToken}`,
      },
    }
  );
}

function formatTrack(data: any): Track {
  const name = data.name;
  const id = -1;
  const playlist_id = -1;
  const uri = data.uri;
  const album = data.album.name;
  const artists = data.artists.map((elt) => elt.name).join(", ");
  // first one is the biggest
  const image = data.album.images.at(0).url;

  return { id, name, uri, album, artists, image, playlist_id };
}

export async function search(query: string): Promise<Track[]> {
  const spotifyStore = useSpotifyStore();
  return axios
    .get(`${baseURL}/search?q=${query}&type=track`, {
      headers: {
        Authorization: `Bearer ${spotifyStore.accessToken}`,
      },
    })
    .then((response) => response.data.tracks.items)
    .then((response) => response.map((elt) => formatTrack(elt)));
}
