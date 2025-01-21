<script setup lang="ts">
import type { HTMLAttributes } from "vue";

import { cn } from "@/lib/utils";

const props = defineProps<{
  class?: HTMLAttributes["class"];
}>();
</script>

<template>
  <div
    :class="
      cn(
        'rounded-xl border bg-card/40 text-card-foreground shadow backdrop-blur-xl',
        props.class,
      )
    "
  >
    <slot />
  </div>
</template>
