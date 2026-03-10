<script lang="ts" setup>
import { ref } from "vue";
import { type Experiment, projects } from "~/domain/lab/data/projects";
import AppGrid from "~/components/global/grid/AppGrid.vue";

const failedVideos = ref<Record<string, boolean>>({});

const hasVideo = (experiment: Experiment) => {
  return Boolean(experiment.video) && !failedVideos.value[experiment.title];
};
</script>

<template>
  <AppGrid>
    <article
      v-for="experiment in projects"
      :key="experiment.title"
      class="col-span-4 flex flex-col gap-3 overflow-hidden py-6"
    >
      <div class="text-left">
        <a :href="experiment.link" class="block" rel="noreferrer noopener" target="_blank">
          <div class="relative overflow-hidden">
            <img
              v-if="!hasVideo(experiment)"
              :alt="experiment.title"
              :src="experiment.image"
              class="w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
            <video
              v-else
              :poster="experiment.image"
              autoplay
              class="w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              loop
              muted
              playsinline
              preload="auto"
            >
              <source :src="experiment.video" type="video/mp4" />
            </video>
          </div>
        </a>
        <div class="mt-3">
          <div class="gap-sm flex items-center">
            <h3 class="text-foreground text-sm">{{ experiment.title }}</h3>
            <h4
              class="text-foreground px-sm rounded-full border border-white/20 py-1 text-xs tracking-widest shadow-lg backdrop-blur-lg"
            >
              {{ experiment.category }}
            </h4>
          </div>
          <p class="text-foreground-muted pt-sm text-xs">{{ experiment.description }}</p>
        </div>
      </div>
    </article>
  </AppGrid>
</template>
