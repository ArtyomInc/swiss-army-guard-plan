<template>
  <div
    class="fixed flex h-screen w-screen flex-col items-center justify-center gap-5"
  >
    <h1>{{ error?.statusCode }}</h1>
    <Link href="/">Go back home</Link>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

import { Link } from "@/ui/link";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>
