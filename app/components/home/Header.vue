<template>
  <header class="relative z-20 flex flex-col gap-sm">
    <!-- Logo -->
    <div class="flex">
      <svg fill="none" viewBox="0 0 1472 310" xmlns="http://www.w3.org/2000/svg">
        <title>Logo</title>
        <path
            class="fill-foreground transition"
            d="M0 310V0H72.9995V310H0ZM139.992 310C128.149 310 118.416 309.704 110.792 309.114C103.329 308.229 97.4893 306.161 93.272 302.914C89.0543 299.667 86.0532 294.204 84.2687 286.529C82.4843 278.853 81.3488 268.224 80.8621 254.643C80.5377 240.767 80.3754 223.053 80.3754 201.5V0H153.375V168.286C153.375 171.829 153.456 174.19 153.618 175.371C153.942 176.257 154.672 176.848 155.808 177.143H158.241V0H231.241V201.5C231.241 223.053 230.998 240.767 230.511 254.643C230.187 268.224 229.132 278.853 227.348 286.529C225.563 294.204 222.562 299.667 218.344 302.914C214.127 306.161 208.287 308.229 200.824 309.114C193.362 309.704 183.629 310 171.625 310H139.992Z"
        />
      </svg>
    </div>

    <!-- Trust text -->
    <p class="text-foreground-muted pb-1 text-xs uppercase font-dm-mono">
      Trusted by
      <span
          v-text-swap="{ value: hoveredCompany, fallback: 'Pioneers' }"
          class="inline-block transition-opacity duration-200"
      />
    </p>

    <!-- Companies -->
    <div class="gap-md flex w-full flex-wrap justify-start">
      <div
          v-for="(logo, index) in logos"
          :key="index"
          :style="{ animationDelay: `${index * 80}ms` }"
          class="animate-fadeInUp flex w-20 opacity-0 lg:flex-1"
      >
        <NuxtLink
            :scroll="false"
            :to="`/works/${logo.slug}`"
            class="group hover:bg-foreground border-background-muted relative flex w-20 items-center justify-center border p-4 transition duration-300 lg:flex-1"
            @mouseenter="hoveredCompany = logo.name"
            @mouseleave="hoveredCompany = null"
        >
          <span
              v-for="(pos, i) in plusPositions"
              :key="i"
              :class="`absolute ${pos} text-foreground-muted text-xs leading-0 font-bold`"
          >+</span>

          <img
              :alt="logo.name"
              :src="`/logo/${logo.src}`"
              class="h-8 w-fit object-contain grayscale transition duration-300 group-hover:grayscale-0 lg:h-12"
              height="32"
              width="32"
          />
        </NuxtLink>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const hoveredCompany = ref<string | null>(null);

const plusPositions = [
  "top-0 -left-1",
  "top-0 -right-1",
  "bottom-0 -left-1",
  "bottom-0 -right-1"
];

const logos = [
  { src: "coba-logo.png", name: "Commerzbank", slug: "neugelb" },
  { src: "td-cowen.svg", name: "TD COWEN", slug: "td-cowen" },
  { src: "remax-logo.png", name: "re/max", slug: "ideology" },
  { src: "suv-logo.png", name: "Scholz & Volkmer", slug: "scholz-und-volkmer" },
  { src: "adidas-logo.svg", name: "Adidas", slug: "scholz-und-volkmer" },
  { src: "db-logo.svg", name: "Deutsche Bahn", slug: "scholz-und-volkmer" },
  { src: "id-logo.png", name: "Ideology", slug: "ideology" },
  { src: "lemon-soda-logo.png", name: "LemonSoda", slug: "ideology" },
  { src: "neugelb-logo.svg", name: "NeuGelb", slug: "neugelb" },
  { src: "rv-logo.png", name: "R+V", slug: "scholz-und-volkmer" },
  { src: "wmf-logo.svg", name: "WMF", slug: "scholz-und-volkmer" }
];
</script>

<style scoped>
.font-dm-mono {
  font-family: "DM Mono", monospace;
}
</style>
