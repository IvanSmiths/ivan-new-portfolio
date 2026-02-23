<script lang="ts" setup>
import { computed } from "vue";

type Props = {
  label: string;
  value: string;
  className?: string;
};

const props = defineProps<Props>();

const rootClass = computed(() => ["pl-sm py-xs flex opacity-0", props.className]);
</script>

<template>
  <div :class="rootClass">
    <span class="text-foreground-muted w-24 shrink-0">{{ label }}</span>
    <span>{{ value }}</span>
  </div>
</template>
