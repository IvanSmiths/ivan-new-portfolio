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
  <ul class="gap-5 flex items-start">
    <li
      v-for="link in navigationLinks"
      :key="link.url"
      class="flex text-foreground-muted items-baseline"
    >
      <NuxtLink
        :class="[
          link.isActive ? 'underline text-foreground underline-offset-3' : '',
          link.hasMargin ? 'mr-1' : '',
        ]"
        :prefetch="true"
        :to="link.url"
        class="flex hover:opacity-80 transition-opacity"
      >
        {{ link.label }}
      </NuxtLink>

      <span v-if="link.showCount" class="ml-1 text-[9px]"> ({{ worksCount }}) </span>
    </li>
  </ul>
</template>
