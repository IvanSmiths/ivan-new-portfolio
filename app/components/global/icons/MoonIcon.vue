<script lang="ts" setup>
const { iconWidth } = useAppConfig();
</script>

<template>
  <svg
    :height="iconWidth"
    :width="iconWidth"
    class="stroke-foreground group-hover:stroke-foreground/70 cursor-pointer transition"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
    />
  </svg>
</template>
