<script setup lang="ts">
import type { HTMLAttributes } from "vue";

import { cn } from "@/lib/utils";
import { Primitive, type PrimitiveProps } from "radix-vue";

import { type LinkVariants, linkVariants } from ".";

interface Props extends PrimitiveProps {
  variant?: LinkVariants["variant"];
  size?: LinkVariants["size"];
  class?: HTMLAttributes["class"];
}

const props = withDefaults(defineProps<Props>(), {
  as: "a",
});
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :class="cn(linkVariants({ variant, size }), props.class)"
  >
    <slot />
  </Primitive>
</template>
