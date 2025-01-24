<template>
  <div class="h-16">
    <DesktopNavBar class="hidden md:flex" :links="links" />
    <MobileNavBar class="md:hidden" :links="links" />
  </div>
</template>

<script setup lang="ts">
import DesktopNavBar from './Header/DesktopNavBar.vue'
import MobileNavBar from './Header/MobileNavBar.vue'

const links = [
  { name: 'Accueil', path: '/' },
  { name: 'Générateur', path: '/guard-plan' },
  { name: 'À propos', path: '/about' }
]
</script>
