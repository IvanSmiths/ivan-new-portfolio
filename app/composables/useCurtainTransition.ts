import { useState } from "#app";

type Phase = "idle" | "covering" | "covered" | "revealing";

type Resolver = (() => void) | null;

export function useCurtainTransition() {
  const active = useState<boolean>("curtain:active", () => false);
  const phase = useState<Phase>("curtain:phase", () => "idle");
  const coverResolver = useState<Resolver>("curtain:coverResolver", () => null);
  const revealResolver = useState<Resolver>("curtain:revealResolver", () => null);

  function beginCover(): Promise<void> {
    if (active.value) {
      return Promise.resolve();
    }

    active.value = true;
    phase.value = "covering";

    return new Promise((resolve) => {
      coverResolver.value = resolve;
    });
  }

  function notifyCovered() {
    phase.value = "covered";
    const resolve = coverResolver.value;
    coverResolver.value = null;
    resolve?.();
  }

  function beginReveal(): Promise<void> {
    phase.value = "revealing";

    return new Promise((resolve) => {
      revealResolver.value = resolve;
    });
  }

  function notifyRevealed() {
    const resolve = revealResolver.value;
    revealResolver.value = null;
    phase.value = "idle";
    active.value = false;
    resolve?.();
  }

  return {
    active,
    phase,
    beginCover,
    notifyCovered,
    beginReveal,
    notifyRevealed,
  };
}
