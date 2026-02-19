<script lang="ts" setup>
import type { Component } from "vue";
import GitHubIcon from "~/components/global/icons/social/GitHub.vue";
import YouTubeIcon from "~/components/global/icons/social/YouTube.vue";
import LinkedInIcon from "~/components/global/icons/social/LinkedIn.vue";

const appConfig = useAppConfig();
const { setHover, clearHover, showTempHoverText } = useCursorHelper();

const email = computed(() => appConfig.contacts?.[0]?.email ?? "");
const socials = computed(() => appConfig.socials ?? []);

const socialIconMap: Record<string, Component> = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
};

const getSocialIcon = (social: { label?: string }) => {
  return socialIconMap[social.label?.toLowerCase() ?? ""] ?? null;
};

const copyEmail = async () => {
  if (!email.value) return;

  try {
    await navigator.clipboard.writeText(email.value);
    showTempHoverText("copied!", 1600);
  } catch {
    // optional: fallback message
    showTempHoverText("failed", 1600);
  }
};
</script>

<template>
  <main class="h-dvh w-screen grid place-items-center px-6 bg-background">
    <section class="flex flex-col text-sm text-foreground items-start gap-2.5">
      <span class="hover:opacity-80 transition-opacity">
        <a
          :href="`mailto:${email}`"
          @mouseenter="() => setHover({ text: 'copy to clipboard' })"
          @mouseleave="clearHover"
          @click.prevent="copyEmail"
        >
          {{ email }}
        </a>
      </span>

      <span v-for="social in socials" :key="social.url" class="hover:opacity-80 transition-opacity">
        <a
          :href="social.url"
          rel="noreferrer"
          target="_blank"
          @mouseenter="
            () => {
              const icon = getSocialIcon(social);
              if (icon) setHover({ iconComponent: icon });
            }
          "
          @mouseleave="clearHover"
        >
          {{ social.label }}
        </a>
      </span>
    </section>
  </main>
</template>
