<template>
  <nav class="flex h-full items-center justify-between">
    <div class="p-1 h-full relative">
      <div class="absolute top-0 left-0 w-full h-full blur-3xl bg-violet-500" />
      <img class="h-full blur-none" src="/favicon.svg" alt="ArtyomInc logo" />
    </div>
    <div class="flex items-center gap-2">
      <template v-for="item in props.links" :key="item.name">
        <Link variant="outline" :href="item.path">
          {{ item.name }}
        </Link>
      </template>
      <Link variant="outline" size="icon" href="https://github.com/ArtyomInc" target="_blank">
        <Icon icon="mdi:github" />
      </Link>
      <SwitchTheme />
    </div>
  </nav>
</template>

<script setup lang="ts">
import { Link } from '@/ui/link'
import { Icon } from '@iconify/vue'

import SwitchTheme from './Theme/SwitchTheme.vue'

const props = defineProps<{
  links: {
    name: string
    path: string
  }[]
}>()
</script>
