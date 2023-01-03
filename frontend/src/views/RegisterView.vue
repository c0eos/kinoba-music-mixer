<script setup lang="ts">
import User from "@/components/User.vue";
import { register } from "@/backend/user";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { inject } from "vue";

const router = useRouter();
const user = useUserStore();

const message = inject("message");

function submit(value) {
  console.log(value);

  register(value.email, value.password)
    .then((response) => {
      console.log(response);

      router.push("/login");
    })
    .catch((error) => {
      console.log(error);
      message.value = error.message;
    });
}
</script>

<template>
  <User :submit="submit" title="Register" />
</template>
