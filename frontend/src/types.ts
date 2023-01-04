export interface Track {
  id: number;
  uri: string;
  name: string;
  album: string;
  artists: string;
  image: string;
  playlist_id: number;
}

export interface QueueItem {
  playlist_id: number;
  track: Track;
}

export interface Playlist {
  id: number;
  tracks: Track[];
}
