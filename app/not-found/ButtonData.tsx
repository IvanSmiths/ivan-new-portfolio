export const getButtonMessage = (attempts: number): string => {
    const messages = [
      "Go home",
      "Nice try!",
      "Almost got it!",
      "Keep trying...",
      "One more time!",
      "You tried enough times 😅"
    ];
    
    return attempts >= messages.length ? messages[messages.length - 1] : messages[attempts];
  };