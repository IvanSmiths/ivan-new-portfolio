<script lang="ts" setup>
import Weather from "~/components/home/description/Weather.vue";
import Time from "~/components/home/description/Time.vue";
</script>

<template>
  <div class="gap-2.5 pt-10 pl-2.5 flex flex-col-reverse h-full items-center md:flex-row">
    <div class="animate-fadeInUp w-full opacity-0 md:w-96">
      <h1 class="text-foreground text-base">
        <strong class="font-normal"> Fullstack developer, 5 years in the field️. </strong>
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
