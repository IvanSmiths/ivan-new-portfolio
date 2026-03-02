<script lang="ts" setup>
const clientLogos = [
  { name: "Adidas", src: "/logo/adidas.svg" },
  { name: "Commerzbank", src: "/logo/commerzbank-logo.svg" },
  { name: "DB", src: "/logo/db.svg" },
  { name: "Lemon Soda", src: "/logo/lemon-soda-logo.png" },
  { name: "R+V", src: "/logo/r+v.svg" },
  { name: "RE/MAX", src: "/logo/remax.svg" },
  { name: "TD Cowen", src: "/logo/td-cowen.svg" },
  { name: "UMB", src: "/logo/umb-logo.svg" },
  { name: "WMF", src: "/logo/wmf.svg" },
] as const;
</script>

<template>
  <section class="bg-background text-foreground w-full px-6 py-20 sm:px-10 lg:px-48">
    <div class="flex w-full flex-col gap-10">
      <span class="block text-xs uppercase">Clients</span>

      <div class="grid grid-cols-6 items-stretch gap-4 lg:gap-6">
        <div
          v-for="logo in clientLogos"
          :key="logo.src"
          class="border-background-muted/60 bg-background-muted/25 flex min-h-28 items-center justify-center rounded-2xl border px-3 py-6"
        >
          <img
            :src="logo.src"
            :alt="logo.name"
            class="max-h-12 w-full object-contain grayscale saturate-0 transition-[filter] duration-300 ease-out hover:grayscale-0 hover:saturate-100"
          />
        </div>
      </div>
    </div>
  </section>
</template>
