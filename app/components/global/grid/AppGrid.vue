<script lang="ts" setup>
defineProps<{
  as?: string;
  padded?: boolean;
  twelveColumns?: boolean;
}>();
</script>

<template>
  <component
    :is="as ?? 'div'"
    :class="[
      'lg:gap-x-md gap-x-sm mx-auto grid w-full',
      twelveColumns ? 'grid-cols-12 lg:grid-cols-12' : 'grid-cols-8 lg:grid-cols-16',
      padded !== false && 'lg:px-md px-sm',
    ]"
  >
    <slot />
  </component>
</template>
