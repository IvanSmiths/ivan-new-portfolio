<script lang="ts" setup>
import type { WorkCard } from "~/domain/works/types";

defineProps<{
  work: WorkCard;
  index: number;
}>();

const emit = defineEmits<{
  hoverIn: [index: number];
  hoverOut: [];
  imageClick: [event: MouseEvent, index: number];
}>();
</script>

<template>
  <li class="work-item w-96 shrink-0 pl-2.5 list-none">
    <div class="flex flex-row justify-between items-end p-2.5 pb-1">
      <div class="flex flex-col">
        <div class="clients flex flex-col gap-1">
          <template v-for="client in work.clients.slice(0, 3)" :key="client">
            <span class="client-item text-xs opacity-0 text-foreground-muted">{{ client }}</span>
          </template>
        </div>

        <span class="text-sm text-foreground font-semibold uppercase pt-1">
          {{ work.role }}
        </span>
      </div>

      <div>
        <span class="text-sm text-foreground font-semibold uppercase">
          {{ work.title }}
        </span>
      </div>
    </div>

    <div
      class="h-112.5 w-full cursor-pointer overflow-hidden"
      @click="emit('imageClick', $event, index)"
      @mouseenter="emit('hoverIn', index)"
      @mouseleave="emit('hoverOut')"
    >
      <img
        :alt="work.title"
        :src="work.image"
        class="work-img h-full w-full object-cover object-top"
        draggable="false"
      />
    </div>
  </li>
</template>
