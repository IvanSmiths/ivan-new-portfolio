<script lang="ts" setup>
import ExternalLink from "~/components/global/icons/ExternalLink.vue";

defineOptions({
  inheritAttrs: false,
});
withDefaults(
  defineProps<{
    label: string;
    external?: boolean;
    as?: string;
    blur?: boolean;
  }>(),
  {
    blur: false,
    as: "span",
  },
);
</script>

<template>
  <component
    :is="as || 'span'"
    :class="{ 'backdrop-blur-lg': blur }"
    class="text-foreground bg-background/30 px-sm border-foreground/10 flex w-fit flex-row items-center gap-1 rounded-full border py-1 text-xs"
    v-bind="$attrs"
  >
    {{ label }}
    <ExternalLink v-if="external" />
  </component>
</template>
