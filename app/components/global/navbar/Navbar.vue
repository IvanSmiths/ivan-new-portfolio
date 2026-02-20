<script lang="ts" setup>
import InternalLinks from "./InternalLinks.vue";
import ThemeToggle from "~/components/global/navbar/ThemeToggle.vue";
</script>

<template>
  <nav
    class="fixed bg-background bottom-0 text-sm md:text-xs text-foreground-muted 3xl:text-lg left-0 z-9999 flex flex-row-reverse md:flex-row w-full items-center justify-between px-sm py-sm md:top-0 md:bottom-auto navbar"
  >
    <NuxtLink class="hover:opacity-80 transition-opacity hidden md:block" to="/"
      >Ivan Smiths</NuxtLink
    >
    <InternalLinks />
    <ThemeToggle />
  </nav>
</template>
