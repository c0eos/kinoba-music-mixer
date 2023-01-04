import { defineStore } from "pinia";
import { login, register } from "@/backend/user";

export const useUserStore = defineStore("user", {
  state: () => {
    const defaultState = {
      isLogged: false,
      token: "",
      user_id: "",
    };
    const localData = window.localStorage.getItem("user");
    if (localData && localData !== "") {
      const data = JSON.parse(localData);
      defaultState.token = data.token;
      defaultState.isLogged = true;
      defaultState.user_id = data.user_id;
    }
    return defaultState;
  },
  actions: {
    async login(email: string, password: string) {
      const response = await login(email, password);

      this.token = response.data.token;
      this.isLogged = true;
      this.user_id = response.data.user_id;
      window.localStorage.setItem("user", JSON.stringify(response.data));
    },
    async register(email: string, password: string) {
      await register(email, password);
      await this.login(email, password);
    },
    logout() {
      this.$reset();
      window.localStorage.clear();
    },
  },
});
