<script lang="ts" setup>
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import gsap from "gsap";
import { worksCards } from "~/domain/works";

const emit = defineEmits<{ done: [] }>();

const loaderRef = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);
const isVisible = ref(true);

const STORAGE_KEY = "works_loader_seen";

function hasSeenLoader(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markLoaderSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* empty */
  }
}

function getCardImageRects(): DOMRect[] {
  const imgs = Array.from(document.querySelectorAll<HTMLImageElement>(".work-item .work-img"));
  return imgs.map((el) => el.getBoundingClientRect());
}

let ctx: gsap.Context | null = null;

async function runAnimation() {
  await nextTick();

  const loader = loaderRef.value;
  if (!loader) return;

  const items = itemRefs.value;
  if (!items.length) return;

  ctx = gsap.context(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const THUMB_W = 48;
    const THUMB_H = 64;
    const THUMB_GAP = 10;
    const totalH = items.length * THUMB_H + (items.length - 1) * THUMB_GAP;
    const startY = (vh - totalH) / 2;

    gsap.set(items, {
      position: "fixed",
      width: THUMB_W,
      height: THUMB_H,
      left: vw / 2 - THUMB_W / 2,
      top: (i: number) => startY + i * (THUMB_H + THUMB_GAP),
      borderRadius: 4,
      overflow: "hidden",
      zIndex: 50,
      opacity: 0,
      scale: 0.85,
    });

    const tl = gsap.timeline({
      onComplete: () => {
        markLoaderSeen();
        gsap.to(loader, {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            isVisible.value = false;
            emit("done");
          },
        });
      },
    });

    tl.to(items, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.07,
      ease: "power3.out",
    });

    tl.to({}, { duration: 0.6 });

    const HORIZ_W = 80;
    const HORIZ_H = 96;
    const HORIZ_GAP = 12;
    const totalW = items.length * HORIZ_W + (items.length - 1) * HORIZ_GAP;
    const horizStartX = (vw - totalW) / 2;
    const horizY = vh / 2 - HORIZ_H / 2;

    tl.to(items, {
      left: (i: number) => horizStartX + i * (HORIZ_W + HORIZ_GAP),
      top: horizY,
      width: HORIZ_W,
      height: HORIZ_H,
      duration: 0.9,
      stagger: 0.05,
      ease: "expo.inOut",
    });

    tl.to({}, { duration: 0.5 });

    tl.add(() => {
      const rects = getCardImageRects();

      rects.forEach((rect, i) => {
        const el = items[i];
        if (!el) return;

        gsap.to(el, {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height,
          borderRadius: 0,
          duration: 1.1,
          ease: "expo.inOut",
          delay: i * 0.04,
        });
      });
    });

    tl.to({}, { duration: 1.4 });
  }, loader);
}

onMounted(async () => {
  if (hasSeenLoader()) {
    isVisible.value = false;
    emit("done");
    return;
  }
  await runAnimation();
});

onUnmounted(() => {
  ctx?.revert();
  ctx = null;
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isVisible"
      ref="loaderRef"
      class="fixed inset-0 z-40 bg-background pointer-events-none"
    >
      <div
        v-for="(work, idx) in worksCards"
        :key="idx"
        :ref="
          (el) => {
            if (el) itemRefs[idx] = el as HTMLElement;
          }
        "
        class="loader-thumb absolute overflow-hidden"
        style="opacity: 0; width: 48px; height: 64px"
      >
        <img
          :alt="work.title"
          :src="work.image"
          class="w-full h-full object-cover object-top"
          draggable="false"
        />
      </div>
    </div>
  </Teleport>
</template>
