import { nextTick, onScopeDispose, type Ref } from "vue";

type ScrollTriggerInstance = {
  direction: number;
  end: number;
  kill: () => void;
  progress: number;
  scroll: (value: number) => void;
  start: number;
  wrapping?: boolean;
};

type UseHomeCardsLoopAnimationOptions = {
  cardsRef: Ref<HTMLElement | null>;
  galleryRef: Ref<HTMLElement | null>;
  stepSize?: number;
};

export function useHomeCardsLoopAnimation(options: UseHomeCardsLoopAnimationOptions) {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  const stepSize = options.stepSize ?? 0.1;

  let ctx: gsap.Context | null = null;
  let scrubToLoop: ((totalTime: number) => void) | null = null;
  let getCurrentTime: (() => number) | null = null;
  let initFrameId: number | null = null;

  function getCards() {
    return Array.from(options.cardsRef.value?.querySelectorAll<HTMLElement>("li") ?? []);
  }

  function cancelScheduledInit() {
    if (initFrameId === null || typeof window === "undefined") return;
    cancelAnimationFrame(initFrameId);
    initFrameId = null;
  }

  function cleanupLoopContext() {
    ctx?.revert();
    ctx = null;
    scrubToLoop = null;
    getCurrentTime = null;
  }

  function cleanup() {
    cancelScheduledInit();
    cleanupLoopContext();
  }

  function cleanupForRouteLeave() {
    cancelScheduledInit();
    ctx?.kill(false);
    ctx = null;
    scrubToLoop = null;
    getCurrentTime = null;
  }

  function buildSeamlessLoop(items: HTMLElement[], spacing: number) {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;
    const rawSequence = $gsap.timeline({ paused: true });
    const seamlessLoop = $gsap.timeline({
      paused: true,
      repeat: -1,
      onRepeat() {
        if (this._time === this._dur) {
          this._tTime += this._dur - 0.01;
        }
      },
    });

    const totalAnimations = items.length + overlap * 2;

    $gsap.set(items, { xPercent: 400, scale: 0 });

    for (let i = 0; i < totalAnimations; i += 1) {
      const index = i % items.length;
      const item = items[index];
      if (!item) continue;

      const time = i * spacing;

      rawSequence
        .fromTo(
          item,
          { scale: 0.5 },
          {
            scale: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "power1.in",
            immediateRender: false,
          },
          time,
        )
        .fromTo(
          item,
          { xPercent: 600 },
          {
            xPercent: -600,
            duration: 1,
            ease: "none",
            immediateRender: false,
          },
          time,
        );

      if (i <= items.length) {
        seamlessLoop.add(`label${i}`, time);
      }
    }

    rawSequence.time(startTime);
    seamlessLoop
      .to(rawSequence, {
        time: loopTime,
        duration: loopTime - startTime,
        ease: "none",
      })
      .fromTo(
        rawSequence,
        { time: overlap * spacing + 1 },
        {
          time: startTime,
          duration: startTime - (overlap * spacing + 1),
          immediateRender: false,
          ease: "none",
        },
      );

    return seamlessLoop;
  }

  function init() {
    if (!options.galleryRef.value || !options.cardsRef.value) return;

    cleanupLoopContext();

    ctx = $gsap.context(() => {
      const cards = getCards();

      if (!cards.length) return;

      let iteration = 0;
      const snap = $gsap.utils.snap(stepSize);
      const seamlessLoop = buildSeamlessLoop(cards, stepSize);
      const scrub = $gsap.to(seamlessLoop, {
        totalTime: 0,
        duration: 0.5,
        ease: "power3",
        paused: true,
      });

      const wrapForward = (activeTrigger: ScrollTriggerInstance) => {
        iteration += 1;
        activeTrigger.wrapping = true;
        activeTrigger.scroll(activeTrigger.start + 1);
      };

      const wrapBackward = (activeTrigger: ScrollTriggerInstance) => {
        iteration -= 1;

        if (iteration < 0) {
          iteration = 9;
          seamlessLoop.totalTime(seamlessLoop.totalTime() + seamlessLoop.duration() * 10);
          scrub.pause();
        }

        activeTrigger.wrapping = true;
        activeTrigger.scroll(activeTrigger.end - 1);
      };

      let trigger: ScrollTriggerInstance | null = null;

      const scrubTo = (totalTime: number) => {
        if (!trigger) return;

        const progress = (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();

        if (progress > 1) {
          wrapForward(trigger);
        } else if (progress < 0) {
          wrapBackward(trigger);
        } else {
          trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
        }
      };

      trigger = $ScrollTrigger.create({
        trigger: options.galleryRef.value,
        start: "top top",
        end: "+=3000",
        pin: true,
        invalidateOnRefresh: true,
        onUpdate(self: ScrollTriggerInstance) {
          if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
            wrapForward(self);
            return;
          }

          if (self.progress < 0.00001 && self.direction < 0 && !self.wrapping) {
            wrapBackward(self);
            return;
          }

          scrub.vars.totalTime = snap((iteration + self.progress) * seamlessLoop.duration());
          scrub.invalidate().restart();
          self.wrapping = false;
        },
      });

      scrubToLoop = scrubTo;
      getCurrentTime = () => Number(scrub.vars.totalTime ?? 0);
    }, options.galleryRef.value);

    $ScrollTrigger.refresh();
  }

  async function initAfterLayout() {
    await nextTick();
    if (!options.galleryRef.value || !options.cardsRef.value) return;

    await new Promise<void>((resolve) => {
      initFrameId = requestAnimationFrame(() => {
        initFrameId = null;
        resolve();
      });
    });

    if (!options.galleryRef.value || !options.cardsRef.value) return;
    init();
  }

  function stepBy(delta: number) {
    if (!scrubToLoop || !getCurrentTime) return;
    scrubToLoop(getCurrentTime() + delta);
  }

  onScopeDispose(() => {
    cleanup();
  });

  return {
    cleanupForRouteLeave,
    initAfterLayout,
    stepBy,
  };
}
