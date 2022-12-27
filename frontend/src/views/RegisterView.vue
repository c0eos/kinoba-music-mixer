<script setup lang="ts">
import User from "@/components/User.vue";
import { register } from "@/backend/user";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const router = useRouter();
const user = useUserStore();

function submit(value) {
  console.log(value);
  register(value.email, value.password).then((response) => {
    console.log(response);
    user.login(response);
    router.push("/");
  });
}
</script>

<template>
  <User :submit="submit" title="Register" />
</template>
