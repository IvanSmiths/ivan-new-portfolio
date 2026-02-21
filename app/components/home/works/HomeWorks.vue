<script lang="ts" setup>
import { worksCards } from "~/domain/works";
import HomeWorkCard from "~/components/home/works/HomeWorkCard.vue";
import { useHomeWorksLoop } from "~/composables/animations/home/useHomeWorksLoop";

const wrapperRef = ref<HTMLElement | null>(null);

const { register, onHoverIn, onHoverOut, onImageClick } = useHomeWorksLoop(worksCards);
</script>

<template>
  <div ref="wrapperRef" class="w-full flex items-start justify-start md:mt-11">
    <ul class="flex flex-nowrap flex-row justify-start items-start list-none">
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
