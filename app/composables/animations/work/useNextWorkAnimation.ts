import { nextTick, onMounted, onUnmounted, ref } from "vue";

export function useNextWorkAnimation() {
  const nextWorkContainerRef = ref<HTMLElement | null>(null);
  const progressFillRef = ref<HTMLElement | null>(null);

  const { $gsap, $ScrollTrigger } = useNuxtApp();

  onMounted(async () => {
    await nextTick();

    $ScrollTrigger.refresh();

    if (!nextWorkContainerRef.value || !progressFillRef.value) return;

    $gsap.set(progressFillRef.value, { scaleX: 0, transformOrigin: "left center" });

    $ScrollTrigger.create({
      trigger: nextWorkContainerRef.value,
      start: "top top",
      end: "+=100%",
      pin: true,
      markers: true,
      scrub: true,
      onUpdate(self: { progress: number }) {
        $gsap.set(progressFillRef.value, { scaleX: self.progress });
      },
    });

    $ScrollTrigger.refresh();
  });

  onUnmounted(() => {
    $ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());
  });

  return {
    nextWorkContainerRef,
    progressFillRef,
  };
}
