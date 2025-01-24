<template>
  <div class="h-16">
    <DesktopNavBar class="hidden md:flex" :links="links" />
    <MobileNavBar class="md:hidden" :links="links" />
  </div>
</template>

<script setup lang="ts">
import DesktopNavBar from "./header/DesktopNavBar.vue";
import MobileNavBar from "./header/MobileNavBar.vue";

const links = [
  { name: "Accueil", path: "/" },
  { name: "Générateur", path: "/guard-plan" },
  { name: "À propos", path: "/about" },
];
</script>
