import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/views/NotFoundView.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import RegisterView from "@/views/RegisterView.vue";
import SpotifyCallbackView from "@/views/SpotifyCallbackView.vue";
import SpotifyAuthView from "@/views/SpotifyAuthView.vue";

import { useUserStore } from "@/stores/user";
import { useSpotifyStore } from "@/stores/spotify";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/logout",
      name: "logout",
      component: LogoutView,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/spotify/",
      name: "spotifyAuth",
      component: SpotifyAuthView,
    },
    {
      path: "/spotify/callback/",
      name: "spotifyCallback",
      component: SpotifyCallbackView,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "404",
      component: NotFound,
    },
  ],
});

router.beforeEach(async (to, from) => {
  const user = useUserStore();
  const spotify = useSpotifyStore();

  if (!user.isLogged) {
    if (to.name === "register" || to.name === "login") {
      return;
    }
  }
  if (!user.isLogged && to.name !== "login") {
    return { name: "login" };
  }

  if (user.isLogged && (to.name === "login" || to.name === "register")) {
    return { name: "home" };
  }

  if (
    user.isLogged &&
    spotify.accessToken === "" &&
    !to.name.includes("spotify")
  ) {
    return { name: "spotifyAuth" };
  }
});

export default router;
