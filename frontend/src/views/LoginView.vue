<script setup lang="ts">
import User from "@/components/User.vue";
import { useUserStore } from "@/stores/user";
import { login } from "@/backend/user";
import { useRouter } from "vue-router";

const router = useRouter();
const user = useUserStore();

function submit(value) {
  console.log(value);
  login(value.email, value.password).then((response) => {
    console.log(response);
    user.login(response);

    router.push("/");
  });
}
</script>

<template>
  <User :submit="submit" title="Login" />
</template>
