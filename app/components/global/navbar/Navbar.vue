<script lang="ts" setup>
import VolumeOffIcon from "~/components/global/icons/VolumeOffIcon.vue";
import VolumeOnIcon from "~/components/global/icons/VolumeOnIcon.vue";
import ThemeToggle from "~/components/global/navbar/ThemeToggle.vue";
import { useCurtainTransition } from "~/composables/animations/global/useCurtainTransition";
import { useSoundPreference } from "~/composables/useSoundPreference";

import { computed, onMounted } from "vue";

const appConfig = useAppConfig();
const internalRoutes = appConfig.internalRoutes;
const { initSoundPreference, soundEnabled, toggleSound } = useSoundPreference();
const { active: isCurtainActive } = useCurtainTransition();
const localePath = useLocalePath();
const { locale, t } = useI18n();

const navigationLinks = computed(() => {
  void locale.value;
  return internalRoutes.map((link) => ({
    ...link,
    label: t(`seo.common.navigation.${link.label.toLowerCase()}`),
    to: localePath(link.url),
  }));
});
const isNavigationLocked = computed(() => isCurtainActive.value);

const soundToggleIcon = computed(() => (soundEnabled.value ? VolumeOnIcon : VolumeOffIcon));
const soundToggleLabel = computed(() =>
  soundEnabled.value ? t("common.sound.disable") : t("common.sound.enable"),
);

function preventNavigationWhileAnimating(event: MouseEvent) {
  if (!isNavigationLocked.value) return;
  event.preventDefault();
  event.stopPropagation();
}

onMounted(() => {
  initSoundPreference();
});
</script>

<template>
  <nav
    class="text-foreground left-md pr-md top-sm fixed z-8 flex w-full justify-between text-base"
    data-page-transition-navbar
  >
    <ul :inert="isNavigationLocked" class="flex items-start gap-1">
      <li
        v-for="(link, index) in navigationLinks"
        :key="link.to"
        class="text-foreground-muted flex items-baseline"
      >
        <NuxtLink
          :aria-disabled="isNavigationLocked ? 'true' : undefined"
          :class="isNavigationLocked ? 'pointer-events-none' : ''"
          :tabindex="isNavigationLocked ? -1 : undefined"
          :to="link.to"
          class="text-foreground flex transition-opacity hover:opacity-80"
          @click="preventNavigationWhileAnimating"
        >
          {{ link.label }}<span v-if="index !== navigationLinks.length - 1">,</span>
        </NuxtLink>
      </li>
    </ul>
    <div class="pr-md gap-md flex sm:gap-3">
      <button
        :aria-label="soundToggleLabel"
        :title="soundToggleLabel"
        class="group cursor-pointer transition-opacity hover:opacity-80"
        type="button"
        @click="toggleSound"
      >
        <component :is="soundToggleIcon" />
      </button>
      <ThemeToggle />
    </div>
  </nav>
</template>
