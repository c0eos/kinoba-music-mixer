<script setup lang="ts">
import User from "@/components/User.vue";
import { useUserStore } from "@/stores/user";
import { login } from "@/backend/user";
import { useRouter } from "vue-router";
import { inject } from "vue";

const router = useRouter();
const user = useUserStore();

const message = inject("message");

function submit(value) {
  login(value.email, value.password)
    .then((response) => {
      console.log(response);
      user.login(response.data.token);

      router.push("/");
    })
    .catch((error) => {
      console.log(error);
      message.value = error.message;
    });
}
</script>

<template>
  <User :submit="submit" title="Login" />
</template>
