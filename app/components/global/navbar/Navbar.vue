<script lang="ts" setup>
import VolumeOffIcon from "~/components/global/icons/VolumeOffIcon.vue";
import VolumeOnIcon from "~/components/global/icons/VolumeOnIcon.vue";
import ThemeToggle from "~/components/global/navbar/ThemeToggle.vue";
import { useSoundPreference } from "~/composables/useSoundPreference";

import { computed, onMounted } from "vue";

const appConfig = useAppConfig();
const internalRoutes = appConfig.internalRoutes;
const { initSoundPreference, soundEnabled, toggleSound } = useSoundPreference();

const navigationLinks = computed(() =>
  internalRoutes.map((link) => ({
    ...link,
  })),
);

const soundToggleIcon = computed(() => (soundEnabled.value ? VolumeOnIcon : VolumeOffIcon));
const soundToggleLabel = computed(() =>
  soundEnabled.value ? "Disable sounds" : "Enable sounds",
);

onMounted(() => {
  initSoundPreference();
});
</script>

<template>
  <nav
    class="text-foreground bottom-md right-md md:left-md md:top-md fixed z-30 text-base md:bottom-auto"
  >
    <ul class="flex items-start gap-1">
      <li
        v-for="(link, index) in navigationLinks"
        :key="link.url"
        class="text-foreground-muted flex items-baseline"
      >
        <NuxtLink :to="link.url" class="text-foreground flex transition-opacity hover:opacity-80">
          {{ link.label }}<span v-if="index !== navigationLinks.length - 1">,</span>
        </NuxtLink>
      </li>
    </ul>
    <button
      :aria-label="soundToggleLabel"
      :title="soundToggleLabel"
      class="group mt-2 flex cursor-pointer transition-opacity hover:opacity-80"
      type="button"
      @click="toggleSound"
    >
      <component :is="soundToggleIcon" />
    </button>
    <ThemeToggle />
  </nav>
</template>
