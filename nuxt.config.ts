// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      bodyAttrs: { class: "text-foreground" },
      charset: "utf-8",
      script: [
        {
          "data-website-id": "b896d770-b245-44e2-98da-6b334632e25c",
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
  compatibilityDate: "2024-04-03",
  components: false,
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@nuxt/icon",
    "@vueuse/nuxt",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
  ],
  shadcn: {
    componentDir: "./ui",
    prefix: "",
  },
});
