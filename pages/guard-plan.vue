<template>
  <div>
    <UserForm v-model="userField" />
    <GuardPlan v-if="userField" v-model="userField" />
  </div>
</template>

<script setup lang="ts">
import type { userForm } from "~/interfaces";

import GuardPlan from "./components/index/GuardPlan.vue";
import UserForm from "./components/index/UserForm.vue";

const userField = ref<userForm>();
</script>
