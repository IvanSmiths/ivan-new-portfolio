<script lang="ts" setup>
const appConfig = useAppConfig();
const { setHover, clearHover } = useCursorHelper();

const email = computed(() => appConfig.contacts?.[0]?.email ?? "");
const socials = computed(() => appConfig.socials ?? []);
const onEnter = (iconSrc: string) => setHover(iconSrc);
const onLeave = () => clearHover();
</script>

<template>
  <main class="h-dvh w-screen grid place-items-center px-6 bg-background">
    <section class="flex flex-col text-sm text-foreground items-start gap-2.5">
      <span class="hover:opacity-80 transition-opacity">
        <a
          :href="`mailto:${email}`"
          @mouseenter="onEnter('/icons/email.svg')"
          @mouseleave="onLeave"
        >
          {{ email }}
        </a>
      </span>
      <span v-for="social in socials" :key="social.url" class="hover:opacity-80 transition-opacity">
        <a
          :href="social.url"
          rel="noreferrer"
          target="_blank"
          @mouseenter="onEnter('/icons/email.svg')"
          @mouseleave="onLeave"
        >
          {{ social.label }}
        </a>
      </span>
    </section>
  </main>
</template>
