<script lang="ts" setup>
const columns = 16;
</script>

<template>
  <div
    class="lg:gap-md gap-sm lg:px-md px-sm pointer-events-none fixed inset-0 z-9999 grid grid-cols-8 lg:grid-cols-16"
  >
    <div
      v-for="i in columns"
      :key="i"
      :class="['h-full border border-red-500/30 bg-red-500/20', i > 8 ? 'hidden lg:block' : '']"
    />
  </div>
</template>
