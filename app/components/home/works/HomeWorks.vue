<script lang="ts" setup>
import { worksCards } from "~/domain/works";
import HomeWorkCard from "~/components/home/works/HomeWorkCard.vue";
import { useHomeWorksRail } from "~/composables/animations/home/useHomeWorksRail";

const wrapperRef = ref<HTMLElement | null>(null);

const { onHoverIn, onHoverOut, onImageClick } = useHomeWorksRail({
  wrapperRef,
  works: worksCards,
});
</script>

<template>
  <div ref="wrapperRef" class="w-full pb-2.5 h-full flex items-end pointer-events-none">
    <ul class="flex flex-nowrap flex-row justify-end items-end list-none pointer-events-auto">
      <HomeWorkCard
        v-for="(work, idx) in worksCards"
        :key="work.slug"
        :index="idx"
        :work="work"
        @hover-in="onHoverIn"
        @hover-out="onHoverOut"
        @image-click="onImageClick"
      />
    </ul>
  </div>
</template>
