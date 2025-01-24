<template>
  <div class="h-16">
    <DesktopNavBar class="hidden md:flex" :links="links" />
    <MobileNavBar class="md:hidden" :links="links" />
  </div>
</template>

<script setup lang="ts">
import DesktopNavBar from './header-nav/DesktopNavBar.vue'
import MobileNavBar from './header-nav/MobileNavBar.vue'

const links = [
  { name: 'Accueil', path: '/' },
  { name: 'Générateur', path: '/guard-plan' },
  { name: 'À propos', path: '/about' }
]
</script>
