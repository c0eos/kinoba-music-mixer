import { defineStore } from "pinia";

export const useSpotifyStore = defineStore("spotify", {
  state: () => {
    const defaultState = {
      accessToken: "",
      expires: new Date(),
      deviceId: "",
    };
    return defaultState;
  },
  actions: {
    renew(access_token: string) {
      this.accessToken = access_token;
      const date = new Date();
      // expires_in est 3600s, ie 1h
      date.setHours(date.getHours() + 1);
      this.expires = date;
    },
    setDeviceId(device_id: string) {
      this.deviceId = device_id;
    },
  },
});
