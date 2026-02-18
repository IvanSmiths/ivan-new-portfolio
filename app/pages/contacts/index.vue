<script lang="ts" setup>
const appConfig = useAppConfig();

const email = computed(() => appConfig.contacts?.[0]?.email ?? "");
const socials = computed(() => appConfig.socials ?? []);
</script>

<template>
  <main class="h-dvh w-screen grid place-items-center px-6 bg-background">
    <section class="flex flex-col text-sm text-foreground items-start gap-2.5">
      <span class="tracking-tight hover:opacity-80 transition-opacity">
        <a
          :href="`mailto:${email}`"
          class="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
        >
          {{ email }}
        </a>
      </span>

      <span
        v-for="s in socials"
        :key="s.url"
        class="tracking-tight hover:opacity-80 transition-opacity"
      >
        <a
          :href="s.url"
          class="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
          rel="noreferrer"
          target="_blank"
        >
          {{ s.label }}
        </a>
      </span>
    </section>
  </main>
</template>
