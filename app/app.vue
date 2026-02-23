<script lang="ts" setup>
import { gsap } from "gsap";
import { nextTick, ref, watch } from "vue";
import Navbar from "~/components/global/navbar/Navbar.vue";
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";

const pageEl = ref<HTMLDivElement | null>(null);
const { phase } = useCurtainTransition();

function setEnterInitial() {
  if (!pageEl.value) return;
  gsap.set(pageEl.value, { y: 100 });
}

watch(phase, async (p) => {
  await nextTick();
  if (!pageEl.value) return;

  if (p === "covering") {
    gsap.to(pageEl.value, {
      y: -200,
      duration: 0.7,
      ease: "power2.in",
    });
    return;
  }

  if (p === "revealing") {
    setEnterInitial();
    gsap.to(pageEl.value, {
      y: 0,
      duration: 0.5,
      delay: 0.15,
      ease: "power2.out",
    });
  }
});

useHead({
  script: [
    {
      innerHTML: `
        (function() {
          try {
            const savedTheme = localStorage.getItem('theme');
            const supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches === true;
            if (savedTheme === 'dark' || (!savedTheme && supportDarkMode)) {
              document.documentElement.classList.add('dark');
            }
          } catch (e) {}
        })();
      `,
      type: "text/javascript",
    },
  ],
});
</script>

<template>
  <Navbar />
  <ClientOnly>
    <CursorHelper />
  </ClientOnly>
  <div ref="pageEl">
    <NuxtPage />
  </div>
  <CurtainTransition />
</template>
