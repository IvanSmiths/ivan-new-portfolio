<script lang="ts" setup>
const { as = "div", padded = true } = defineProps<{
  as?: string;
  padded?: boolean;
}>();
</script>

<template>
  <component
    :is="as"
    :class="[
      'lg:gap-x-md gap-x-sm grid w-full grid-cols-8 lg:grid-cols-12',
      padded && 'lg:px-md px-sm',
    ]"
  >
    <slot />
  </component>
</template>
