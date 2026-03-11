import { onMounted, onScopeDispose, ref, watch } from "vue";

type QueryCache<T extends Element> = {
  items: T[];
  root: ParentNode | null;
  version: number;
};

function queryAllCached<T extends Element>(
  root: ParentNode | null,
  version: number,
  selector: string,
  cache: QueryCache<T>,
) {
  if (!root) {
    cache.root = null;
    cache.version = version;
    cache.items = [];
    return cache.items;
  }

  if (cache.root === root && cache.version === version) {
    return cache.items;
  }

  cache.root = root;
  cache.version = version;
  cache.items = Array.from(root.querySelectorAll(selector)) as T[];

  return cache.items;
}

export function useWorksLoopElements() {
  const galleryRef = ref<HTMLElement | null>(null);
  const cardsRef = ref<HTMLElement | null>(null);
  const metaRef = ref<HTMLElement | null>(null);
  const metaTrackRef = ref<HTMLElement | null>(null);
  const loaderCardsRef = ref<HTMLElement | null>(null);

  const cardsVersion = ref(0);
  const metaVersion = ref(0);

  const cardsCache: QueryCache<HTMLElement> = {
    items: [],
    root: null,
    version: -1,
  };
  const cardImagesCache: QueryCache<HTMLImageElement> = {
    items: [],
    root: null,
    version: -1,
  };
  const transitionImagesCache: QueryCache<HTMLImageElement> = {
    items: [],
    root: null,
    version: -1,
  };
  const metaGroupsCache: QueryCache<HTMLElement> = {
    items: [],
    root: null,
    version: -1,
  };

  let cardsObserver: MutationObserver | null = null;
  let metaObserver: MutationObserver | null = null;

  const bumpCardsVersion = () => {
    cardsVersion.value += 1;
  };
  const bumpMetaVersion = () => {
    metaVersion.value += 1;
  };

  const disconnectCardsObserver = () => {
    cardsObserver?.disconnect();
    cardsObserver = null;
  };
  const disconnectMetaObserver = () => {
    metaObserver?.disconnect();
    metaObserver = null;
  };

  const observeCards = () => {
    disconnectCardsObserver();
    if (typeof MutationObserver === "undefined") return;
    if (!cardsRef.value) return;

    cardsObserver = new MutationObserver(() => {
      bumpCardsVersion();
    });
    cardsObserver.observe(cardsRef.value, {
      childList: true,
      subtree: true,
    });
  };

  const observeMeta = () => {
    disconnectMetaObserver();
    if (typeof MutationObserver === "undefined") return;
    if (!metaRef.value) return;

    metaObserver = new MutationObserver(() => {
      bumpMetaVersion();
    });
    metaObserver.observe(metaRef.value, {
      childList: true,
      subtree: true,
    });
  };

  watch(
    cardsRef,
    () => {
      bumpCardsVersion();
      observeCards();
    },
    { flush: "post" },
  );
  watch(
    metaRef,
    () => {
      bumpMetaVersion();
      observeMeta();
    },
    { flush: "post" },
  );

  onMounted(() => {
    observeCards();
    observeMeta();
  });

  onScopeDispose(() => {
    disconnectCardsObserver();
    disconnectMetaObserver();
  });

  function getCards() {
    return queryAllCached(cardsRef.value, cardsVersion.value, "[data-work-card]", cardsCache);
  }

  function getCardImages() {
    return queryAllCached(
      cardsRef.value,
      cardsVersion.value,
      "[data-work-image]",
      cardImagesCache,
    );
  }

  function getTransitionImages() {
    return queryAllCached(cardsRef.value, cardsVersion.value, "img", transitionImagesCache);
  }

  function getMetaGroups() {
    return queryAllCached(
      metaRef.value,
      metaVersion.value,
      "[data-work-meta-group]",
      metaGroupsCache,
    );
  }

  return {
    cardsRef,
    cardsVersion,
    galleryRef,
    getCardImages,
    getCards,
    getMetaGroups,
    getTransitionImages,
    loaderCardsRef,
    metaRef,
    metaTrackRef,
    metaVersion,
  };
}
