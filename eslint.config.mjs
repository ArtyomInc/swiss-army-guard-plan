// ts-check
import perfectionistPlugin from "eslint-plugin-perfectionist";
import pluginVue from "eslint-plugin-vue";
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    ignores: ["node_modules/**/*", "dist/**/*"],
  },
  ...pluginVue.configs["flat/essential"],
  {
    files: ["**/*{.ts,.mts,.tsx,.vue,.js,.jsx}"],
    plugins: {
      perfectionist: perfectionistPlugin,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          groups: [
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "unknown",
          ],
        },
      ],
      "perfectionist/sort-objects": "error",
      "vue/html-self-closing": [
        "error",
        {
          html: {
            component: "always",
            normal: "always",
            void: "always",
          },
          math: "always",
          svg: "always",
        },
      ],
      "vue/valid-v-for": "off",
      "vue/multi-word-component-names": "off",
      "vue/require-default-prop": "off",
    },
  },
);
