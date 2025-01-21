<template>
  <ClientOnly>
    <Button size="icon" class="rounded-full" variant="outline" @click="toggle">
      <Icon v-show="colorMode.preference === 'light'" icon="lucide:sun" />
      <Icon v-show="colorMode.preference === 'dark'" icon="lucide:moon" />
      <Icon v-show="colorMode.preference === 'system'" icon="lucide:computer" />
    </Button>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Button } from "@/ui/button";
import { Icon } from "@iconify/vue";

const colorMode = useColorMode();

function toggle() {
  console.log(colorMode.value);
  console.log(colorMode.forced);
  if (colorMode.preference === "system") {
    colorMode.preference = "dark";
  } else if (colorMode.preference === "dark") {
    colorMode.preference = "light";
  } else if (colorMode.preference === "light") {
    colorMode.preference = "system";
  }
  console.log(colorMode.value);
  console.log(colorMode.forced);
}
</script>
