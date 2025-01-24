// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: { class: "text-foreground" },
      charset: "utf-8",
      script: [
        {
          "data-website-id": "8c1352e1-0e10-462c-bcef-230bbd74c14f",
          defer: true,
          src: "https://umami.arduc.ch/script.js",
        },
      ],
      title: "ArtyomInc - GPG",
      viewport: "width=device-width, initial-scale=1",
    },
  },
  colorMode: {
    classSuffix: "",
    componentName: "ColorScheme",
    fallback: "dark",
    preference: "system",
    storage: "localStorage",
    storageKey: "color-mode",
  },
  compatibilityDate: "2025-01-24",
  components: false,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@nuxt/image",
  ],
  shadcn: {
    componentDir: "./ui",
    prefix: "",
  },
});
