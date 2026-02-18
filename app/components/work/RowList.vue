<template>
  <li class="pt-xs mx-sm list-disc">{{ desc }}</li>
</template>

<script lang="ts" setup>
defineProps<{
  desc: string;
}>();
</script>
