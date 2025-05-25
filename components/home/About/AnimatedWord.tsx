interface AnimatedWordProps {
  word: string;
  setRef: (el: HTMLSpanElement | null) => void;
  className?: string;
}

export const AnimatedWord = ({ word, setRef }: AnimatedWordProps) => {
  return (
    <span ref={setRef} className="mx-1.5 opacity-40">
      {word}
    </span>
  );
};
