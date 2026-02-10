import { onMounted, onUnmounted, ref } from 'vue'

export const useScrollPercentage = () => {
  const scrollPercent = ref<number>(0)

  const calculateScrollPercentage = (): number => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.scrollY
    const maxScroll = documentHeight - windowHeight

    if (maxScroll <= 5) return 0
    const rawPercentage = Math.round((scrollTop / maxScroll) * 100)
    return Math.max(0, Math.min(100, rawPercentage))
  }

  const updatePercentage = () => {
    scrollPercent.value = calculateScrollPercentage()
  }

  onMounted(() => {
    updatePercentage()
    window.addEventListener('scroll', updatePercentage, { passive: true })
    window.addEventListener('resize', updatePercentage, { passive: true })

    const timeout = setTimeout(updatePercentage, 300)

    onUnmounted(() => {
      window.removeEventListener('scroll', updatePercentage)
      window.removeEventListener('resize', updatePercentage)
      clearTimeout(timeout)
    })
  })

  return { scrollPercent }
}
