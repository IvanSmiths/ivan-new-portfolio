<script lang="ts" setup>
import { ref } from "vue";
import Navbar from "~/components/global/navbar/Navbar.vue";

const pageEl = ref<HTMLDivElement | null>(null);

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

            if (sessionStorage.getItem('works_loader_seen') === '1') {
              document.documentElement.classList.add('loader-seen');
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
  <WorkExpandLayer />
  <CurtainTransition :page-el="pageEl" />
</template>
