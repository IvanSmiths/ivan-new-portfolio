<script lang="ts" setup>
import type { WorkProjectPage } from "~/domain/works/types";

const props = defineProps<{
  work: WorkProjectPage;
}>();
</script>

<template>
  <section class="bg-background text-foreground w-full">
    <div class="flex flex-row gap-12">
      <div class="flex w-1/2 flex-col gap-3">
        <span class="mb-2 block text-xs uppercase">The Project</span>
        <p class="text-4xl">
          {{ work?.description }}
        </p>
      </div>

      <div class="flex flex-col gap-12">
        <div>
          <span class="mb-2 block text-xs uppercase">Role</span>
          <span> {{ work?.role }}</span>
        </div>

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
