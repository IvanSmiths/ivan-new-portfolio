<script lang="ts" setup>
import { gsap } from "gsap";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { type Experiment, experiments } from "~/domain/lab/experiments";

const selectedExperiment = ref<Experiment | null>(null);
const backdropRef = ref<HTMLDivElement | null>(null);
const previewRef = ref<HTMLDivElement | null>(null);
const detailsRef = ref<HTMLDivElement | null>(null);

let overlayTl: gsap.core.Timeline | null = null;

const playOpenAnimation = () => {
  if (!backdropRef.value || !previewRef.value || !detailsRef.value) return;

  overlayTl?.kill();
  gsap.set(backdropRef.value, { opacity: 0 });
  gsap.set(previewRef.value, { opacity: 0, y: 36, scale: 0.92 });
  gsap.set(detailsRef.value, { opacity: 0, x: 42 });

  overlayTl = gsap
    .timeline({ defaults: { ease: "power3.out" } })
    .to(backdropRef.value, { opacity: 0.9, duration: 0.4 }, 0)
    .to(previewRef.value, { opacity: 1, y: 0, scale: 1, duration: 0.4 }, 0.04)
    .to(detailsRef.value, { opacity: 1, x: 0, duration: 0.36 }, 0.12);
};

const openExperiment = async (experiment: Experiment) => {
  selectedExperiment.value = experiment;
  await nextTick();
  playOpenAnimation();
};

const closeExperiment = () => {
  if (!selectedExperiment.value) return;

  if (!backdropRef.value || !previewRef.value || !detailsRef.value) {
    selectedExperiment.value = null;
    return;
  }

  overlayTl?.kill();
  overlayTl = gsap
    .timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        selectedExperiment.value = null;
        overlayTl = null;
      },
    })
    .to(detailsRef.value, { opacity: 0, x: 24, duration: 0.22 }, 0)
    .to(previewRef.value, { opacity: 0, y: 20, scale: 0.96, duration: 0.24 }, 0)
    .to(backdropRef.value, { opacity: 0, duration: 0.22 }, 0.05);
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") closeExperiment();
};

watch(selectedExperiment, (experiment) => {
  if (!import.meta.client) return;
  document.body.style.overflow = experiment ? "hidden" : "";
});

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  overlayTl?.kill();
  if (import.meta.client) window.removeEventListener("keydown", onKeydown);
  if (import.meta.client) document.body.style.overflow = "";
});
</script>

<template>
  <div class="flex flex-col justify-start gap-5 p-5 md:flex-row">
    <div v-for="experiment in experiments" :key="experiment.title" class="overflow-hidden">
      <button class="cursor-pointer" type="button" @click="openExperiment(experiment)">
        <img
          :alt="experiment.title"
          :class="[
            'h-72 object-cover transition-transform duration-300 hover:scale-[1.02]',
            experiment.aspectRatio === 'portrait' ? 'aspect-3/4 w-40' : 'aspect-video w-96',
          ]"
          :src="experiment.image"
        />
      </button>
    </div>
  </div>

  <div v-if="selectedExperiment" class="fixed inset-0 z-50">
    <div
      ref="backdropRef"
      class="bg-background absolute inset-0"
      style="opacity: 0"
      @click="closeExperiment"
    />
    <div
      class="relative z-10 flex h-full w-full items-center justify-center px-5 py-10"
      @click="closeExperiment"
    >
      <div class="flex flex-col items-start justify-center gap-5 md:flex-row" @click.stop>
        <div ref="previewRef" class="flex">
          <img
            :alt="selectedExperiment.title"
            :src="selectedExperiment.image"
            class="h-72 w-72 object-contain"
          />
        </div>

        <div ref="detailsRef" class="text-foreground flex w-96 flex-col justify-center gap-3">
          <h3 class="text-3xl font-bold uppercase">{{ selectedExperiment.title }}</h3>
          <p class="text-base">{{ selectedExperiment.description }}</p>
          <p class="text-foreground-muted text-sm">Year: {{ selectedExperiment.year }}</p>
          <p class="text-foreground-muted text-sm">Category: {{ selectedExperiment.category }}</p>
          <a
            v-if="selectedExperiment.link"
            :href="selectedExperiment.link"
            class="inline-block underline underline-offset-2"
            rel="noreferrer noopener"
            target="_blank"
          >
            Visit Website
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
