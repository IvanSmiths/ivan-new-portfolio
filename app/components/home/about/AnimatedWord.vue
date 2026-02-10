<template>
  <span
    ref="wordRef"
    class="mx-1.5 opacity-40"
  >
    {{ word }}
  </span>
</template>

<script lang="ts" setup>
interface Props {
  word: string
}

defineProps<Props>()

const emit = defineEmits<{
  mounted: [el: HTMLSpanElement | null]
}>()

const wordRef = ref<HTMLSpanElement | null>(null)

onMounted(() => {
  emit('mounted', wordRef.value)
})
</script>

<style scoped></style>
