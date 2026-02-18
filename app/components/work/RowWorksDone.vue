<template>
  <div :class="rootClass">
    <div class="text-foreground-muted w-24 shrink-0">Works Done</div>

    <div class="gap-xs flex flex-wrap gap-y-0.5 wrap-break-word">
      <span v-for="(work, index) in worksDone" :key="index">
        <span v-if="shouldRenderAsPlainText(work.label)" class="flex items-center gap-1">
          <span>{{ work.label }}</span>
          <span v-if="index < worksDone.length - 1">,</span>
        </span>

        <a
          v-else
          :href="work.link"
          class="flex items-center hover:opacity-80 transition-opacity gap-1 underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          <span>{{ work.label }}</span>
          <ExternalLink />
          <span v-if="index < worksDone.length - 1">,</span>
        </a>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ExternalLink from "~/components/global/icons/ExternalLink.vue";

type Link = {
  label: string;
  link: string;
};

type Props = {
  worksDone: Link[];
  className?: string;
};

const props = defineProps<Props>();

const rootClass = computed(() => ["pl-sm py-xs flex items-start opacity-0", props.className]);

function shouldRenderAsPlainText(label: string) {
  return label === "RE/MAX" || label === "Lemon Soda" || label === "TD Cowen Dashboard";
}
</script>
