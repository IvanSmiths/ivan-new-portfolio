import gsap from "gsap";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const animatePageIn = () => {
  const transitionElement = document.getElementById("transition-element");

  if (transitionElement) {
    const tl = gsap.timeline();

    tl.set(transitionElement, {
      xPercent: 0,
    })
      .to(transitionElement, {
        xPercent: 100,
        duration: 0.8,
      })
      .to(
        transitionElement,
        {
          duration: 0.4,
        },
        "<",
      );
  }
};

export const animatePageOut = (href: string, router: AppRouterInstance) => {
  const animationWrapper = document.getElementById("transition-element");

  if (animationWrapper) {
    const tl = gsap.timeline();

    tl.set(animationWrapper, {
      xPercent: -100,
    })
      .to(animationWrapper, {
        xPercent: 0,
        duration: 0.8,
        onComplete: () => {
          router.push(href);
        },
      })
      .to(
        animationWrapper,
        {
          duration: 1,
        },
        "<",
      );
  }
};
