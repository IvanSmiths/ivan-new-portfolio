<script lang="ts" setup>
const appConfig = useAppConfig();
const email = appConfig.contacts?.[0]?.email;
</script>

<template>
  <h1 class="pt-20">Email: {{ email }}</h1>
</template>

<style scoped></style>
