import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useAnimatedImages() {
  const imageRefs = ref<HTMLImageElement[]>([])

  const onImageMounted = (img: HTMLImageElement | null) => {
    if (!img) return
    imageRefs.value.push(img)
  }

  onMounted(() => {
    if (import.meta.client) {
      gsap.registerPlugin(ScrollTrigger)

      imageRefs.value.forEach((img) => {
        if (!img) return

        gsap.set(img, { width: 0, opacity: 0 })

        gsap.to(img, {
          scrollTrigger: {
            trigger: img,
            start: 'top 50%',
            end: 'top top',
            scrub: true,
            invalidateOnRefresh: true,
          },
          width: 'auto',
          opacity: 1,
          ease: 'power2.out',
        })
      })

      ScrollTrigger.refresh()
    }
  })

  onUnmounted(() => {
    if (import.meta.client) {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  })

  return { onImageMounted }
}
