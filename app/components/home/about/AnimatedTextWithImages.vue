<template>
  <h2
    class="lg:leading-4xl md:leading-2xl leading-lg flex flex-wrap justify-center gap-x-2 gap-y-4 text-center text-4xl font-black uppercase md:text-6xl lg:text-8xl"
  >
    <template
      v-for="(word, index) in words"
      :key="`item-${index}`"
    >
      <AnimatedImage
        v-if="word === ' '"
        :src="images[getImageIndex(index)]"
        @mounted="onImageMounted"
      />
      <AnimatedWord
        v-else
        :word="word"
        @mounted="(el) => onWordMounted(el, index)"
      />
    </template>
  </h2>
</template>

<script lang="ts" setup>
import AnimatedImage from '~/components/home/about/AnimatedImage.vue'
import AnimatedWord from '~/components/home/about/AnimatedWord.vue'
import { useAnimatedImages } from '~/composables/useAnimatedImages'
import { useScrollTextFill } from '~/composables/useScrollTextFill'

interface Props {
  words: string[]
  images: string[]
  triggerRef: Ref<HTMLElement | null> | null
}

const props = defineProps<Props>()

const wordRefs = ref<(HTMLSpanElement | null)[]>([])
const { onImageMounted } = useAnimatedImages()

// Track image index
const imageCounter = 0
const getImageIndex = (wordIndex: number) => {
  // Calculate how many images should have appeared before this index
  let count = 0
  for (let i = 0; i < wordIndex; i++) {
    if (props.words[i] === ' ') count++
  }
  return count
}

const onWordMounted = (el: HTMLSpanElement | null, index: number) => {
  wordRefs.value[index] = el
}

// Initialize scroll text fill animation
useScrollTextFill({
  refs: wordRefs,
  triggerRef: props.triggerRef,
})
</script>

<style scoped></style>
