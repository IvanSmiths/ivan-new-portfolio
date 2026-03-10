<script lang="ts" setup>
import ThemeToggle from "~/components/global/navbar/ThemeToggle.vue";

import { computed } from "vue";

const appConfig = useAppConfig();
const internalRoutes = appConfig.internalRoutes;

const navigationLinks = computed(() =>
  internalRoutes.map((link) => ({
    ...link,
  })),
);
</script>

<template>
  <nav
    class="text-foreground bottom-md right-md md:left-md md:top-md fixed z-30 text-base md:bottom-auto"
  >
    <ul class="flex items-start gap-1">
      <li
        v-for="(link, index) in navigationLinks"
        :key="link.url"
        class="text-foreground-muted flex items-baseline"
      >
        <NuxtLink :to="link.url" class="text-foreground flex transition-opacity hover:opacity-80">
          {{ link.label }}<span v-if="index !== navigationLinks.length - 1">,</span>
        </NuxtLink>
      </li>
    </ul>
    <ThemeToggle />
  </nav>
</template>
