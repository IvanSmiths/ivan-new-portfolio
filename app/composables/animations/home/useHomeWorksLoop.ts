import { useWorkExpandTransition } from "~/composables/animations/home/useWorkExpandTransition";
import { useWorkHover } from "~/composables/animations/home/useWorkHover";
import type { WorkCard } from "~/domain/works/types";
import { useCreateHorizontalLoop } from "~/composables/animations/home/useCreateHorizontalLoop";
import { computed, onMounted, onScopeDispose, ref, shallowRef } from "vue";

type RegisterPayload = {
  id: string;
  card: HTMLElement;
  image: HTMLImageElement;
  clients: HTMLElement[];
};

type Entry = {
  card: HTMLElement;
  image: HTMLImageElement;
  clients: HTMLElement[];
};

export function useHomeWorksLoop(works: readonly WorkCard[]) {
  const { $gsap, $gsapObserver } = useNuxtApp();
  const router = useRouter();
  const { notifyInteraction } = useCursorHelper();

  const lock = ref(false);
  const entries = shallowRef(new Map<string, Entry>());

  const cards = computed(
    () => works.map((w) => entries.value.get(w.slug)?.card).filter(Boolean) as HTMLElement[],
  );
  const images = computed(
    () => works.map((w) => entries.value.get(w.slug)?.image).filter(Boolean) as HTMLImageElement[],
  );
  const clientsByIndex = computed(() => works.map((w) => entries.value.get(w.slug)?.clients ?? []));

  function idToIndex(id: string) {
    return works.findIndex((w) => w.slug === id);
  }

  function register(payload: RegisterPayload) {
    entries.value.set(payload.id, {
      card: payload.card,
      image: payload.image,
      clients: payload.clients,
    });
  }

  function unregister(id: string) {
    entries.value.delete(id);
  }

  const hoverFx = useWorkHover({
    gsap: $gsap,
    images: () => images.value,
    clientsByIndex: () => clientsByIndex.value,
    isLocked: () => lock.value,
  });

  const expandFx = useWorkExpandTransition({
    gsap: $gsap,
    router,
    works,
    cards: () => cards.value,
    images: () => images.value,
    lock,
  });

  let ctx: gsap.Context | null = null;

  onMounted(() => {
    ctx = $gsap.context(() => {
      hoverFx.hideAllClients();

      const loop = useCreateHorizontalLoop(cards.value, { repeat: -1, speed: 3 });
      loop.totalTime(loop.duration() * 1000);

      const slowDown = $gsap.to(loop, { timeScale: 0, duration: 2 });
      loop.timeScale(0);

      const obs = $gsapObserver.create({
        target: window,
        type: "touch,wheel",
        wheelSpeed: -1,
        onChange: (self: { deltaX: number; deltaY: number }) => {
          notifyInteraction();
          const d = Math.abs(self.deltaX) > Math.abs(self.deltaY) ? self.deltaX : self.deltaY;
          loop.timeScale(-d);
          slowDown.invalidate().restart();
        },
      });

      return () => {
        obs.kill();
      };
    });
  });

  onScopeDispose(() => {
    ctx?.revert();
    ctx = null;
  });

  function onHoverIn(id: string) {
    const idx = idToIndex(id);
    if (idx < 0) return;
    hoverFx.hoverIn(idx);
  }

  function onHoverOut() {
    hoverFx.hoverOut();
  }

  function onImageClick(event: MouseEvent, id: string) {
    const idx = idToIndex(id);
    if (idx < 0) return;
    return expandFx.onImageClick(event, idx);
  }

  return {
    register,
    unregister,
    onHoverIn,
    onHoverOut,
    onImageClick,
  };
}
