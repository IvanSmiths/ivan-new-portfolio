<script lang="ts" setup>
import Navbar from "~/components/global/navbar/Navbar.vue";

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
  <NuxtPage />
  <CurtainTransition />
</template>
