const SOUND_PREFERENCE_KEY = "sound-enabled";

let hasLoadedClientPreference = false;

export function useSoundPreference() {
  const soundEnabled = useState<boolean>("sound-enabled", () => true);

  function initSoundPreference() {
    if (!import.meta.client || hasLoadedClientPreference) return;

    const savedPreference = window.localStorage.getItem(SOUND_PREFERENCE_KEY);
    if (savedPreference === "0") {
      soundEnabled.value = false;
    } else if (savedPreference === "1") {
      soundEnabled.value = true;
    }

    hasLoadedClientPreference = true;
  }

  function setSoundEnabled(enabled: boolean) {
    soundEnabled.value = enabled;

    if (!import.meta.client) return;
    window.localStorage.setItem(SOUND_PREFERENCE_KEY, enabled ? "1" : "0");
  }

  function toggleSound() {
    setSoundEnabled(!soundEnabled.value);
  }

  return {
    initSoundPreference,
    setSoundEnabled,
    soundEnabled,
    toggleSound,
  };
}
