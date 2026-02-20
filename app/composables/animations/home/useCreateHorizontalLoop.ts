import gsap from "gsap";

export type HorizontalLoopConfig = {
  repeat?: number;
  paused?: boolean;
  speed?: number;
  snap?: number | false;
  paddingRight?: number | string;
};

export function useCreateHorizontalLoop(
  targets: gsap.DOMTarget[],
  config: HorizontalLoopConfig = {},
) {
  const loopTargets = gsap.utils.toArray(targets) as HTMLElement[];
  const pixelsPerSecond = (config.speed ?? 1) * 20;
  const snap =
    config.snap === false ? (v: number) => v : gsap.utils.snap((config.snap ?? 1) as number);

  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => {
      tl.totalTime(tl.rawTime() + tl.duration() * 1000);
    },
  });

  const first = loopTargets[0];
  if (!first) return tl;

  const startX = first.offsetLeft;
  const xPercents: number[] = [];
  const widths: number[] = [];

  gsap.set(loopTargets, {
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px") as string));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px") as string) / w) * 100 +
          (gsap.getProperty(el, "xPercent") as number),
      );
      return xPercents[i];
    },
  });

  gsap.set(loopTargets, { x: 0 });

  const lastIndex = loopTargets.length - 1;
  const last = loopTargets[lastIndex];
  if (!last) return tl;

  const lastXPercent = xPercents[lastIndex] ?? 0;
  const lastWidth = widths[lastIndex] ?? 0;

  const totalWidth =
    last.offsetLeft +
    (lastXPercent / 100) * lastWidth -
    startX +
    last.offsetWidth * (gsap.getProperty(last, "scaleX") as number) +
    (parseFloat(String(config.paddingRight ?? 0)) || 0);

  for (let i = 0; i < loopTargets.length; i++) {
    const target = loopTargets[i];
    const width = widths[i];
    const xPercent = xPercents[i];
    if (!target || width == null || xPercent == null) continue;

    const currentX = (xPercent / 100) * width;
    const distanceToStart = target.offsetLeft + currentX - startX;
    const distanceToLoop = distanceToStart + width * (gsap.getProperty(target, "scaleX") as number);

    tl.to(
      target,
      {
        xPercent: snap(((currentX - distanceToLoop) / width) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0,
    )
      .fromTo(
        target,
        { xPercent: snap(((currentX - distanceToLoop + totalWidth) / width) * 100) },
        {
          xPercent,
          duration: (totalWidth - distanceToLoop) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond,
      )
      .add(`label${i}`, distanceToStart / pixelsPerSecond);
  }

  return tl;
}
