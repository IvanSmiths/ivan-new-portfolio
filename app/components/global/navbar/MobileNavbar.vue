<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useMobileNavbarAnimation } from "~/composables/animations/global/useMobileNavbarAnimation";
import ThemeToggle from "~/components/global/navbar/ThemeToggle.vue";

const appConfig = useAppConfig();
const route = useRoute();

const mobileRoutes = computed(() =>
  appConfig.internalRoutes.map((link) => ({
    ...link,
    isActive: link.url === "/" ? route.path === "/" : route.path.startsWith(link.url),
  })),
);

const {
  isOpen,
  navRef,
  contentRef,
  listRef,
  buttonRef,
  topLineRef,
  middleLineRef,
  bottomLineRef,
  labelRefs,
  closeMenu,
  toggleMenu,
} = useMobileNavbarAnimation();
</script>

<template>
  <nav
    ref="navRef"
    :aria-expanded="isOpen"
    aria-label="Mobile navigation"
    class="bg-foreground fixed right-5 bottom-5 z-9999 size-8 overflow-hidden backdrop-blur-md md:hidden"
  >
    <div ref="contentRef" class="grid w-max justify-items-end gap-3 p-1.5">
      <ul
        v-show="isOpen"
        ref="listRef"
        :aria-hidden="!isOpen"
        :class="isOpen ? 'pointer-events-auto' : 'pointer-events-none'"
        class="flex flex-col items-end gap-2 pt-3 pr-3 pl-7 text-right"
      >
        <li v-for="link in mobileRoutes" :key="link.url" class="w-full">
          <NuxtLink
            :class="link.isActive ? 'text-background' : 'text-background-muted'"
            :prefetch="true"
            :tabindex="isOpen ? 0 : -1"
            :to="link.url"
            class="block text-base transition-opacity duration-200 active:opacity-60"
            @click="closeMenu"
          >
            <span ref="labelRefs">{{ link.label }}</span>
          </NuxtLink>
        </li>
        <ThemeToggle />
      </ul>

      <div class="h-7">
        <button
          ref="buttonRef"
          :aria-label="isOpen ? 'Close navigation' : 'Open navigation'"
          :aria-pressed="isOpen"
          class="bg-foreground text-background fixed right-0 bottom-0 flex size-8 cursor-pointer items-center justify-center"
          type="button"
          @click="toggleMenu"
        >
          <span class="sr-only">{{ isOpen ? "Close navigation" : "Open navigation" }}</span>
          <span class="relative block h-3.5 w-3.5">
            <span ref="topLineRef" class="bg-background absolute top-0 left-0 block h-px w-full" />
            <span
              ref="middleLineRef"
              class="bg-background absolute top-1/2 left-0 block h-px w-full -translate-y-1/2"
            />
            <span
              ref="bottomLineRef"
              class="bg-background absolute bottom-0 left-0 block h-px w-full"
            />
          </span>
        </button>
      </div>
    </div>
  </nav>
</template>
