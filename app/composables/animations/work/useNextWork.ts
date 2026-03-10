import { nextTick, onMounted, onUnmounted, ref } from "vue";

type UseNextWorkAnimationOptions = {
  onDone?: () => void;
};

export function useNextWork(options: UseNextWorkAnimationOptions = {}) {
  const nextWorkContainerRef = ref<HTMLElement | null>(null);
  const progressFillRef = ref<HTMLElement | null>(null);
  const imageRef = ref<HTMLElement | null>(null);
  const imageContainerRef = ref<HTMLElement | null>(null);

  const { $gsap, $ScrollTrigger, $Flip } = useNuxtApp();
  let commitTl: ReturnType<typeof $gsap.timeline> | null = null;
  let st: any;
  let committed = false;
  let cover: HTMLDivElement | null = null;
  let finalStageTarget: HTMLDivElement | null = null;

  const IMAGE_START_SCALE = 1.8;
  const IMAGE_END_SCALE = 1.5;
  const CONTAINER_START_SCALE = 1;
  const CONTAINER_END_SCALE = 1.08;
  const COMMIT_THRESHOLD = 0.99;
  const STAGE_DURATION = 0.8;
  const CENTER_STAGE_WIDTH_RATIO = 0.5;
  const CENTER_STAGE_HEIGHT_RATIO = 0.5;
  const LOWER_STAGE_TOP_RATIO = 0.7;
  const LOWER_STAGE_SIDE_PADDING_PX = 20;
  const COVER_FADE_DURATION = 0.45;
  const COVER_FADE_EASE = "power2.inOut";

  const removeCover = () => {
    cover?.remove();
    cover = null;
  };

  const removeFinalStageTarget = () => {
    finalStageTarget?.remove();
    finalStageTarget = null;
  };

  const ensureCover = () => {
    if (cover) return cover;

    cover = document.createElement("div");
    cover.style.cssText = `
      position: fixed;
      inset: 0;
      background: var(--background);
      z-index: 9;
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(cover);

    return cover;
  };

  const buildCommitTimeline = () => {
    const imageContainer = imageContainerRef.value;
    const image = imageRef.value;
    if (!imageContainer || !image) return null;
    const coverEl = ensureCover();
    $gsap.set(coverEl, { opacity: 0 });

    const centerWidth = window.innerWidth * CENTER_STAGE_WIDTH_RATIO;
    const centerHeight = window.innerHeight * CENTER_STAGE_HEIGHT_RATIO;
    const centerLeft = (window.innerWidth - centerWidth) / 2;
    const centerTop = (window.innerHeight - centerHeight) / 2;
    const finalTop = window.innerHeight * LOWER_STAGE_TOP_RATIO;
    const finalLeft = LOWER_STAGE_SIDE_PADDING_PX;
    const finalWidth = Math.max(window.innerWidth - LOWER_STAGE_SIDE_PADDING_PX * 2, 0);
    const finalHeight = window.innerHeight;

    const startRect = imageContainer.getBoundingClientRect();
    $gsap.set(imageContainer, {
      position: "fixed",
      top: startRect.top,
      left: startRect.left,
      width: startRect.width,
      height: startRect.height,
      right: "auto",
      bottom: "auto",
      margin: 0,
      x: 0,
      y: 0,
      xPercent: 0,
      yPercent: 0,
      scale: 1,
      transformOrigin: "center center",
    });

    removeFinalStageTarget();
    finalStageTarget = document.createElement("div");
    finalStageTarget.style.cssText = `
      position: fixed;
      top: ${finalTop}px;
      left: ${finalLeft}px;
      width: ${finalWidth}px;
      height: ${finalHeight}px;
      opacity: 0;
      pointer-events: none;
      z-index: -1;
    `;
    document.body.appendChild(finalStageTarget);

    const timeline = $gsap.timeline({
      paused: true,
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        removeFinalStageTarget();
        options.onDone?.();
      },
      onInterrupt: () => removeFinalStageTarget(),
    });

    timeline.to(
      imageContainer,
      {
        top: centerTop,
        left: centerLeft,
        width: centerWidth,
        height: centerHeight,
        duration: STAGE_DURATION,
      },
      0,
    );

    timeline.to(
      image,
      {
        scale: 1,
        duration: STAGE_DURATION,
        immediateRender: false,
      },
      0,
    );

    timeline.to(coverEl, { opacity: 1, duration: COVER_FADE_DURATION, ease: COVER_FADE_EASE }, 0);

    timeline.call(() => {
      const fitTween = $Flip.fit(imageContainer, finalStageTarget, {
        absolute: true,
        duration: STAGE_DURATION,
        ease: "power3.inOut",
        simple: true,
      });

      const lockFinalState = () => {
        $gsap.set(imageContainer, {
          position: "fixed",
          top: finalTop,
          left: finalLeft,
          width: finalWidth,
          height: finalHeight,
          right: "auto",
          bottom: "auto",
          margin: 0,
          x: 0,
          y: 0,
          xPercent: 0,
          yPercent: 0,
          scale: 1,
        });
      };

      if (fitTween && "eventCallback" in fitTween) {
        (fitTween as gsap.core.Tween).eventCallback("onComplete", lockFinalState);
        return;
      }

      $gsap.to(imageContainer, {
        top: finalTop,
        left: finalLeft,
        width: finalWidth,
        height: finalHeight,
        duration: STAGE_DURATION,
        ease: "power3.inOut",
        onComplete: lockFinalState,
      });
    }, [], STAGE_DURATION);

    timeline.to({}, { duration: STAGE_DURATION }, STAGE_DURATION);

    return timeline;
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

    $gsap.set(imageRef.value, { scale: IMAGE_START_SCALE, transformOrigin: "center center" });
    $gsap.set(imageContainerRef.value, {
      scale: CONTAINER_START_SCALE,
      transformOrigin: "center center",
    });

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

        const imageScale = $gsap.utils.interpolate(IMAGE_START_SCALE, IMAGE_END_SCALE, self.progress);
        const containerScale = $gsap.utils.interpolate(
          CONTAINER_START_SCALE,
          CONTAINER_END_SCALE,
          self.progress,
        );

        $gsap.set(imageRef.value!, { scale: imageScale });
        $gsap.set(imageContainerRef.value!, { scale: containerScale });

        if (self.progress >= COMMIT_THRESHOLD) {
          committed = true;

          $gsap.set(progressFillRef.value!, { scaleX: 1 });
          $gsap.set(imageRef.value!, { scale: IMAGE_END_SCALE });
          $gsap.set(imageContainerRef.value!, { scale: CONTAINER_END_SCALE });

          self.scroll(self.end);
          self.disable();

          commitTl = buildCommitTimeline();
          commitTl?.play(0);
        }
      },
    });

    $ScrollTrigger.refresh();
  });

  onUnmounted(() => {
    commitTl?.kill();
    commitTl = null;
    if (st) st.kill();
    $ScrollTrigger.getAll().forEach((t: { kill: () => void }) => t.kill());
    removeCover();
    removeFinalStageTarget();
  });

  return { nextWorkContainerRef, progressFillRef, imageContainerRef, imageRef };
}
