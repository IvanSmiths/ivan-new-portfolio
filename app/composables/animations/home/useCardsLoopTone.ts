import * as Tone from "tone";
import { onScopeDispose, watch } from "vue";
import { useSoundPreference } from "~/composables/useSoundPreference";

type UseWorksLoopToneOptions = {
  centerFrequency?: string;
  duration?: Tone.Unit.Time;
  snapFrequency?: string;
  volumeDb?: number;
};

const DEFAULT_SNAP_FREQUENCY = "A5";
const DEFAULT_CENTER_FREQUENCY = "E5";
const DEFAULT_DURATION: Tone.Unit.Time = "32n";
const DEFAULT_VOLUME_DB = -16;

export function useCardsLoopTone(options: UseWorksLoopToneOptions = {}) {
  const { initSoundPreference, soundEnabled } = useSoundPreference();
  let snapSynth: Tone.Synth | null = null;
  let removeAudioUnlockListeners: (() => void) | null = null;

  const snapFrequency = options.snapFrequency ?? DEFAULT_SNAP_FREQUENCY;
  const centerFrequency = options.centerFrequency ?? DEFAULT_CENTER_FREQUENCY;
  const blipDuration = options.duration ?? DEFAULT_DURATION;
  const volumeDb = options.volumeDb ?? DEFAULT_VOLUME_DB;

  initSoundPreference();

  function getContextState() {
    return Tone.getContext().state;
  }

  function ensureSnapSynth() {
    if (!import.meta.client || !soundEnabled.value) return null;

    if (!snapSynth) {
      snapSynth = new Tone.Synth({
        oscillator: { type: "sine" },
        envelope: { attack: 0.002, decay: 0.09, sustain: 0, release: 0.08 },
      }).toDestination();
      snapSynth.volume.value = volumeDb;
    }

    return snapSynth;
  }

  async function unlockSnapAudio() {
    if (!soundEnabled.value) return null;

    const synth = ensureSnapSynth();
    if (!synth) return null;

    if (getContextState() !== "running") {
      await Tone.start().catch(() => {});
    }

    return getContextState() === "running" ? synth : null;
  }

  function playSnapBlip() {
    if (!soundEnabled.value) return;

    const synth = ensureSnapSynth();
    if (!synth || getContextState() !== "running") return;

    synth.triggerAttackRelease(snapFrequency, blipDuration, Tone.now());
  }

  function playCenterBlip() {
    if (!soundEnabled.value) return;

    const synth = ensureSnapSynth();
    if (!synth || getContextState() !== "running") return;

    synth.triggerAttackRelease(centerFrequency, blipDuration, Tone.now());
  }

  function installAudioUnlockListeners() {
    if (!import.meta.client) return;
    if (removeAudioUnlockListeners) return;

    const unlock = () => {
      if (!soundEnabled.value) return;
      void unlockSnapAudio();
    };

    window.addEventListener("click", unlock, { passive: true });
    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("keydown", unlock);

    removeAudioUnlockListeners = () => {
      window.removeEventListener("click", unlock);
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
      removeAudioUnlockListeners = null;
    };
  }

  watch(soundEnabled, (enabled) => {
    if (enabled) return;
    snapSynth?.dispose();
    snapSynth = null;
  });

  function cleanup() {
    removeAudioUnlockListeners?.();
    snapSynth?.dispose();
    snapSynth = null;
  }

  onScopeDispose(() => {
    cleanup();
  });

  return {
    cleanup,
    ensureSnapSynth,
    installAudioUnlockListeners,
    playCenterBlip,
    playSnapBlip,
    unlockSnapAudio,
  };
}
