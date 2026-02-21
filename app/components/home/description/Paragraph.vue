<script lang="ts" setup>
import Weather from "~/components/home/description/Weather.vue";
import Time from "~/components/home/description/Time.vue";
import Logo from "~/components/home/description/Logo.vue";
</script>

<template>
  <div class="flex flex-col gap-2.5 max-sm:pb-6 px-2.5 items-end">
    <div
      class="animate-fadeInUp w-full opacity-0 flex md:flex-row flex-col md:justify-between items-start md:items-end"
    >
      <h1 class="text-foreground text-base 3xl:text-2xl md:w-96 3xl:w-134">
        <strong class="font-normal"> Fullstack developer, 5 years in the field️. </strong>
        Transforming wild ideas into pixel-perfect realities. Seeking the limit.
      </h1>
      <div class="mt-sm gap-md flex text-foreground-muted text-xs 3xl:text-xl">
        <span> Wiesbaden (DE)</span>
        <div class="flex gap-1">
          <Weather />
        </div>
        <Time />
      </div>
    </div>
    <div class="flex w-full">
      <Logo />
    </div>
  </div>
</template>

<style scoped></style>
