<script lang="ts" setup>
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
  <button
    class="md:text-xs text-sm hover:opacity-80 transition-opacity text-foreground-muted cursor-pointer"
    @click="toggleTheme"
  >
    [{{ colorMode === "light" ? "Dark mode" : "Light mode" }}]
  </button>
</template>

<style scoped></style>
