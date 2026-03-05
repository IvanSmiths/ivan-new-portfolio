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
  onScrollActivityChange?: (isScrolling: boolean) => void;
  onSnappedIndexChange?: (index: number) => void;
  stepSize?: number;
};

export function useHomeCardsLoopAnimation(options: UseHomeCardsLoopAnimationOptions) {
  const { $gsap, $ScrollTrigger } = useNuxtApp();

  /* ===============================
     Animation tuning variables
  =============================== */

  const STEP_SIZE = options.stepSize ?? 0.1;
  const SCROLL_DISTANCE = 3000;
  const SCRUB_DURATION = 0.5;
  const SCRUB_EASE = "power3";
  const SNAP_DELAY = 0.3;
  const SCALE_DURATION = 0.5;
  const SCALE_EASE = "power1.in";
  const MOVE_DURATION = 1;
  const INITIAL_X_PERCENT = 400;
  const FROM_X_PERCENT = 600;
  const TO_X_PERCENT = -600;
  const INITIAL_SCALE = 0.5;
  const SCALE_FROM = 0.5;
  const SCALE_TO = 1;

  /* =============================== */

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

  function getSnappedIndex(totalTime: number, itemsCount: number) {
    const rawIndex = Math.round(totalTime / STEP_SIZE);
    return ((rawIndex % itemsCount) + itemsCount) % itemsCount;
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

    $gsap.set(items, { xPercent: INITIAL_X_PERCENT, scale: INITIAL_SCALE });

    for (let i = 0; i < totalAnimations; i += 1) {
      const index = i % items.length;
      const item = items[index];
      if (!item) continue;

      const time = i * spacing;

      rawSequence
        .fromTo(
          item,
          { scale: SCALE_FROM },
          {
            scale: SCALE_TO,
            zIndex: 100,
            duration: SCALE_DURATION,
            yoyo: true,
            repeat: 1,
            ease: SCALE_EASE,
            immediateRender: false,
          },
          time,
        )
        .fromTo(
          item,
          { xPercent: FROM_X_PERCENT },
          {
            xPercent: TO_X_PERCENT,
            duration: MOVE_DURATION,
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
      const syncSnappedIndex = (totalTime: number) => {
        options.onSnappedIndexChange?.(getSnappedIndex(totalTime, cards.length));
      };

      let iteration = 0;
      let isProgrammaticSettle = false;

      const snap = $gsap.utils.snap(STEP_SIZE);
      const seamlessLoop = buildSeamlessLoop(cards, STEP_SIZE);

      const scrub = $gsap.to(seamlessLoop, {
        totalTime: 0,
        duration: SCRUB_DURATION,
        ease: SCRUB_EASE,
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

        const progress =
          (totalTime - seamlessLoop.duration() * iteration) / seamlessLoop.duration();

        if (progress > 1) wrapForward(trigger);
        else if (progress < 0) wrapBackward(trigger);
        else {
          isProgrammaticSettle = true;
          trigger.wrapping = true;
          trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));

          requestAnimationFrame(() => {
            isProgrammaticSettle = false;
          });
        }
      };

      const snapCall = $gsap
        .delayedCall(SNAP_DELAY, () => {
          if (!trigger) return;

          const rawTotalTime = (iteration + trigger.progress) * seamlessLoop.duration();

          const snappedTotalTime = snap(rawTotalTime);

          scrub.vars.totalTime = snappedTotalTime;
          scrub.invalidate().restart();

          syncSnappedIndex(snappedTotalTime);
          options.onScrollActivityChange?.(false);
          scrubTo(snappedTotalTime);
        })
        .pause();

      trigger = $ScrollTrigger.create({
        trigger: options.galleryRef.value,
        start: "top top",
        end: `+=${SCROLL_DISTANCE}`,
        pin: true,
        invalidateOnRefresh: true,
        onUpdate(self: ScrollTriggerInstance) {
          if (isProgrammaticSettle) {
            scrub.vars.totalTime = (iteration + self.progress) * seamlessLoop.duration();
            scrub.invalidate().restart();
            self.wrapping = false;
            return;
          }

          if (self.progress === 1 && self.direction > 0 && !self.wrapping) {
            wrapForward(self);
            return;
          }

          if (self.progress < 0.00001 && self.direction < 0 && !self.wrapping) {
            wrapBackward(self);
            return;
          }

          scrub.vars.totalTime = (iteration + self.progress) * seamlessLoop.duration();
          scrub.invalidate().restart();

          self.wrapping = false;

          options.onScrollActivityChange?.(true);
          snapCall.restart(true);
        },
      });

      scrubToLoop = scrubTo;
      getCurrentTime = () => Number(scrub.vars.totalTime ?? 0);
      options.onScrollActivityChange?.(false);
      syncSnappedIndex(0);
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

  onScopeDispose(() => cleanup());

  return {
    cleanupForRouteLeave,
    initAfterLayout,
    stepBy,
  };
}
