const STORAGE_KEY = "works_loader_seen";
const DONE_EVENT = "works-loader:done";

export function useLoaderSession() {
  const loaderSeenState = useState<boolean>("works-loader-seen", () => false);

  function syncSeenFromStorage() {
    if (!import.meta.client) return;

    let seen = false;

    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }

    loaderSeenState.value = seen;
    document.documentElement.classList.toggle("loader-seen", seen);
  }

  function hasSeenLoader(): boolean {
    return loaderSeenState.value;
  }

  function markLoaderSeen() {
    loaderSeenState.value = true;

    if (!import.meta.client) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
      document.documentElement.classList.add("loader-seen");
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
