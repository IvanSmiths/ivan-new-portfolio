<!-- components/InfiniteCardGallery.vue -->
<template>
  <div class="min-h-screen bg-neutral-900 m-0 p-0">
    <div class="relative w-full h-screen overflow-hidden">
      <ul ref="cardsRef" class="flex flex-nowrap flex-row pl-0">
        <li
          v-for="n in items"
          :key="n"
          class="list-none m-0 p-0 w-56 h-72 flex-none rounded-xl bg-violet-400/80 flex items-center justify-center text-3xl font-sans"
        >
          {{ n - 1 }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from "vue";
import gsap from "gsap";
import Observer from "gsap/Observer";

gsap.registerPlugin(Observer);

const items = 10;
const cardsRef = ref<HTMLElement | null>(null);

let loopTl: gsap.core.Timeline | null = null;
let slowTween: gsap.core.Tween | null = null;
let observer: Observer | null = null;

onMounted(() => {
  if (!cardsRef.value) return;

  const lis = Array.from(cardsRef.value.querySelectorAll("li"));

  // Create infinite loop timeline
  loopTl = horizontalLoop(lis, { repeat: -1 });
  // Decelerate timeScale back to 0
  slowTween = gsap.to(loopTl, { timeScale: 0, duration: 0.5 });
  // Start stopped
  loopTl.timeScale(0);

  observer = Observer.create({
    target: cardsRef.value,
    type: "pointer,touch,wheel",
    wheelSpeed: -1,
    onChange: (self) => {
      if (!loopTl || !slowTween) return;
      const delta =
        Math.abs(self.deltaX) > Math.abs(self.deltaY)
          ? -self.deltaX
          : -self.deltaY;

      loopTl.timeScale(delta);
      slowTween.invalidate().restart();
    }
  });
});

onBeforeUnmount(() => {
  observer?.kill();
  slowTween?.kill();
  loopTl?.kill();
});

/**
 * Seamless horizontal loop (GSAP helper)
 */
function horizontalLoop(items: Element[] | string, config: any) {
  const els = gsap.utils.toArray(items) as HTMLElement[];
  config = config || {};

  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
  });

  const length = els.length;
  const startX = els[0].offsetLeft;
  const times: number[] = [];
  const widths: number[] = [];
  const xPercents: number[] = [];

  let curIndex = 0;
  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap =
    config.snap === false
      ? (v: number) => v
      : gsap.utils.snap(config.snap || 1);

  gsap.set(els, {
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(
        gsap.getProperty(el, "width", "px") as string
      ));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
        (gsap.getProperty(el, "xPercent") as number)
      );
      return xPercents[i];
    }
  });

  gsap.set(els, { x: 0 });

  const last = els[length - 1];
  const totalWidth =
    last.offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    last.offsetWidth * (gsap.getProperty(last, "scaleX") as number) +
    (parseFloat(config.paddingRight) || 0);

  for (let i = 0; i < length; i++) {
    const item = els[i];
    const curX = (xPercents[i] / 100) * widths[i];
    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart +
      widths[i] * (gsap.getProperty(item, "scaleX") as number);

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          )
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  function toIndex(index: number, vars: any = {}) {
    if (Math.abs(index - curIndex) > length / 2) {
      index += index > curIndex ? -length : length;
    }
    const newIndex = gsap.utils.wrap(0, length, index);
    let time = times[newIndex];

    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }

    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  (tl as any).next = (vars: any) => toIndex(curIndex + 1, vars);
  (tl as any).previous = (vars: any) => toIndex(curIndex - 1, vars);
  (tl as any).current = () => curIndex;
  (tl as any).toIndex = (index: number, vars: any) => toIndex(index, vars);
  (tl as any).times = times;

  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    (tl.vars as any).onReverseComplete?.();
    tl.reverse();
  }

  return tl;
}
</script>
