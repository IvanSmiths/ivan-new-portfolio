<script lang="ts" setup>
const { scrollPercent } = useScrollPercentage()
</script>

<template>
  <div
    class="absolute hidden md:block text-xs md:right-52 lg:right-72 font-mono"
  >
    [{{ scrollPercent }}]
  </div>
</template>

<style scoped>
.font-mono {
  font-family: "DM Mono", monospace;
}
</style>
