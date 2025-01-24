<template>
  <div class="mx-auto max-w-screen-xl px-5 md:px-10">
    <Header />
    <slot />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
</script>
