const STORAGE_KEY = "cursor_helper_scroll_seen";

export function useCursorHelperSession() {
  function hasSeenScrollHint(): boolean {
    if (!import.meta.client) return false;

    try {
      return sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      return false;
    }
  }

  function markScrollHintSeen() {
    if (!import.meta.client) return;

    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* empty */
    }
  }

  return {
    hasSeenScrollHint,
    markScrollHintSeen,
  };
}
