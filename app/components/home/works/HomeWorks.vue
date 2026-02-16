<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import { worksCards } from "~/domain/works/index.ts";

gsap.registerPlugin(Observer);

const wrapperRef = ref(null);
let ctx;

let cards = [];
let images = [];

function setClientsHidden() {
  const allClients = gsap.utils.toArray(".work-item .client-item");
  gsap.set(allClients, { autoAlpha: 0, y: 8 });
}

function onHoverIn(idx) {
  const hoveredCard = cards[idx];
  if (!hoveredCard) return;
  images.forEach((img, i) => {
    gsap.to(img, {
      filter: i === idx ? "blur(0px) saturate(1)" : "blur(6px) saturate(0)",
      duration: 0.25,
      scale: i === idx ? 1.03 : 1,
      overwrite: true,
    });
  });

  cards.forEach((item, i) => {
    const clientSpans = item.querySelectorAll(".client-item");
    if (i !== idx) {
      gsap.to(clientSpans, {
        autoAlpha: 0,
        y: 8,
        duration: 0.15,
        overwrite: true,
      });
    }
  });

  const hoveredClients = hoveredCard.querySelectorAll(".client-item");
  gsap.to(hoveredClients, {
    autoAlpha: 1,
    y: 0,
    duration: 0.28,
    stagger: 0.06,
    ease: "power2.out",
    overwrite: true,
  });
}

function onHoverOut() {
  images.forEach((img) => {
    gsap.to(img, {
      filter: "blur(0px) saturate(1)",
      duration: 0.25,
      scale: 1,
      overwrite: true,
    });
  });

  const allClients = gsap.utils.toArray(".work-item .client-item");
  gsap.to(allClients, {
    autoAlpha: 0,
    y: 8,
    duration: 0.18,
    overwrite: true,
  });
}

function horizontalLoop(cards, config) {
  cards = gsap.utils.toArray(cards);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 1000),
    }),
    length = cards.length,
    startX = cards[0].offsetLeft,
    times = [],
    widths = [],
    xPercents = [],
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1),
    totalWidth,
    curX,
    distanceToStart,
    distanceToLoop,
    item,
    i;

  gsap.set(cards, {
    xPercent: (i, el) => {
      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 + gsap.getProperty(el, "xPercent"),
      );
      return xPercents[i];
    },
  });
  gsap.set(cards, { x: 0 });

  totalWidth =
    cards[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    cards[length - 1].offsetWidth * gsap.getProperty(cards[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = cards[i];
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
    cards = gsap.utils.toArray(".work-item");
    images = gsap.utils.toArray(".work-item .work-img");

    setClientsHidden();

    const loop = horizontalLoop(cards, { repeat: -1, speed: 1 });
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
  <div ref="wrapperRef" class="w-full pb-2.5 h-full flex items-end pointer-events-none">
    <ul class="flex flex-nowrap flex-row justify-end items-end list-none pointer-events-auto">
      <li
        v-for="(work, idx) in worksCards"
        :key="idx"
        class="work-item w-96 shrink-0 pl-2.5 list-none"
      >
        <div class="flex flex-row justify-between items-end p-2.5">
          <div class="flex flex-col">
            <div class="clients flex flex-col gap-1">
              <template v-for="client in work.clients.slice(0, 3)" :key="client">
                <span class="client-item text-xs opacity-0 text-foreground-muted">{{
                  client
                }}</span>
              </template>
            </div>

            <span class="text-sm font-bold uppercase text-foreground pt-1">
              {{ work.role }}
            </span>
          </div>

          <div>
            <span class="text-sm font-bold uppercase text-foreground">
              {{ work.title }}
            </span>
          </div>
        </div>

        <div
          class="h-90 w-full overflow-hidden"
          @mouseenter="onHoverIn(idx)"
          @mouseleave="onHoverOut"
        >
          <NuxtLink :to="`/works/${work.slug}`">
            <img
              :alt="work.title"
              :src="work.image"
              class="work-img h-full w-full cursor-pointer object-cover pointer-events-none"
              draggable="false"
            />
          </NuxtLink>
        </div>
      </li>
    </ul>
  </div>
</template>
