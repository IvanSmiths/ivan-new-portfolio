// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";
import eslintConfigPrettier from "eslint-config-prettier";

export default withNuxt({
  rules: {
    "prefer-const": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "vue/no-unused-vars": "off",
    "nuxt/nuxt-config-keys-order": "off",
  },
}).append(eslintConfigPrettier);
