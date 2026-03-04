<script lang="ts" setup>
import ThemeToggle from "~/components/global/navbar/ThemeToggle.vue";

import { computed } from "vue";
import { useRoute } from "vue-router";

const appConfig = useAppConfig();
const internalRoutes = appConfig.internalRoutes;
const route = useRoute();

const getLinkStatus = (url: string) => {
  if (url === "/") {
    return route.path === "/";
  }
  return route.path.startsWith(url);
};

const navigationLinks = computed(() =>
  internalRoutes.map((link, index) => ({
    ...link,
    isActive: getLinkStatus(link.url),
    showCount: index === 1,
    hasMargin: index !== 1 && index !== 2,
  })),
);
</script>

<template>
  <nav class="text-foreground left-md top-md fixed z-30 text-base">
    <ul class="flex items-start gap-1">
      <li
        v-for="link in navigationLinks"
        :key="link.url"
        class="text-foreground-muted flex items-baseline"
      >
        <NuxtLink
          :class="[link.isActive ? 'text-foreground underline underline-offset-3' : '']"
          :prefetch="true"
          :to="link.url"
          class="flex transition-opacity hover:opacity-80"
        >
          {{ link.label }},
        </NuxtLink>
      </li>
    </ul>
    <ThemeToggle />
  </nav>
</template>
