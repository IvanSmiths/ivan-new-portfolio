<script lang="ts" setup>
import MoonIcon from "~/components/global/icons/MoonIcon.vue";
import SunIcon from "~/components/global/icons/SunIcon.vue";

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

const themeComponent = computed(() => {
  return colorMode.value === "light" ? MoonIcon : SunIcon;
});

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
  <button
    class="right-md top-md fixed cursor-pointer transition-opacity hover:opacity-80"
    @click="toggleTheme"
  >
    <component :is="themeComponent" />
  </button>
</template>

<style scoped></style>
