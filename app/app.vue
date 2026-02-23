<script lang="ts" setup>
import { gsap } from "gsap";
import { nextTick, ref, watch } from "vue";
import Navbar from "~/components/global/navbar/Navbar.vue";
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";

const pageEl = ref<HTMLDivElement | null>(null);
const { phase } = useCurtainTransition();

const { $ScrollTrigger } = useNuxtApp();

function setEnterInitial() {
  if (!pageEl.value) return;
  gsap.set(pageEl.value, { y: 100 });
}

watch(phase, async (p) => {
  await nextTick();
  if (!pageEl.value) return;
  gsap.killTweensOf(pageEl.value);

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
      onComplete: () => {
        if (!pageEl.value) return;
        gsap.set(pageEl.value, { clearProps: "transform" });

        // ✅ NOW ScrollTrigger measures correct positions
        // The transform is cleared, DOM is stable
        $ScrollTrigger.refresh();
      },
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
  <div>
    <div ref="pageEl">
      <NuxtPage />
    </div>
  </div>
  <CurtainTransition />
</template>
