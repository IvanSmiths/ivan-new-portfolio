<script lang="ts" setup>
import Experiments from "~/components/lab/Experiments.vue";
import ExperimentsText from "~/components/lab/ExperimentsText.vue";
</script>

<template>
  <section
    class="bg-background text-foreground flex min-h-screen w-full flex-col justify-between pt-10"
  >
    <header class="flex w-full flex-col">
      <ExperimentsText />
      <div />
      <p class="text-muted-foreground text-base">Lab / Experiments</p>
    </header>
    <Experiments />
  </section>
</template>

<style scoped></style>
