<script lang="ts" setup>
import AboutClients from "~/components/about/clients/AboutClients.vue";
import AboutDescription from "~/components/about/description/AboutDescription.vue";
import AboutHero from "~/components/about/hero/AboutHero.vue";
</script>

<template>
  <section class="bg-background px-5">
    <AboutHero />
    <AboutDescription />
    <AboutClients />
  </section>
</template>
