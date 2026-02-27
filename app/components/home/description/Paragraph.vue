<script lang="ts" setup>
import Weather from "~/components/home/description/Weather.vue";
import Time from "~/components/home/description/Time.vue";
import Logo2 from "~/components/home/description/Logo2.vue";
</script>

<template>
  <div class="flex flex-col items-end gap-5 px-5">
    <div
      class="animate-fadeInUp flex w-full flex-col items-start opacity-0 md:flex-row md:items-end md:justify-between"
    >
      <h1 class="text-foreground 3xl:text-2xl 3xl:w-134 text-base md:w-96">
        <strong class="font-normal"> Fullstack developer, 5 years in the field️. </strong>
        Transforming wild ideas into pixel-perfect realities.
      </h1>
      <div class="text-foreground-muted 3xl:text-xl mt-5 flex gap-2.5 text-xs">
        <span> Wiesbaden (DE)</span>
        <div class="flex gap-1">
          <Weather />
        </div>
        <Time />
      </div>
    </div>
    <div class="flex w-full">
      <Logo2 />
    </div>
  </div>
</template>
