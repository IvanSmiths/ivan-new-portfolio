import { nextTick, onMounted, onUnmounted, ref } from "vue";

type UseNextWorkAnimationOptions = {
  onDone?: () => void;
};

export function useNextWorkAnimation(options: UseNextWorkAnimationOptions = {}) {
  const nextWorkContainerRef = ref<HTMLElement | null>(null);
  const progressFillRef = ref<HTMLElement | null>(null);
  const imageRef = ref<HTMLElement | null>(null);
  const imageContainerRef = ref<HTMLElement | null>(null);

  const { $gsap, $ScrollTrigger } = useNuxtApp();
  let tl: ReturnType<typeof $gsap.timeline>;
  let st: any;
  let committed = false;

  onMounted(async () => {
    await nextTick();
    $ScrollTrigger.refresh();

    if (!nextWorkContainerRef.value || !progressFillRef.value || !imageContainerRef.value) return;

    $gsap.set(progressFillRef.value, { scaleX: 0, transformOrigin: "left center" });

    tl = $gsap.timeline({
      paused: true,
      onComplete: () => {
        options.onDone?.();
      },
    });

    tl.to(imageContainerRef.value, {
      width: "100%",
      height: "100vh",
      position: "fixed",
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

    st = $ScrollTrigger.create({
      trigger: nextWorkContainerRef.value,
      start: "top top",
      end: "+=100%",
      pin: true,
      markers: true,
      scrub: true,

      onUpdate(self: any) {
        if (committed) return;

        $gsap.set(progressFillRef.value!, { scaleX: self.progress });

        if (self.progress >= 0.99) {
          committed = true;

          $gsap.set(progressFillRef.value!, { scaleX: 1 });

          self.scroll(self.end);

          self.disable();

          tl.play(0);
        } else if (tl.progress() > 0) {
          tl.reverse();
        }
      },
    });

    $ScrollTrigger.refresh();
  });

  onUnmounted(() => {
    if (tl) tl.kill();
    if (st) st.kill();
    $ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());
  });

  return {
    nextWorkContainerRef,
    progressFillRef,
    imageContainerRef,
    imageRef,
  };
}
