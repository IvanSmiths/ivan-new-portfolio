<script lang="ts" setup>
defineProps<{
  as?: string;
}>();
</script>

<template>
  <component
    :is="as ?? 'div'"
    class="lg:gap-md gap-sm lg:px-md px-sm mx-auto grid w-full max-w-screen-2xl grid-cols-8 lg:grid-cols-16"
  >
    <slot />
  </component>
</template>
