<script lang="ts" setup>
import Weather from "~/components/home/description/Weather.vue";
import Time from "~/components/home/description/Time.vue";
</script>

<template>
  <div class="gap-xl flex flex-col-reverse justify-between md:flex-row left-0">
    <div class="animate-fadeInUp mt-auto w-full opacity-0 md:w-96">
      <h1 class="text-foreground-muted">
        <strong class="text-foreground text-sm">
          Code Wizard with 4 years of experience️ &#8226; Design Alchemist &#8226; Turning binary
          code into digital magic.
        </strong>
        Transforming wild ideas into pixel-perfect realities. Seeking the limit.
      </h1>
      <div class="mt-sm gap-md flex">
        <span class="text-foreground-muted text-xs"> Wiesbaden (DE)</span>
        <div class="flex gap-1">
          <Weather />
        </div>
        <Time />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
