<script lang="ts" setup>
const { as = "div", padded = true } = defineProps<{
  as?: string;
  padded?: boolean;
}>();
</script>

<template>
  <component
    :is="as"
    :class="['gap-x-md grid w-full grid-cols-8 lg:grid-cols-12', padded && 'px-md']"
  >
    <slot />
  </component>
</template>
