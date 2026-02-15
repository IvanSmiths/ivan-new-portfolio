<script lang="ts" setup>
import InternalLinks from "./InternalLinks.vue";
import ScrollPercentage from "./ScrollPercentage.vue";

const colorMode = ref<"light" | "dark">("light");

const toggleTheme = () => {
  colorMode.value = colorMode.value === "light" ? "dark" : "light";
  localStorage.setItem("theme", colorMode.value);
  updateTheme();
};

const updateTheme = () => {
  if (colorMode.value === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
};

onMounted(() => {
  const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
  if (savedTheme) {
    colorMode.value = savedTheme;
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    colorMode.value = "dark";
  }
  updateTheme();
});
</script>

<template>
  <nav
    class="fixed bg-background bottom-0 left-0 z-30 flex flex-row-reverse md:flex-row w-full items-center justify-between border-t border-background-muted px-sm py-sm md:top-0 md:bottom-auto md:border-t-0 md:border-b navbar"
  >
    <NuxtLink class="text-xs text-foreground-muted hidden md:block uppercase" to="/">
      Ivan Smiths
    </NuxtLink>
    <InternalLinks />
    <ScrollPercentage />
    <div class="flex w-24 justify-end">
      <button
        class="text-xs text-foreground-muted uppercase cursor-pointer font-mono"
        @click="toggleTheme"
      >
        [{{ colorMode === "light" ? "dark mode" : "light mode" }}]
      </button>
    </div>
  </nav>
</template>

<style scoped>
.font-mono {
  font-family: "DM Mono", monospace;
}
</style>
