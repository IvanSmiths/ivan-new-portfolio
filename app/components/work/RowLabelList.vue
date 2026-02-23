<script lang="ts" setup>
import { computed } from "vue";

type Props = {
  stack: string[];
  className?: string;
};

const props = defineProps<Props>();

const rootClass = computed(() => ["pl-sm py-xs flex items-start opacity-0", props.className]);
</script>

<template>
  <div :class="rootClass">
    <div class="text-foreground-muted w-24 shrink-0">Stack</div>

    <div class="gap-xs flex flex-wrap gap-y-0.5 wrap-break-word">
      <span v-for="(item, index) in stack" :key="index">
        <span>{{ item }}</span
        ><span v-if="index < stack.length - 1">, </span>
      </span>
    </div>
  </div>
</template>
