<script lang="ts" setup>
const appConfig = useAppConfig();
const { setHover, clearHover } = useCursorHelper();

const email = computed(() => appConfig.contacts?.[0]?.email ?? "");

type SocialItem = {
  key: "github" | "linkedIn" | "youtube";
  url: string;
  icon: string;
  label: string;
};

const socials = computed<SocialItem[]>(() => {
  const items: SocialItem[] = [];

  for (const entry of appConfig.socials ?? []) {
    const key = Object.keys(entry)[0] as SocialItem["key"];
    const value = (entry as any)[key];

    const url = value?.url;
    if (!url) continue;

    const iconMap: Record<SocialItem["key"], string> = {
      github: "/icons/github.svg",
      linkedIn: "/icons/linkedin.svg",
      youtube: "/icons/youtube.svg",
    };

    const labelMap: Record<SocialItem["key"], string> = {
      github: "GitHub",
      linkedIn: "LinkedIn",
      youtube: "YouTube",
    };

    items.push({
      key,
      url,
      icon: iconMap[key],
      label: labelMap[key],
    });
  }
  return items;
});

const onEnter = (iconSrc: string) => setHover(iconSrc);
const onLeave = () => clearHover();
</script>

<template>
  <main class="h-dvh w-screen grid place-items-center px-6 bg-background">
    <section class="flex flex-col text-sm text-foreground items-start gap-2.5">
      <span
        class="tracking-tight hover:opacity-80 transition-opacity"
        @mouseenter="onEnter('/icons/email.svg')"
        @mouseleave="onLeave"
      >
        <a
          :href="`mailto:${email}`"
          class="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-4"
        >
          {{ email }}
        </a>
      </span>
      <span
        v-for="s in socials"
        :key="s.key"
        class="tracking-tight hover:opacity-80 transition-opacity"
        @mouseenter="onEnter(s.icon)"
        @mouseleave="onLeave"
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
