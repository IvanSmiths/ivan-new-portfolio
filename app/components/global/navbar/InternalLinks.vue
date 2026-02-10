<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { internalRoutes } from '~~/_config/config'

const route = useRoute()
const worksCount = 4

const getLinkStatus = (url: string) => {
  if (url === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(url)
}

const navigationLinks = computed(() =>
  internalRoutes.map((link, index) => ({
    ...link,
    isActive: getLinkStatus(link.url),
    showCount: index === 1,
    hasMargin: index !== 1 && index !== 2,
  })),
)
</script>

<template>
  <ul class="md:gap-md gap-lg flex items-start">
    <li
      v-for="link in navigationLinks"
      :key="link.url"
      class="flex items-baseline"
    >
      <NuxtLink
        :class="[
          link.isActive ? 'underline underline-offset-2' : '',
          link.hasMargin ? 'mr-1' : '',
        ]"
        :prefetch="true"
        :to="link.url"
        class="flex text-xs uppercase font-mono"
      >
        {{ link.label }}
      </NuxtLink>

      <span
        v-if="link.showCount"
        class="text-muted ml-1 text-[8px]"
      >
        ({{ worksCount }})
      </span>
    </li>
  </ul>
</template>
