const STORAGE_KEY = "works_loader_seen";
const DONE_EVENT = "works-loader:done";

export function useLoaderSession() {
  function hasSeenLoader(): boolean {
    if (!import.meta.client) return false;

    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }

  function markLoaderSeen() {
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
    markLoaderSeen,
    notifyLoaderDone,
    onLoaderDone,
  };
}
