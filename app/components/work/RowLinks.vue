<template>
  <div :class="rootClass">
    <span class="text-foreground-muted w-24 shrink-0">Links</span>

    <span class="flex">
      <a
        :href="website"
        class="flex items-center hover:opacity-80 transition-opacity gap-1 underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span>Website</span>
        <ExternalLink />
      </a>

      <a
        v-if="linkedin"
        :href="linkedin"
        class="flex items-center hover:opacity-80 transition-opacity gap-1 underline"
        rel="noopener noreferrer"
        target="_blank"
      >
        ,<span>LinkedIn</span>
        <ExternalLink />
      </a>
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ExternalLink from "~/components/global/icons/ExternalLink.vue";

type Props = {
  website: string;
  linkedin?: string;
  className?: string;
};

const props = defineProps<Props>();

const rootClass = computed(() => ["pl-sm py-xs flex opacity-0", props.className]);
</script>
