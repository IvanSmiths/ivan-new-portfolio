import { onMounted, onScopeDispose, ref } from "vue";

export function useWorkHeaderAnimation() {
  const { $gsap } = useNuxtApp();

  const rootRef = ref<HTMLElement | null>(null);
  const imageWrapRef = ref<HTMLElement | null>(null);
  const titleRef = ref<HTMLElement | null>(null);
  const roleRef = ref<HTMLElement | null>(null);
  const metaBarRef = ref<HTMLElement | null>(null);
  const spacerRef = ref<HTMLElement | null>(null);

  let ctx: any = null;

  onMounted(() => {
    if (!rootRef.value || !imageWrapRef.value) return;

    const multiplier = 7;
    const extraSpaceNeeded = imageWrapRef.value.offsetHeight * (multiplier / 10);

    ctx = $gsap.context(() => {
      $gsap.set(imageWrapRef.value, {
        translateY: 0,
        scaleX: 1,
        willChange: "transform",
        objectPosition: "top",
      });

      $gsap.set([titleRef.value, roleRef.value, metaBarRef.value].filter(Boolean), {
        opacity: 0,
        translateY: 18,
        willChange: "transform, opacity",
      });

      $gsap.set(spacerRef.value, { height: 0 });

      $gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(
          imageWrapRef.value,
          {
            duration: 1.25,
            translateY: `${multiplier * 10}%`,
            paddingLeft: 20,
            paddingRight: 20,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          spacerRef.value,
          {
            duration: 1.25,
            height: extraSpaceNeeded,
            ease: "power3.inOut",
          },
          0,
        )
        .to(
          [titleRef.value, roleRef.value].filter(Boolean),
          {
            duration: 0.9,
            opacity: 1,
            delay: 0.8,
            translateY: 0,
            stagger: 0.08,
          },
          0.05,
        )
        .to(
          metaBarRef.value,
          {
            duration: 0.9,
            opacity: 1,
            delay: 0.8,
            translateY: 0,
          },
          0.12,
        );
    }, rootRef.value);
  });

  onScopeDispose(() => ctx?.revert());

  return { rootRef, imageWrapRef, titleRef, roleRef, metaBarRef, spacerRef };
}
