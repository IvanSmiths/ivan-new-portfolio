<script lang="ts" setup>
defineProps<{
  as?: string;
}>();
</script>

<template>
  <component
    :is="as ?? 'div'"
    class="gap-md px-md mx-auto grid w-full max-w-screen-2xl grid-cols-16"
  >
    <slot />
  </component>
</template>
