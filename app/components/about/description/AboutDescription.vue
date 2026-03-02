<script lang="ts" setup>
import { useWorkSectionAnimation } from "~/composables/animations/work/useWorkSectionAnimation";

const { shortDescriptionRef } = useWorkSectionAnimation();

const bla = [
  { link: "https://www.google.com", label: "Google" },
  { link: "https://www.google.com", label: "Google" },
];
</script>

<template>
  <section class="bg-background text-foreground w-full px-48 pb-20">
    <div class="flex w-full flex-row justify-between gap-3">
      <span class="mb-5 block text-xs">TL;DR</span>
      <p ref="shortDescriptionRef" class="block pl-36 text-8xl font-black uppercase">
        Msnsk sakjdsnkd akjnsdjdnksajndk
      </p>
    </div>
    <div class="flex w-full flex-col py-20">
      <span class="mb-5 block text-xs">Who am I?</span>
      <p class="text-2xl">
        Imsdiam odo asjosa dsijdisajdsajios ajdoasdjsd asj dsjad asjsad sajdasod asj dasjd saiodj
        oasjid sdij asodij asdij sadoij asdoija sdiojsd oaisj saoidj saiojd saoijd saoijd saoijd
        aijda
      </p>
    </div>
  </section>
</template>
