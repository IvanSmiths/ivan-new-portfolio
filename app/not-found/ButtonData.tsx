export const getButtonMessage = (attempts: number): string => {
  const messages = [
    "Go home",
    "Nice try!",
    "Almost got it!",
    "Keep trying.",
    "You can try by opening the devtools and do some magic.",
  ];

  return attempts >= messages.length
    ? messages[messages.length - 1]
    : messages[attempts];
};
