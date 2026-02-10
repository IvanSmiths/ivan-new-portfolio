<script lang="ts" setup>
import InternalLinks from '~/components/global/navbar/InternalLinks.vue'
import ScrollPercentage from '~/components/global/navbar/ScrollPercentage.vue'
</script>

<template>
  <nav
    class="fixed bottom-0 left-0 z-30 flex flex-row-reverse md:flex-row w-full items-center justify-between border-t border-background-muted bg-background px-sm py-sm md:top-0 md:bottom-auto md:border-t-0 md:border-b"
  >
    <NuxtLink class="text-xs hidden md:block uppercase"> Ivan Smiths </NuxtLink>
    <InternalLinks />
    <ScrollPercentage />
    <div class="flex w-24 justify-end">
      themetoggle
    </div>
  </nav>
</template>

<style scoped></style>
