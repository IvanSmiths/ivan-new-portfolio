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
  let cover: HTMLDivElement | null = null;

  const removeCover = () => {
    cover?.remove();
    cover = null;
  };

  const ensureCover = () => {
    if (cover) return cover;

    cover = document.createElement("div");
    cover.style.cssText = `
      position: fixed;
      inset: 0;
      background: black;
      z-index: 9;
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(cover);

    return cover;
  };

  onMounted(async () => {
    await nextTick();
    $ScrollTrigger.refresh();

    if (
      !nextWorkContainerRef.value ||
      !progressFillRef.value ||
      !imageContainerRef.value ||
      !imageRef.value
    )
      return;

    $gsap.set([imageContainerRef.value, imageRef.value], { willChange: "transform" });
    $gsap.set(progressFillRef.value, { scaleX: 0, transformOrigin: "left center" });

    const imageStartScale = 1.8;
    const imageEndScale = 1.5;

    const containerStartScale = 1;
    const containerEndScale = 1.08;

    $gsap.set(imageRef.value, { scale: imageStartScale, transformOrigin: "center center" });
    $gsap.set(imageContainerRef.value, {
      scale: containerStartScale,
      transformOrigin: "center center",
    });

    tl = $gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" },
      onComplete: () => options.onDone?.(),
    });

    tl.to(
      imageContainerRef.value,
      {
        width: "100%",
        height: "100vh",
        position: "fixed",
        top: 0,
        scale: 1,
        duration: 0.8,
      },
      0,
    );
    tl.add(() => {
      const coverEl = ensureCover();
      $gsap.to(coverEl, { opacity: 1, duration: 0.45, ease: "power2.inOut" });
    }, 0.8);
    tl.to(
      imageContainerRef.value,
      {
        translateY: `70%`,
        paddingLeft: 20,
        paddingRight: 20,
        top: 0,
        scale: 1,
        duration: 0.8,
      },
      0.8,
    );

    tl.to(
      imageRef.value,
      {
        scale: 1,
        duration: 0.8,
        immediateRender: false,
      },
      0,
    );

    st = $ScrollTrigger.create({
      trigger: nextWorkContainerRef.value,
      start: "top top",
      end: "+=100%",
      pin: true,
      scrub: true,
      markers: true,
      anticipatePin: 1,

      onUpdate(self: any) {
        if (committed) return;

        $gsap.set(progressFillRef.value!, { scaleX: self.progress });

        const imageScale = $gsap.utils.interpolate(imageStartScale, imageEndScale, self.progress);
        const containerScale = $gsap.utils.interpolate(
          containerStartScale,
          containerEndScale,
          self.progress,
        );

        $gsap.set(imageRef.value!, { scale: imageScale });
        $gsap.set(imageContainerRef.value!, { scale: containerScale });

        if (self.progress >= 0.99) {
          committed = true;

          $gsap.set(progressFillRef.value!, { scaleX: 1 });
          $gsap.set(imageRef.value!, { scale: imageEndScale });
          $gsap.set(imageContainerRef.value!, { scale: containerEndScale });

          self.scroll(self.end);
          self.disable();

          tl.play(0);
        }
      },
    });

    $ScrollTrigger.refresh();
  });

  onUnmounted(() => {
    if (tl) tl.kill();
    if (st) st.kill();
    $ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());
    removeCover();
  });

  return { nextWorkContainerRef, progressFillRef, imageContainerRef, imageRef };
}
