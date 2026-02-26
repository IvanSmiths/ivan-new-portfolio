<script lang="ts" setup>
import type { WorkProjectPage } from "~/domain/works/types";
import { useWorkSectionAnimation } from "~/composables/animations/work/useWorkSectionAnimation";
import ExternalLink from "~/components/global/icons/ExternalLink.vue";

const props = defineProps<{
  work: WorkProjectPage;
}>();
const { shortDescriptionRef } = useWorkSectionAnimation();
</script>

<template>
  <section class="bg-background text-foreground w-full px-48 pb-20">
    <div class="flex w-full flex-row justify-between gap-3">
      <span class="mb-5 block text-xs">TL;DR</span>
      <p ref="shortDescriptionRef" class="block pl-36 text-8xl font-black uppercase">
        {{ work?.shortDescription }}
      </p>
    </div>
    <div class="flex w-full flex-col py-20">
      <span class="mb-5 block text-xs">The Project</span>
      <p class="text-2xl">
        {{ work?.description }}
      </p>
    </div>
    <div class="flex flex-row gap-24">
      <div v-if="work?.worksDone?.length">
        <span class="mb-5 block text-xs">Clients</span>
        <ul class="space-y-1.5">
          <li v-for="(client, i) in work.worksDone" :key="i" class="text-sm md:text-base">
            <a
              :href="client.link"
              class="flex flex-row justify-start gap-1 text-xs font-bold uppercase transition-opacity duration-200 hover:opacity-90"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>{{ client.label }}</span>
              <ExternalLink />
            </a>
          </li>
        </ul>
      </div>
      <div>
        <span class="mb-5 block text-xs">Links</span>
        <ul class="space-y-1.5">
          <li>
            <a
              :href="work.websiteLink"
              class="flex flex-row justify-start gap-1 text-xs font-bold uppercase transition-opacity duration-200 hover:opacity-90"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Website</span>
              <ExternalLink />
            </a>
          </li>
          <li>
            <a
              :href="work.linkedinLink"
              class="flex flex-row items-center justify-center gap-1 text-xs font-bold uppercase transition-opacity duration-200 hover:opacity-90"
              rel="noopener noreferrer"
              target="_blank"
            >
              Linkedin <ExternalLink />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
