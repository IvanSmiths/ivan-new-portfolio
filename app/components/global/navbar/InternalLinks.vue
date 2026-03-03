<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const appConfig = useAppConfig();
const internalRoutes = appConfig.internalRoutes;
const route = useRoute();
const worksCount = 4;

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
  <ul class="gap-md flex items-start">
    <li
      v-for="link in navigationLinks"
      :key="link.url"
      class="text-foreground-muted flex items-baseline"
    >
      <NuxtLink
        :class="[
          link.isActive ? 'text-foreground underline underline-offset-3' : '',
          link.hasMargin ? 'mr-1' : '',
        ]"
        :prefetch="true"
        :to="link.url"
        class="flex transition-opacity hover:opacity-80"
      >
        {{ link.label }}
      </NuxtLink>

      <span v-if="link.showCount" class="ml-1 text-[9px]"> ({{ worksCount }}) </span>
    </li>
  </ul>
</template>
