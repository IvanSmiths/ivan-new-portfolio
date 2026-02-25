<script lang="ts" setup>
import InternalLinks from "./InternalLinks.vue";
import ThemeToggle from "~/components/global/navbar/ThemeToggle.vue";
</script>

<template>
  <nav
    class="bg-background text-foreground-muted 3xl:text-lg navbar fixed bottom-0 left-0 z-9999 flex w-full flex-row-reverse items-center justify-between px-5 py-3 text-sm md:top-0 md:bottom-auto md:flex-row"
  >
    <NuxtLink class="hidden transition-opacity hover:opacity-80 md:block" to="/"
      >Ivan Smiths</NuxtLink
    >
    <InternalLinks />
    <ThemeToggle />
  </nav>
</template>
