<script lang="ts" setup>
import { computed } from "vue";
import RowList from "./RowList.vue";

type Props = {
  description: string[];
  className?: string;
};

const props = defineProps<Props>();

const rootClass = computed(() => [props.className, "opacity-0"]);

const headerClass = computed(() => ["text-foreground-muted pl-sm mt-md block"]);
</script>

<template>
  <div :class="rootClass">
    <span :class="headerClass">Highlight</span>

    <ul class="pl-sm">
      <RowList v-for="(desc, i) in description" :key="i" :desc="desc" />
    </ul>
  </div>
</template>
