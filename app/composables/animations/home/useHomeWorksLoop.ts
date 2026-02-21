import { useWorkExpandTransition } from "~/composables/animations/home/useWorkExpandTransition";
import { useWorkHover } from "~/composables/animations/home/useWorkHover";
import type { WorkCard } from "~/domain/works/types";
import { useCreateHorizontalLoop } from "~/composables/animations/home/useCreateHorizontalLoop";

export function useHomeWorksLoop(works: readonly WorkCard[]) {
  const { $gsap, $gsapObserver } = useNuxtApp();
  const router = useRouter();
  const { notifyInteraction } = useCursorHelper();

  const lock = ref(false);

  const cards = shallowRef<HTMLElement[]>([]);
  const images = shallowRef<HTMLImageElement[]>([]);
  const clients = shallowRef<HTMLElement[][]>([]);

  function register(payload: {
    index: number;
    card: HTMLElement;
    image: HTMLImageElement;
    clients: HTMLElement[];
  }) {
    cards.value[payload.index] = payload.card;
    images.value[payload.index] = payload.image;
    clients.value[payload.index] = payload.clients;
  }

  const hoverFx = useWorkHover({
    gsap: $gsap,
    images: () => images.value,
    clientsByIndex: () => clients.value,
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

  onMounted(() => {
    hoverFx.hideAllClients();

    const loop = useCreateHorizontalLoop(cards.value, { repeat: -1, speed: 1 });
    loop.totalTime(loop.duration() * 1000);

    const slowDown = $gsap.to(loop, { timeScale: 0, duration: 0.5 });
    loop.timeScale(0);

    const clampSpeed = $gsap.utils.clamp(-200, 200);

    const obs = $gsapObserver.create({
      target: window,
      type: "touch,wheel",
      wheelSpeed: -1,
      onChange: (self: { deltaX: number; deltaY: number }) => {
        notifyInteraction();
        const d = Math.abs(self.deltaX) > Math.abs(self.deltaY) ? self.deltaX : self.deltaY;

        loop.timeScale(clampSpeed(-d));

        slowDown.invalidate().restart();
      },
    });

    onScopeDispose(() => {
      obs.kill();
      loop.kill();
      slowDown.kill();
    });
  });

  return {
    register,
    onHoverIn: hoverFx.hoverIn,
    onHoverOut: hoverFx.hoverOut,
    onImageClick: expandFx.onImageClick,
  };
}
