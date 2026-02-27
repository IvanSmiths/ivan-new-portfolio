<script lang="ts" setup>
import { worksCards } from "~/domain/works";
import HomeWorkCard from "~/components/home/works/HomeWorkCard.vue";
import { useHomeWorksLoop } from "~/composables/animations/home/useHomeWorksLoop";

const { register, unregister, onHoverIn, onHoverOut, onImageClick } = useHomeWorksLoop(worksCards);
</script>

<template>
  <div class="flex w-full items-start justify-start md:mt-12">
    <ul class="flex list-none flex-row flex-nowrap items-start justify-start">
      <HomeWorkCard
        v-for="work in worksCards"
        :key="work.slug"
        :work="work"
        @register="register"
        @unregister="unregister"
        @hover-in="onHoverIn"
        @hover-out="onHoverOut"
        @image-click="onImageClick"
      />
    </ul>
  </div>
</template>
