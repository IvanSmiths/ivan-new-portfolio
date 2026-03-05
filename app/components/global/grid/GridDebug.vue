<script lang="ts" setup>
const columns = 16;
</script>

<template>
  <div class="gap-md px-md pointer-events-none fixed inset-0 z-9999 grid grid-cols-16">
    <div v-for="i in columns" :key="i" class="h-full border border-red-500/30 bg-red-500/20" />
  </div>
</template>
