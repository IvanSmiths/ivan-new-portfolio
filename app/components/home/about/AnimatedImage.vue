<template>
  <figure class="hidden h-16 overflow-hidden md:inline lg:h-24">
    <img
      ref="imageRef"
      :alt="alt"
      :src="src"
      class="inline h-16 origin-left scale-150 object-cover pb-4 lg:h-24"
    >
  </figure>
</template>

<script lang="ts" setup>
interface Props {
  src: string
  alt?: string
}

withDefaults(defineProps<Props>(), {
  alt: '',
})

const emit = defineEmits<{
  mounted: [el: HTMLImageElement | null]
}>()

const imageRef = ref<HTMLImageElement | null>(null)

onMounted(() => {
  emit('mounted', imageRef.value)
})
</script>

<style scoped></style>
