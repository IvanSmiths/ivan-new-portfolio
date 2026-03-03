<script lang="ts" setup>
import AboutHeroMobile from "~/components/about/hero/AboutHeroMobile.vue";
import AboutText from "~/components/about/hero/AboutText.vue";
</script>

<template>
  <AboutHeroMobile />
  <div class="relative hidden min-h-screen w-full flex-col items-center justify-center xl:flex">
    <AboutText />
  </div>
</template>

<style scoped></style>
