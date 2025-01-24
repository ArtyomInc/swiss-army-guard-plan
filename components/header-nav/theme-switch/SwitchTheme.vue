<template>
  <ClientOnly>
    <Button size="icon" class="rounded-full" variant="outline" @click="toggle">
      <Icon v-show="colorMode.preference === 'light'" name="lucide:sun" />
      <Icon v-show="colorMode.preference === 'dark'" name="lucide:moon" />
      <Icon v-show="colorMode.preference === 'system'" name="lucide:computer" />
    </Button>
  </ClientOnly>
</template>

<script setup lang="ts">
import { Button } from '@/ui/button'

const colorMode = useColorMode()

function toggle() {
  if (colorMode.preference === 'system') {
    colorMode.preference = 'dark'
  } else if (colorMode.preference === 'dark') {
    colorMode.preference = 'light'
  } else if (colorMode.preference === 'light') {
    colorMode.preference = 'system'
  }
}
</script>
