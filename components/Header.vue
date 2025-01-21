<template>
  <div class="h-16">
    <DesktopNavBar :links="links" />
  </div>
</template>

<script setup lang="ts">
import DesktopNavBar from "./Header/DesktopNavBar.vue";

const links = [{ name: "Home", path: "/" }];
</script>
