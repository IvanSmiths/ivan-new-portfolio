<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import Observer from "gsap/Observer";

gsap.registerPlugin(Observer);

const wrapperRef = ref(null);
const listRef = ref(null);
let ctx; // GSAP Context for cleanup

// --- The Horizontal Loop Helper Function ---
// (Kept largely intact, adapted slightly for scope safety)
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

  function toIndex(index, vars) {
    vars = vars || {};
    Math.abs(index - curIndex) > length / 2 &&
    (index += index > curIndex ? -length : length);
    let newIndex = gsap.utils.wrap(0, length, index),
      time = times[newIndex];
    if (time > tl.time() !== index > curIndex) {
      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
      time += tl.duration() * (index > curIndex ? 1 : -1);
    }
    curIndex = newIndex;
    vars.overwrite = true;
    return tl.tweenTo(time, vars);
  }

  tl.next = (vars) => toIndex(curIndex + 1, vars);
  tl.previous = (vars) => toIndex(curIndex - 1, vars);
  tl.current = () => curIndex;
  tl.toIndex = (index, vars) => toIndex(index, vars);
  tl.times = times;
  tl.progress(1, true).progress(0, true);

  if (config.reversed) {
    tl.vars.onReverseComplete();
    tl.reverse();
  }
  return tl;
}

onMounted(() => {
  // Use gsap.context to scope selectors and allow easy cleanup
  ctx = gsap.context((self) => {
    // Select the list items explicitly
    const boxes = gsap.utils.toArray(".card-item");

    // 1. Create the infinite loop
    const loop = horizontalLoop(boxes, { repeat: -1 });

    // 2. Create the deceleration tween
    let slow = gsap.to(loop, { timeScale: 0, duration: 0.5 });

    // 3. Stop initially
    loop.timeScale(0);

    // 4. Create the Observer
    Observer.create({
      target: wrapperRef.value, // Listen on the wrapper div
      type: "pointer,touch,wheel",
      wheelSpeed: -1,
      preventDefault: true, // <--- ADD THIS: Stops native page scrolling
      onChange: (self) => {
        // Whichever direction is bigger determines the loop direction
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
  ctx.revert(); // Clean up all GSAP animations and Observers
});
</script>

<template>
  <div
    ref="wrapperRef"
    class="relative w-full h-screen overflow-hidden bg-[#111] touch-none overscroll-none"
  >
    <ul
      ref="listRef"
      class="flex flex-nowrap flex-row pl-0 h-full items-center"
    >
      <li
        v-for="i in 10"
        :key="i"
        class="card-item list-none p-0 m-0 w-[14rem] shrink-0 h-[18rem] text-center leading-[18rem] text-[2rem] font-sans bg-[#9d7cce] rounded-[0.8rem] select-none cursor-grab active:cursor-grabbing"
      >
        {{ i - 1 }}
      </li>
    </ul>
  </div>
</template>
