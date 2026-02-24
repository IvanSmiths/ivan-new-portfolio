import { nextTick, onMounted, onUnmounted, ref } from "vue";

export function useNextWorkAnimation() {
  const nextWorkContainerRef = ref<HTMLElement | null>(null);
  const progressFillRef = ref<HTMLElement | null>(null);
  const imageRef = ref<HTMLElement | null>(null);
  const imageContainerRef = ref<HTMLElement | null>(null);

  const { $gsap, $ScrollTrigger } = useNuxtApp();
  let tl: ReturnType<typeof $gsap.timeline>;

  onMounted(async () => {
    await nextTick();

    $ScrollTrigger.refresh();

    if (!nextWorkContainerRef.value || !progressFillRef.value || !imageContainerRef.value) return;

    $gsap.set(progressFillRef.value, { scaleX: 0, transformOrigin: "left center" });

    tl = $gsap.timeline({ paused: true });

    tl.to(imageContainerRef.value, {
      width: "100%",
      height: "100vh",
      top: 0,
      duration: 0.8,
      ease: "power3.inOut",
    });
    tl.to(
      imageRef.value,
      {
        scale: 1,
        duration: 0.8,
        ease: "power3.inOut",
      },
      0,
    );

    $ScrollTrigger.create({
      trigger: nextWorkContainerRef.value,
      start: "top top",
      end: "+=100%",
      pin: true,
      markers: true,
      scrub: true,
      onUpdate(self: { progress: number }) {
        $gsap.set(progressFillRef.value, { scaleX: self.progress });

        if (self.progress >= 0.99) {
          tl.play();
        } else if (self.progress < 0.99 && tl.progress() > 0) {
          tl.reverse();
        }
      },
    });

    $ScrollTrigger.refresh();
  });

  onUnmounted(() => {
    if (tl) tl.kill();
    $ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());
  });

  return {
    nextWorkContainerRef,
    progressFillRef,
    imageContainerRef,
    imageRef,
  };
}
