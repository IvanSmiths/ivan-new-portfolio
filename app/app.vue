<script lang="ts" setup>
import { ref } from "vue";
import Navbar from "~/components/global/navbar/Navbar.vue";
import { useThemeInit } from "~/composables/useThemeInit";

const pageEl = ref<HTMLDivElement | null>(null);
const { signature } = useAppConfig();

useThemeInit();
console.log(signature);
</script>

<template>
  <Navbar />
  <ClientOnly>
    <CursorHelper />
  </ClientOnly>
  <div ref="pageEl">
    <NuxtPage />
  </div>
  <WorkExpandLayer />
  <CurtainTransition :page-el="pageEl" />
</template>
