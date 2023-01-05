import { defineStore } from "pinia";
import { toRaw } from "vue";
import {
  getPlaylists,
  addTrackToPlaylist,
  deleteTrack,
} from "@/backend/playlist";
import type { Track, Playlist } from "@/types";
import { playTrack } from "@/backend/spotify";

export const usePlaylistStore = defineStore("playlist", {
  state: () => {
    const defaultState = {
      playlists: [] as Playlist[],
      trackDragged: null as Track | null,
      queue: [] as Track[],
      playingOn: -1,
      isPaused: false,
      queueIdx: -1,
    };

    return defaultState;
  },
  actions: {
    async load() {
      const playlists = await getPlaylists();
      this.playlists = playlists;
      this.updateQueue();
    },
    setTrackDragged(track: Track) {
      this.trackDragged = track;
    },
    async addTrackToPlaylist(
      playlist_id: number,
      track: Track,
      start: boolean = false
    ) {
      if (track) {
        track.playlist_id = playlist_id;
        this.trackDragged = null;
        const response = await addTrackToPlaylist(track);
        await this.load();
      }
      if (start) {
        const idx = this.queue.findLastIndex(
          (t) => t.uri === track.uri && t.playlist_id === track.playlist_id
        );
        this.play(this.queue[idx]);
      }
    },
    async deleteTrack(track: Track) {
      const response = await deleteTrack(track);
      this.load();
    },
    async play(track: Track) {
      this.queueIdx = this.queue.findIndex((t) => t.id === track.id);
      this.playingOn = track.playlist_id;
      const response = await playTrack(track);
    },
    async playNext() {
      const next =
        this.queueIdx >= this.queue.length - 1 ? 0 : this.queueIdx + 1;

      this.play(this.queue[next]);
    },
    async playPrevious() {
      const previous =
        this.queueIdx === 0 ? this.queue.length - 1 : this.queueIdx - 1;

      this.play(this.queue[previous]);
    },
    updateQueue() {
      const arrays = toRaw(this.playlists) as Playlist[];
      const queue: Track[] = [];

      const maxLength = Math.max(...arrays.map((array) => array.tracks.length));

      for (let i = 0; i < maxLength; i++) {
        arrays.forEach((array) => {
          if (array.tracks[i]) {
            queue.push(array.tracks[i]);
          }
        });
      }
      this.queue = queue;
    },
  },
});
