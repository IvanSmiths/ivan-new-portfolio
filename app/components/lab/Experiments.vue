<script lang="ts" setup>
import { onBeforeUnmount, ref, watch } from "vue";
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";
import { type Experiment, projects } from "~/domain/lab/data/projects";
import AppGrid from "~/components/global/grid/AppGrid.vue";

const failedVideos = ref<Record<string, boolean>>({});
const videosEnabled = ref(false);
const { phase } = useCurtainTransition();
type TimerHandle = number | ReturnType<typeof setTimeout>;
let enableVideosTimeout: TimerHandle | null = null;

const hasVideo = (experiment: Experiment) => {
  return videosEnabled.value && Boolean(experiment.video) && !failedVideos.value[experiment.title];
};

function enableVideosAfterReveal() {
  if (!import.meta.client || videosEnabled.value || enableVideosTimeout) return;

  enableVideosTimeout = window.setTimeout(() => {
    videosEnabled.value = true;
    enableVideosTimeout = null;
  }, 140);
}

function pauseLabVideos() {
  if (!import.meta.client) return;
  const videos = document.querySelectorAll<HTMLVideoElement>("[data-lab-experiment-video]");
  videos.forEach((video) => video.pause());
}

function disableVideosForCover() {
  if (enableVideosTimeout !== null) {
    window.clearTimeout(enableVideosTimeout);
    enableVideosTimeout = null;
  }
  pauseLabVideos();
  videosEnabled.value = false;
}

function onVideoError(title: string) {
  failedVideos.value = {
    ...failedVideos.value,
    [title]: true,
  };
}

watch(
  phase,
  (currentPhase) => {
    if (currentPhase === "covering") {
      disableVideosForCover();
      return;
    }

    if (currentPhase === "idle") {
      enableVideosAfterReveal();
    }
  },
  { immediate: true, flush: "sync" },
);

onBeforeUnmount(() => {
  if (enableVideosTimeout === null) return;
  window.clearTimeout(enableVideosTimeout);
  enableVideosTimeout = null;
});
</script>

<template>
  <AppGrid class="px-md" twelve-columns>
    <article
      v-for="experiment in projects"
      :key="experiment.title"
      class="col-span-2 flex flex-col gap-3 overflow-hidden py-6"
    >
      <div class="text-left">
        <a :href="experiment.link" class="block" rel="noreferrer noopener" target="_blank">
          <div class="relative overflow-hidden">
            <img
              v-if="!hasVideo(experiment)"
              :alt="experiment.title"
              :src="experiment.image"
              class="max-h-140 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
            <video
              v-else
              data-lab-experiment-video
              :poster="experiment.image"
              autoplay
              class="max-h-140 w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              loop
              muted
              playsinline
              preload="metadata"
              @error="onVideoError(experiment.title)"
            >
              <source :src="experiment.video" type="video/mp4" />
            </video>
          </div>
        </a>
        <div class="mt-3">
          <div class="gap-sm flex items-center">
            <h3 class="text-foreground text-sm">{{ experiment.title }}</h3>
            <h4
              class="text-foreground bg-background/70 px-sm rounded-full border border-white/20 py-1 text-xs tracking-widest shadow-lg"
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
