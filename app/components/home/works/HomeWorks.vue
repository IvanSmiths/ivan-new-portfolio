<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import { works } from "~~/utils/data/works/works.ts";

gsap.registerPlugin(Observer);

const wrapperRef = ref(null);
let ctx;

function horizontalLoop(items, config) {
  items = gsap.utils.toArray(items);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
    }),
    length = items.length,
    startX = items[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    curIndex = 0,
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;

  gsap.set(items, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
        gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    }
  });
  gsap.set(items, { x: 0 });

  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
    gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
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

  return tl;
}

onMounted(() => {
  ctx = gsap.context(() => {
    const items = gsap.utils.toArray(".work-item");

    const loop = horizontalLoop(items, {
      repeat: -1,
      speed: 1,
      paddingRight: 20 // gap at the end of the loop
    });

    let slow = gsap.to(loop, { timeScale: 0, duration: 0.5 });
    loop.timeScale(0);

    Observer.create({
      target: wrapperRef.value,
      type: "pointer,touch,wheel",
      wheelSpeed: -1,
      preventDefault: true,
      onChange: (self) => {
        loop.timeScale(
          Math.abs(self.deltaX) > Math.abs(self.deltaY)
            ? -self.deltaX
            : -self.deltaY
        );
        slow.invalidate().restart();
      }
    });
  }, wrapperRef.value);
});

onUnmounted(() => {
  if (ctx) ctx.revert();
});
</script>

<template>
  <div
    ref="wrapperRef"
    class="relative w-full h-screen overflow-hidden bg-white touch-none overscroll-none flex items-center"
  >
    <ul class="flex flex-nowrap gap-3 flex-row pl-0 m-0 list-none">
      <li
        v-for="(item, idx) in works"
        :key="idx"
        class="work-item w-96 shrink-0 list-none select-none cursor-grab active:cursor-grabbing"
      >
        <div class="flex flex-row justify-between items-center">
          <div
            class="text-xs font-semibold uppercase tracking-wider text-black"
          >
            {{ item.role }}
          </div>
          <div
            class="text-center text-xs font-bold tracking-wide text-neutral-800"
          >
            {{ item.title }}
          </div>
        </div>

        <div class="h-90 w-full overflow-hidden bg-neutral-200">
          <img
            :alt="item.title"
            :src="item.image"
            class="h-full w-full object-cover pointer-events-none"
            draggable="false"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
