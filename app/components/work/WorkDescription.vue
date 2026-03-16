<script lang="ts" setup>
import type { WorkProjectPage } from "~/domain/works/types";
import { useSectionAnimation } from "~/composables/animations/work/useSectionAnimation";
import AppGrid from "~/components/global/grid/AppGrid.vue";

const props = defineProps<{
  work: WorkProjectPage;
}>();
const { shortDescriptionRef } = useSectionAnimation();
</script>

<template>
  <AppGrid as="section" class="bg-background text-foreground w-full pb-20">
    <span class="col-span-full mb-5 block text-xs md:col-start-2">TL;DR</span>
    <p
      ref="shortDescriptionRef"
      class="col-span-full block text-5xl font-black uppercase md:col-start-4 md:col-end-12 md:text-7xl lg:text-8xl"
    >
      {{ work?.shortDescription }}
    </p>
    <div class="col-span-full flex w-full flex-col py-20 md:col-start-2 md:col-end-12">
      <span class="mb-5 block text-xs">The Project</span>
      <p class="text-2xl">{{ work?.description }}</p>
    </div>
    <div v-if="work?.worksDone?.length" class="col-start-1 col-end-4 md:col-start-2">
      <span class="mb-1 block text-xs md:mb-5">Clients</span>
      <ul class="space-y-1.5">
        <li v-for="(client, i) in work.worksDone" :key="i" class="text-sm md:text-base">
          <a
            :href="client.link"
            class="flex flex-row justify-start gap-1 transition-opacity duration-200 hover:opacity-90"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Chip :label="client.label" class="mt-1" external />
          </a>
        </li>
      </ul>
    </div>
    <div class="col-start-5 md:col-start-4">
      <span class="mb-1 block text-xs md:mt-0 md:mb-5">Links</span>
      <ul class="space-y-1.5">
        <li>
          <a
            :href="work.websiteLink"
            class="flex flex-row justify-start gap-1 transition-opacity duration-200 hover:opacity-90"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Chip class="mt-1" external label="Website" />
          </a>
        </li>
        <li>
          <a
            :href="work.linkedinLink"
            class="flex flex-row items-center justify-start gap-1 transition-opacity duration-200 hover:opacity-90"
            rel="noopener noreferrer"
            target="_blank"
          >
            <Chip external label="Linkedin" />
          </a>
        </li>
      </ul>
    </div>
  </AppGrid>
</template>
