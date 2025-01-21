<template>
  <div>
    <UserForm v-model="userField" />
    <GuardPlan
      v-if="userField"
      :begin="userField.begin"
      :end="userField.end"
      :period-duration="userField.periodDuration"
      :officer="userField.officer"
      :commander="userField.commander"
      :pair="userField.pair"
    />
  </div>
</template>

<script setup lang="ts">
import type { userForm } from "~/interfaces";

import GuardPlan from "./index/GuardPlan.vue";
import UserForm from "./index/UserForm.vue";

const userField = ref<userForm>();

interface Pair {
  name: string;
  period: string[];
}

interface Day {
  date: string;
  pair: Pair[];
}

const guardPlan = ref<
  | {
      day: Day[];
    }
  | undefined
>(undefined);
</script>
