interface AnimatedWordProps {
  word: string;
  setRef: (el: HTMLSpanElement | null) => void;
  className?: string;
}

export const AnimatedWord = ({
  word,
  setRef,
  className = "",
}: AnimatedWordProps) => {
  return (
    <span ref={setRef} className={className}>
      {word}
    </span>
  );
};
