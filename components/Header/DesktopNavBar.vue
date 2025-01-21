<template>
  <nav class="flex h-full items-center justify-end gap-2">
    <template v-for="item in props.links" :key="item.name">
      <Link variant="outline" :href="item.path">
        {{ item.name }}
      </Link>
    </template>
    <Link
      variant="outline"
      size="icon"
      href="https://github.com/ArtyomInc"
      target="_blank"
    >
      <Icon icon="mdi:github" />
    </Link>
    <SwitchTheme />
  </nav>
</template>

<script setup lang="ts">
import { Link } from "@/ui/link";
import { Icon } from "@iconify/vue";

import SwitchTheme from "./Theme/SwitchTheme.vue";

const props = defineProps<{
  links: {
    name: string;
    path: string;
  }[];
}>();
</script>
