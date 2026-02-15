<script lang="ts" setup>
import CurtainTransition from "~/components/global/CurtainTransition.vue";
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
      type: "text/javascript"
    }
  ]
});
</script>

<template>
  <NuxtPage />
  <Navbar />
  <CurtainTransition />
</template>
