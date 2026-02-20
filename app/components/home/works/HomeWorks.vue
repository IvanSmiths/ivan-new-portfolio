<script lang="ts" setup>
import { worksCards } from "~/domain/works";
import HomeWorkCard from "~/components/home/works/HomeWorkCard.vue";
import { useHomeWorksLoop } from "~/composables/animations/home/useHomeWorksLoop";

const wrapperRef = ref<HTMLElement | null>(null);

const { register, onHoverIn, onHoverOut, onImageClick } = useHomeWorksLoop(worksCards);
</script>

<template>
  <div ref="wrapperRef" class="w-full pb-2.5 h-full flex items-end pointer-events-none">
    <ul class="flex flex-nowrap flex-row justify-end items-end list-none pointer-events-auto">
      <HomeWorkCard
        v-for="(work, idx) in worksCards"
        :key="work.slug"
        :index="idx"
        :work="work"
        @register="register"
        @hover-in="onHoverIn"
        @hover-out="onHoverOut"
        @image-click="onImageClick"
      />
    </ul>
  </div>
</template>
