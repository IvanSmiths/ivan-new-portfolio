<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import Observer from "gsap/dist/Observer";
import { useRouter } from "vue-router";
import { worksCards } from "~/domain/works";

gsap.registerPlugin(Observer);

const router = useRouter();
const wrapperRef = ref<HTMLElement | null>(null);

let ctx: gsap.Context | null = null;
let observer: any = null;
let cards: HTMLElement[] = [];
let images: HTMLImageElement[] = [];
let cardClients: HTMLElement[][] = [];
let overlayClone: HTMLDivElement | null = null;
let isExpanding = false;

function qsa<T extends Element>(selector: string): T[] {
  const root = wrapperRef.value;
  if (!root) return [];
  return Array.from(root.querySelectorAll(selector)) as T[];
}

function setClientsHidden() {
  const allClients = qsa<HTMLElement>(".work-item .client-item");
  gsap.set(allClients, { autoAlpha: 0, y: 8 });
}

function onHoverIn(idx: number) {
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

  cardClients.forEach((clients, i) => {
    if (i !== idx) {
      gsap.to(clients, {
        autoAlpha: 0,
        y: 8,
        duration: 0.15,
        overwrite: true,
      });
    }
  });

  const hoveredClients = cardClients[idx] ?? [];
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

  const allClients = qsa<HTMLElement>(".work-item .client-item");
  gsap.to(allClients, {
    autoAlpha: 0,
    y: 8,
    duration: 0.18,
    overwrite: true,
  });
}

async function onImageClick(event: MouseEvent, idx: number) {
  if (isExpanding) return;
  isExpanding = true;

  try {
    const work = worksCards[idx];
    if (!work) return;
    const target = event.currentTarget as HTMLElement | null;
    if (!target) return;

    const imgEl = target.querySelector<HTMLImageElement>(".work-img");
    if (!imgEl) return;

    const rect = imgEl.getBoundingClientRect();

    const otherCards = cards.filter((_, i) => i !== idx);
    gsap.to(otherCards, {
      opacity: 0,
      filter: "blur(12px)",
      scale: 0.97,
      duration: 0.5,
      ease: "power2.inOut",
    });

    overlayClone = document.createElement("div");
    overlayClone.style.cssText = `
      position: fixed;
      top: ${rect.top}px;
      left: ${rect.left}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      overflow: hidden;
      z-index: 20;
      pointer-events: none;
    `;

    const clonedImg = document.createElement("img");
    clonedImg.src = imgEl.currentSrc || imgEl.src;
    clonedImg.alt = imgEl.alt;
    clonedImg.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      display: block;
      user-select: none;
    `;

    overlayClone.appendChild(clonedImg);
    document.body.appendChild(overlayClone);

    await new Promise((resolve) => {
      const tl = gsap.timeline({ onComplete: resolve });

      tl.to(overlayClone!, {
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        duration: 1,
        ease: "expo.inOut",
      });

      tl.to(
        clonedImg,
        {
          objectPosition: "center top",
          duration: 1,
          ease: "expo.inOut",
        },
        "<",
      );
    });
    await router.push(`/works/${work.slug}`);
  } finally {
    gsap.set(cards, { opacity: 1, filter: "none", scale: 1 });

    overlayClone?.remove();
    overlayClone = null;
    isExpanding = false;
  }
}

function horizontalLoop(cards: gsap.DOMTarget[], config: any) {
  cards = gsap.utils.toArray(cards);
  config = config || {};
  let tl = gsap.timeline({
      repeat: config.repeat,
      paused: config.paused,
      defaults: { ease: "none" },
      onReverseComplete: () => {
        tl.totalTime(tl.rawTime() + tl.duration() * 1000);
      },
    }),
    length = cards.length,
    startX = (cards[0] as HTMLElement).offsetLeft,
    times: number[] = [],
    widths: number[] = [],
    xPercents: number[] = [],
    pixelsPerSecond = (config.speed || 1) * 100,
    snap = config.snap === false ? (v: number) => v : gsap.utils.snap(config.snap || 1),
    totalWidth: number,
    curX: number,
    distanceToStart: number,
    distanceToLoop: number,
    item: HTMLElement,
    i: number;

  gsap.set(cards, {
    xPercent: (i: number, el: Element) => {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number),
      );
      return xPercents[i];
    },
  });
  gsap.set(cards, { x: 0 });

  const last = cards[length - 1] as HTMLElement;

  totalWidth =
    last.offsetLeft +
    (xPercents[length - 1]! / 100) * widths[length - 1]! -
    startX +
    last.offsetWidth * (gsap.getProperty(last, "scaleX") as number) +
    (parseFloat(config.paddingRight) || 0);

  for (i = 0; i < length; i++) {
    item = cards[i] as HTMLElement;
    curX = (xPercents[i]! / 100) * widths[i]!;
    distanceToStart = item.offsetLeft + curX - startX;
    distanceToLoop = distanceToStart + widths[i]! * (gsap.getProperty(item, "scaleX") as number);

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]!) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        item,
        {
          xPercent: snap(((curX - distanceToLoop + totalWidth) / widths[i]!) * 100),
        },
        {
          xPercent: xPercents[i]!,
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

onMounted(async () => {
  await nextTick();

  ctx = gsap.context(() => {
    cards = qsa<HTMLElement>(".work-item");
    images = qsa<HTMLImageElement>(".work-item .work-img");

    cardClients = cards.map((card) =>
      Array.from(card.querySelectorAll<HTMLElement>(".client-item")),
    );

    setClientsHidden();

    const loop = horizontalLoop(cards, { repeat: -1, speed: 1 });
    loop.totalTime(loop.duration() * 1000);

    const slow = gsap.to(loop, { timeScale: 0, duration: 0.5 });
    loop.timeScale(0);

    observer = Observer.create({
      target: window,
      type: "touch,wheel",
      wheelSpeed: -1,
      onChange: (self: any) => {
        loop.timeScale(Math.abs(self.deltaX) > Math.abs(self.deltaY) ? -self.deltaX : -self.deltaY);
        slow.invalidate().restart();
      },
    });
  }, wrapperRef.value!);
});

onUnmounted(() => {
  observer?.kill();
  observer = null;

  ctx?.revert();
  ctx = null;

  overlayClone?.remove();
  overlayClone = null;
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
        <div class="flex flex-row justify-between items-end p-2.5 pb-1">
          <div class="flex flex-col">
            <div class="clients flex flex-col gap-1">
              <template v-for="client in work.clients.slice(0, 3)" :key="client">
                <span class="client-item text-xs opacity-0 text-foreground-muted">{{
                  client
                }}</span>
              </template>
            </div>

            <span class="text-sm text-foreground pt-1">
              {{ work.role }}
            </span>
          </div>

          <div>
            <span class="text-sm text-foreground">
              {{ work.title }}
            </span>
          </div>
        </div>

        <div
          class="h-90 w-full cursor-pointer overflow-hidden"
          @click="onImageClick($event, idx)"
          @mouseenter="onHoverIn(idx)"
          @mouseleave="onHoverOut"
        >
          <img
            :alt="work.title"
            :src="work.image"
            class="work-img h-full w-full object-cover object-top"
            draggable="false"
          />
        </div>
      </li>
    </ul>
  </div>
</template>
