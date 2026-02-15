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
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 1000),
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
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent"),
      );
      return xPercents[i];
    },
  });
  gsap.set(items, { x: 0 });

  totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth * gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = items[i];
    curX = (xPercents[i] / 100) * widths[i];
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        {
          xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]) * 100),
        },
        {
          xPercent: xPercents[i],
          duration: (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
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
    });

    loop.totalTime(loop.duration() * 1000);

    let slow = gsap.to(loop, { timeScale: 0, duration: 0.5 });
    loop.timeScale(0);

    Observer.create({
      target: window,
      type: "touch,wheel",
      wheelSpeed: -1,
      onChange: (self) => {
        loop.timeScale(Math.abs(self.deltaX) > Math.abs(self.deltaY) ? -self.deltaX : -self.deltaY);
        slow.invalidate().restart();
      },
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
    class="w-full absolute bottom-2.5 h-screen overflow-hidden flex items-end pointer-events-none"
  >
    <ul class="flex flex-nowrap flex-row list-none pointer-events-auto">
      <li
        v-for="(work, idx) in works"
        :key="idx"
        class="work-item w-96 shrink-0 pl-2.5 list-none select-none cursor-pointer"
      >
        <div class="flex flex-row justify-between items-center p-2.5">
          <div class="text-sm font-bold uppercase text-foreground">
            {{ work.role }}
          </div>
          <div class="text-sm font-bold uppercase text-foreground">
            {{ work.title }}
          </div>
        </div>

        <div class="h-90 w-full overflow-hidden bg-neutral-200">
          <NuxtLink :to="`/works/${work.url}`">
            <img
              :alt="work.title"
              :src="work.image"
              class="h-full w-full object-cover pointer-events-none"
              draggable="false"
            />
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>
