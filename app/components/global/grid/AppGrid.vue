<script lang="ts" setup>
defineProps<{
  as?: string;
  padded?: boolean;
}>();
</script>

<template>
  <component
    :is="as ?? 'div'"
    :class="[
      'lg:gap-x-md gap-x-sm mx-auto grid w-full grid-cols-12 lg:grid-cols-12',
      padded !== false && 'lg:px-md px-sm',
    ]"
  >
    <slot />
  </component>
</template>
