<script lang="ts" setup>
import type { WorkProjectPage } from "~/domain/works/types";

const props = defineProps<{
  work: WorkProjectPage;
}>();
</script>

<template>
  <section class="bg-background text-foreground w-full px-48 pb-20">
    <div class="flex w-full flex-col items-center justify-center gap-3">
      <p class="block w-8/12 text-8xl font-black uppercase">
        {{ work?.shortDescription }}
      </p>
    </div>
    <div class="flex w-full flex-col gap-3 py-20">
      <span class="mb-2 block text-xs uppercase">The Project</span>
      <p class="text-2xl">
        {{ work?.description }}
      </p>
    </div>
    <div class="flex flex-row gap-12">
      <div v-if="work?.worksDone?.length">
        <span class="mb-2 block text-xs uppercase">Clients</span>
        <ul class="space-y-1.5">
          <li
            v-for="(client, i) in work.worksDone"
            :key="i"
            class="flex items-baseline gap-4 text-sm md:text-base"
          >
            <span class="font-light">{{ client.label }}</span>
          </li>
        </ul>
      </div>
      <div class="flex flex-col gap-2.5">
        <span class="mb-2 block text-xs uppercase">Links</span>
        <a
          :href="work.websiteLink"
          class="flex items-center gap-1 text-xs font-bold tracking-widest uppercase underline underline-offset-2 transition-opacity duration-200 hover:opacity-60"
          rel="noopener noreferrer"
          target="_blank"
        >
          Website
        </a>
        <a
          :href="work.linkedinLink"
          class="flex items-center gap-1 text-xs font-bold tracking-widest uppercase underline underline-offset-2 transition-opacity duration-200 hover:opacity-60"
          rel="noopener noreferrer"
          target="_blank"
        >
          Linkedin
        </a>
      </div>
    </div>
  </section>
</template>
