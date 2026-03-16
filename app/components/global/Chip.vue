<script lang="ts" setup>
import ExternalLink from "~/components/global/icons/ExternalLink.vue";

defineOptions({
  inheritAttrs: false,
});
defineProps<{
  label: string;
  external?: boolean;
}>();
</script>

<template>
  <span
    class="text-foreground bg-background/20 px-sm flex w-fit flex-row items-center gap-1 rounded-full border border-white/20 py-1 text-xs tracking-widest uppercase shadow-lg backdrop-blur-lg"
    v-bind="$attrs"
  >
    {{ label }}
    <ExternalLink v-if="external" />
  </span>
</template>
