import { defineNuxtPlugin } from "nuxt/app";
import { vTextSwap } from "../app/directives/v-text-swaps";

export default defineNuxtPlugin((nuxtApp) => {
  // Register globally
  nuxtApp.vueApp.directive("text-swap", vTextSwap);
});
