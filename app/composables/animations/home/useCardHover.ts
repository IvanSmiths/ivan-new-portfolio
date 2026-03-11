export function useCardHover(opts: {
  cards: () => HTMLElement[];
  isLocked: () => boolean;
}) {
  const DIMMED_CLASS = "is-hover-dimmed";
  const ACTIVE_CLASS = "is-hover-active";

  let activeCard: HTMLElement | null = null;

  function getCardsContainer(cards: HTMLElement[]) {
    return cards[0]?.parentElement as HTMLElement | null;
  }

  function hoverIn(index: number) {
    if (opts.isLocked()) return;

    const cards = opts.cards();
    const card = cards[index];
    const container = getCardsContainer(cards);
    if (!card || !container) return;

    if (activeCard === card && container.classList.contains(DIMMED_CLASS)) return;

    container.classList.add(DIMMED_CLASS);
    activeCard?.classList.remove(ACTIVE_CLASS);
    card.classList.add(ACTIVE_CLASS);
    activeCard = card;
  }

  function hoverOut() {
    if (opts.isLocked()) return;

    const cards = opts.cards();
    const container = getCardsContainer(cards);
    container?.classList.remove(DIMMED_CLASS);
    activeCard?.classList.remove(ACTIVE_CLASS);
    activeCard = null;
  }

  return { hoverIn, hoverOut };
}
