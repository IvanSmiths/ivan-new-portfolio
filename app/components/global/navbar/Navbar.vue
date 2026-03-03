<script lang="ts" setup>
import InternalLinks from "./InternalLinks.vue";
import MobileNavbar from "./MobileNavbar.vue";
import ThemeToggle from "~/components/global/navbar/ThemeToggle.vue";
</script>

<template>
  <nav
    class="bg-background text-foreground-muted 3xl:text-lg navbar px-md py-sm fixed top-0 left-0 z-9999 hidden w-full items-center justify-between text-sm md:flex"
  >
    <NuxtLink class="transition-opacity hover:opacity-80" to="/">Ivan Smiths</NuxtLink>
    <InternalLinks />
    <ThemeToggle />
  </nav>

  <MobileNavbar />

  <div class="text-foreground-muted fixed bottom-5 left-5 z-9999 hidden md:block">
    <ThemeToggle />
  </div>
</template>
