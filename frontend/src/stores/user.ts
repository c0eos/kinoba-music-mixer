import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => {
    const defaultState = {
      isLogged: false,
      token: "",
    };
    const localToken = window.localStorage.getItem("token");
    if (localToken && localToken !== "") {
      defaultState.token = localToken;
      defaultState.isLogged = true;
    }
    return defaultState;
  },
  actions: {
    login(token: string) {
      this.token = token;
      this.isLogged = true;
      window.localStorage.setItem("token", token);
    },
    logout() {
      this.token = "";
      this.isLogged = false;
      window.localStorage.clear();
    },
  },
});
