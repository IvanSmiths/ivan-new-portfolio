const STORAGE_KEY = "works_loader_seen";
const DONE_EVENT = "works-loader:done";

export function useLoaderSession() {
  const loaderSeenState = useState<boolean>("works-loader-seen", () => false);

  function syncSeenFromStorage() {
    if (!import.meta.client || loaderSeenState.value) return;

    try {
      loaderSeenState.value = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      loaderSeenState.value = false;
    }
  }

  function hasSeenLoader(): boolean {
    return loaderSeenState.value;
  }

  function markLoaderSeen() {
    loaderSeenState.value = true;

    if (!import.meta.client) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* empty */
    }
  }

  function notifyLoaderDone() {
    if (!import.meta.client) return;

    window.dispatchEvent(new Event(DONE_EVENT));
  }

  function onLoaderDone(callback: () => void) {
    if (!import.meta.client) return () => {};

    const handler = () => callback();
    window.addEventListener(DONE_EVENT, handler, { once: true });

    return () => window.removeEventListener(DONE_EVENT, handler);
  }

  return {
    hasSeenLoader,
    syncSeenFromStorage,
    markLoaderSeen,
    notifyLoaderDone,
    onLoaderDone,
  };
}
