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
  <li class="work-item w-96 lg:w-130 xl:w-150 2xl:w-230 shrink-0 pl-2.5 list-none">
    <div
      class="flex flex-row justify-between items-end p-2.5 pb-1 text-foreground font-semibold text-sm uppercase"
    >
      <div class="flex flex-col">
        <div class="clients hidden lg:flex flex-col gap-1">
          <template v-for="client in work.clients.slice(0, 3)" :key="client">
            <span class="client-item text-xs opacity-0 text-foreground-muted">{{ client }}</span>
          </template>
        </div>

        <span class="md:block hidden pt-1">
          {{ work.role }}
        </span>
      </div>

      <span class="md:block hidden">
        {{ work.title }}
      </span>
    </div>

    <div
      class="md:h-116 h-140 w-full cursor-pointer overflow-hidden"
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
